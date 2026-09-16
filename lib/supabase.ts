import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client, used inside API routes.
 * Uses the service role key so API routes have full read/write access —
 * never import this file from a "use client" component.
 */
export function getSupabaseServerClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

export type VerifiedUser = { id: string; email: string; username: string };

/**
 * Verifies the Supabase session access token sent by the browser
 * (Authorization: Bearer <token>) and returns the real, authenticated user.
 * This is what replaces trusting a client-supplied userId — the token is
 * checked against Supabase Auth itself, so it can't be spoofed.
 */
export async function getVerifiedUser(
  req: NextRequest,
  supabase: SupabaseClient
): Promise<VerifiedUser | null> {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  const username =
    typeof data.user.user_metadata?.username === "string"
      ? data.user.user_metadata.username
      : data.user.email?.split("@")[0] || "sesh-scorer";

  return { id: data.user.id, email: data.user.email || "", username };
}
