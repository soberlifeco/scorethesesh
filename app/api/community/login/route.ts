import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (isRateLimited(`login:${clientIp(req)}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts — wait a minute and try again." },
      { status: 429 }
    );
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Community scoring isn't configured yet." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const username = typeof body?.username === "string" ? body.username.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (username.length < 2 || username.length > 24) {
    return NextResponse.json(
      { error: "Username needs to be 2–24 characters." },
      { status: 400 }
    );
  }

  // Upsert by email: first time creates the account, returning visits with
  // the same email refresh the username to whatever they typed this time.
  const { data, error } = await supabase
    .from("community_users")
    .upsert({ email, username }, { onConflict: "email" })
    .select("id, email, username")
    .single();

  if (error || !data) {
    console.error("community login error:", error);
    return NextResponse.json({ error: "Couldn't log you in. Try again." }, { status: 500 });
  }

  return NextResponse.json({ userId: data.id, email: data.email, username: data.username });
}
