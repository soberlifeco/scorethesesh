import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getVerifiedUser } from "@/lib/supabase";
import { isOldEra, totalOfScores } from "@/lib/sesh-data";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

type ScoreRow = {
  user_id: string;
  username: string;
  sesh: number;
  music: number;
  substances: number;
  cat3: number;
  hangover: number | null;
  cat5: number;
  notes: string | null;
  updated_at: string;
};

export async function GET(req: NextRequest) {
  if (isRateLimited(`scores-get:${clientIp(req)}`, 60, 60_000)) {
    return NextResponse.json({ error: "Slow down a bit and try again." }, { status: 429 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Community scoring isn't configured yet." }, { status: 500 });
  }

  const sesh = Number(req.nextUrl.searchParams.get("sesh"));
  if (!Number.isInteger(sesh) || sesh < 1 || sesh > 45) {
    return NextResponse.json({ error: "Invalid sesh number." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("community_scores")
    .select("user_id, username, sesh, music, substances, cat3, hangover, cat5, notes, updated_at")
    .eq("sesh", sesh)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("community scores fetch error:", error);
    return NextResponse.json({ error: "Couldn't load community scores." }, { status: 500 });
  }

  const rows = (data ?? []) as ScoreRow[];
  const entries = rows.map((row) => ({
    username: row.username,
    music: row.music,
    substances: row.substances,
    cat3: row.cat3,
    hangover: row.hangover,
    cat5: row.cat5,
    total: totalOfScores(row),
    notes: row.notes,
    updatedAt: row.updated_at,
  }));

  const average =
    entries.length > 0
      ? Math.round((entries.reduce((sum, e) => sum + e.total, 0) / entries.length) * 10) / 10
      : null;

  // If the request carries a valid session, also return that user's own row
  // (even though it's already public, this saves the client a second lookup).
  const verified = await getVerifiedUser(req, supabase);
  const mineRow = verified ? rows.find((row) => row.user_id === verified.id) : undefined;
  const mine = mineRow
    ? {
        music: mineRow.music,
        substances: mineRow.substances,
        cat3: mineRow.cat3,
        hangover: mineRow.hangover,
        cat5: mineRow.cat5,
        notes: mineRow.notes,
      }
    : null;

  return NextResponse.json({ entries, average, count: entries.length, mine });
}

export async function POST(req: NextRequest) {
  if (isRateLimited(`scores-post:${clientIp(req)}`, 30, 60_000)) {
    return NextResponse.json({ error: "Too many saves — wait a minute and try again." }, { status: 429 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Community scoring isn't configured yet." }, { status: 500 });
  }

  const verified = await getVerifiedUser(req, supabase);
  if (!verified) {
    return NextResponse.json({ error: "You need to log in first." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const sesh = Number(body?.sesh);
  const notes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 500) : "";

  if (!Number.isInteger(sesh) || sesh < 1 || sesh > 45) {
    return NextResponse.json({ error: "Invalid sesh number." }, { status: 400 });
  }

  const oldEra = isOldEra(sesh);
  const catFields = ["music", "substances", "cat3", "cat5"] as const;
  const scores: Record<string, number> = {};
  for (const key of catFields) {
    const value = Number(body?.[key]);
    if (!Number.isInteger(value) || value < 0 || value > 5) {
      return NextResponse.json({ error: `${key} must be a whole number 0–5.` }, { status: 400 });
    }
    scores[key] = value;
  }

  let hangover: number | null = null;
  if (!oldEra) {
    const value = Number(body?.hangover);
    if (!Number.isInteger(value) || value < 0 || value > 5) {
      return NextResponse.json({ error: "hangover must be a whole number 0–5." }, { status: 400 });
    }
    hangover = value;
  }

  const { data, error } = await supabase
    .from("community_scores")
    .upsert(
      {
        user_id: verified.id,
        username: verified.username,
        sesh,
        music: scores.music,
        substances: scores.substances,
        cat3: scores.cat3,
        hangover,
        cat5: scores.cat5,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,sesh" }
    )
    .select("music, substances, cat3, hangover, cat5, notes, updated_at")
    .single();

  if (error || !data) {
    console.error("community score submit error:", error);
    return NextResponse.json({ error: "Couldn't save your score. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ...data, total: totalOfScores(data) });
}
