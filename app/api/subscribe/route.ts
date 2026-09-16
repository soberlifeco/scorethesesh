import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    console.error("MAILERLITE_API_KEY is not set");
    return NextResponse.json(
      { error: "Signup isn't set up yet. Try again shortly." },
      { status: 500 }
    );
  }

  let email: string | undefined;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

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
