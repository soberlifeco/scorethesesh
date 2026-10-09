import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { verifyStripeSignature } from "@/lib/stripe-webhook";
import { SESHED_OUT_PRODUCT_TAG } from "@/lib/seshed-out-config";

type CheckoutSession = {
  id: string;
  payment_status?: string;
  amount_total?: number | null;
  currency?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null } | null;
  metadata?: Record<string, string> | null;
};

/**
 * Stripe webhook. Records a purchase when a Checkout Session for All Seshed
 * Out is paid. Needs STRIPE_WEBHOOK_SECRET. Listen for:
 *   checkout.session.completed
 *   checkout.session.async_payment_succeeded
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  // Signature must be checked against the exact raw body.
  const rawBody = await req.text();
  if (!verifyStripeSignature(rawBody, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: { type?: string; data?: { object?: CheckoutSession } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const handled =
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded";
  const session = event.data?.object;

  if (!handled || !session) {
    return NextResponse.json({ received: true });
  }

  // Ignore anything that isn't All Seshed Out (e.g. the donation link).
  if (session.metadata?.product !== SESHED_OUT_PRODUCT_TAG) {
    return NextResponse.json({ received: true, ignored: "other product" });
  }

  // Delayed payment methods: wait for async_payment_succeeded.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, ignored: "not paid yet" });
  }

  const email = (session.customer_details?.email || session.customer_email || "")
    .trim()
    .toLowerCase();
  if (!email) {
    console.error("Paid session has no email:", session.id);
    return NextResponse.json({ received: true, ignored: "no email" });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error("Supabase is not configured");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const { error } = await supabase.from("seshed_out_purchases").upsert(
    {
      email,
      stripe_session_id: session.id,
      amount_total: session.amount_total ?? null,
      currency: session.currency ?? null,
    },
    { onConflict: "stripe_session_id" }
  );

  if (error) {
    console.error("Saving purchase failed:", error.message);
    // 500 makes Stripe retry later.
    return NextResponse.json({ error: "Could not save purchase." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
