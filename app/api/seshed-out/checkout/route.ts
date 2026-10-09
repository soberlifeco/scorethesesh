import { NextRequest, NextResponse } from "next/server";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { isSalesOpen, SESHED_OUT_PRODUCT_TAG } from "@/lib/seshed-out-config";

/**
 * Creates a Stripe Checkout Session for All Seshed Out and returns its URL.
 * Needs STRIPE_SECRET_KEY and STRIPE_PRICE_ID (use test-mode values until launch).
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(`so-checkout:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  if (!isSalesOpen()) {
    return NextResponse.json(
      { error: "All Seshed Out isn't on sale yet." },
      { status: 403 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!secretKey || !priceId) {
    console.error("STRIPE_SECRET_KEY or STRIPE_PRICE_ID is not set");
    return NextResponse.json(
      { error: "Checkout isn't set up yet. Try again shortly." },
      { status: 500 }
    );
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://scorethesesh.com"
  ).replace(/\/$/, "");

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl}/all-seshed-out/guide?checkout=success`,
    cancel_url: `${siteUrl}/all-seshed-out?checkout=cancelled`,
    allow_promotion_codes: "true",
    "metadata[product]": SESHED_OUT_PRODUCT_TAG,
  });

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const json = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      console.error("Stripe checkout error:", res.status, json.error?.message);
      return NextResponse.json(
        { error: "Couldn't start checkout. Try again in a bit." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: json.url });
  } catch (err) {
    console.error("Stripe request failed:", err);
    return NextResponse.json(
      { error: "Couldn't start checkout. Try again in a bit." },
      { status: 502 }
    );
  }
}
