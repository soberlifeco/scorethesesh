import { NextRequest, NextResponse } from "next/server";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (isRateLimited(`subscribe:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    console.error("MAILERLITE_API_KEY is not set");
    return NextResponse.json(
      { error: "Signup isn't set up yet. Try again shortly." },
      { status: 500 }
    );
  }

  let email: string | undefined;
  let source: string | undefined;
  try {
    const body = await req.json();
    email = body?.email;
    source = typeof body?.source === "string" ? body.source : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  // People who made a Your Turn To Score account (and opted in) can go in
  // their own MailerLite group; falls back to the main group.
  const groupId =
    source === "account"
      ? process.env.MAILERLITE_ACCOUNTS_GROUP_ID || process.env.MAILERLITE_GROUP_ID
      : process.env.MAILERLITE_GROUP_ID;

  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    if (!mlRes.ok) {
      const errBody = await mlRes.text();
      console.error("MailerLite error:", mlRes.status, errBody);
      return NextResponse.json(
        { error: "Couldn't sign you up right now. Try again in a bit." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MailerLite request failed:", err);
    return NextResponse.json(
      { error: "Couldn't sign you up right now. Try again in a bit." },
      { status: 502 }
    );
  }
}
