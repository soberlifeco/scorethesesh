import type { NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

export type Buyer = { id: string; email: string };

/**
 * Verifies the Supabase access token sent as "Authorization: Bearer <token>"
 * and returns the signed-in user — but ONLY if their email is confirmed.
 * That check matters: access is granted by email address, so an account that
 * was created with someone else's email and never confirmed must not count.
 * (Magic-link sign-in confirms the email by definition.)
 */
export async function getConfirmedUser(
  req: NextRequest,
  supabase: SupabaseClient
): Promise<Buyer | null> {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  if (!data.user.email || !data.user.email_confirmed_at) return null;

  return { id: data.user.id, email: data.user.email.trim().toLowerCase() };
}

/** True if a paid All Seshed Out purchase exists for this email. Throws on a database error. */
export async function hasPurchased(
  supabase: SupabaseClient,
  email: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("seshed_out_purchases")
    .select("id")
    .eq("email", email.trim().toLowerCase())
    .limit(1);

  if (error) throw new Error(`purchase lookup failed: ${error.message}`);
  return (data?.length ?? 0) > 0;
}
