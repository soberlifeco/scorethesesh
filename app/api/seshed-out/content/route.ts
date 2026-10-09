import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getConfirmedUser, hasPurchased } from "@/lib/seshed-out-access";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import {
  EXCLUSIVE_VIDEOS,
  INTRO_VIDEO,
  PLAN,
  SAFETY_NOTE,
  SURVIVAL_GUIDE,
  SURVIVAL_GUIDE_PDF,
  VIDEO_BUCKET,
} from "@/lib/seshed-out-content";

const SIGNED_URL_SECONDS = 2 * 60 * 60;
const noStore = { "Cache-Control": "no-store" };

/**
 * Returns the paid content — but only to a signed-in user whose confirmed
 * email has a purchase. Everything paid (plan text, guide text, video links)
 * is generated here, never shipped in the page bundle.
 */
export async function GET(req: NextRequest) {
  if (isRateLimited(`so-content:${clientIp(req)}`, 60, 60_000)) {
    return NextResponse.json({ error: "Slow down." }, { status: 429, headers: noStore });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured." }, { status: 500, headers: noStore });
  }

  const user = await getConfirmedUser(req, supabase);
  if (!user) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401, headers: noStore });
  }

  let purchased = false;
  try {
    purchased = await hasPurchased(supabase, user.email);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't check your purchase." }, { status: 500, headers: noStore });
  }
  if (!purchased) {
    return NextResponse.json(
      { error: "no_purchase", email: user.email },
      { status: 403, headers: noStore }
    );
  }

  // Tracker progress
  const { data: progressRows, error: progressError } = await supabase
    .from("seshed_out_progress")
    .select("task_id")
    .eq("user_id", user.id);
  if (progressError) {
    console.error("Progress lookup failed:", progressError.message);
  }
  const completed = (progressRows ?? []).map((r) => r.task_id as string);

  // Signed video / download links from the private bucket
  const files = [
    INTRO_VIDEO.file,
    ...EXCLUSIVE_VIDEOS.map((v) => v.file),
    SURVIVAL_GUIDE_PDF,
  ];
  const urlByFile = new Map<string, string | null>();
  const { data: signed, error: signError } = await supabase.storage
    .from(VIDEO_BUCKET)
    .createSignedUrls(files, SIGNED_URL_SECONDS);
  if (signError) {
    console.error("Signing URLs failed:", signError.message);
  }
  for (const entry of signed ?? []) {
    if (entry.path) urlByFile.set(entry.path, entry.error ? null : entry.signedUrl);
  }

  return NextResponse.json(
    {
      email: user.email,
      plan: PLAN,
      survivalGuide: SURVIVAL_GUIDE,
      safetyNote: SAFETY_NOTE,
      intro: { ...INTRO_VIDEO, url: urlByFile.get(INTRO_VIDEO.file) ?? null },
      exclusive: EXCLUSIVE_VIDEOS.map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description,
        url: urlByFile.get(v.file) ?? null,
      })),
      guidePdfUrl: urlByFile.get(SURVIVAL_GUIDE_PDF) ?? null,
      completed,
    },
    { headers: noStore }
  );
}
