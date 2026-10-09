import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { getConfirmedUser, hasPurchased } from "@/lib/seshed-out-access";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { ALL_TASK_IDS } from "@/lib/seshed-out-content";

const TASK_IDS = new Set(ALL_TASK_IDS);

/** Saves one tick (done: true) or un-tick (done: false) for the signed-in buyer. */
export async function POST(req: NextRequest) {
  if (isRateLimited(`so-progress:${clientIp(req)}`, 120, 60_000)) {
    return NextResponse.json({ error: "Slow down." }, { status: 429 });
  }

  let taskId: unknown;
  let done: unknown;
  try {
    const body = await req.json();
    taskId = body?.taskId;
    done = body?.done;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof taskId !== "string" || !TASK_IDS.has(taskId) || typeof done !== "boolean") {
    return NextResponse.json({ error: "Invalid task." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const user = await getConfirmedUser(req, supabase);
  if (!user) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }

  try {
    if (!(await hasPurchased(supabase, user.email))) {
      return NextResponse.json({ error: "no_purchase" }, { status: 403 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't check your purchase." }, { status: 500 });
  }

  const { error } = done
    ? await supabase
        .from("seshed_out_progress")
        .upsert({ user_id: user.id, task_id: taskId }, { onConflict: "user_id,task_id" })
    : await supabase
        .from("seshed_out_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("task_id", taskId);

  if (error) {
    console.error("Saving progress failed:", error.message);
    return NextResponse.json({ error: "Couldn't save that. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
