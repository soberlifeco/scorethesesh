import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";
import { categoryLabels, maxScoreForSesh, totalOfScores } from "@/lib/sesh-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Scores — Score The Sesh",
};

type FeedRow = {
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

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

export default async function CommunityScoresPage() {
  const supabase = getSupabaseServerClient();
  let rows: FeedRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("community_scores")
      .select("username, sesh, music, substances, cat3, hangover, cat5, notes, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50);
    if (error) {
      loadError = true;
    } else {
      rows = (data ?? []) as FeedRow[];
    }
  }

  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-10 sm:py-14"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md w-full text-center">
        <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
          Community Scores
        </p>

        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-3xl sm:text-4xl leading-tight"
        >
          Fresh Off The Sesh
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          Every community score, newest first. Screenshot &apos;em, argue
          about &apos;em, whatever you like.
        </p>
      </div>

      <div className="flex flex-col gap-3 max-w-2xl w-full mt-8">
        {!supabase || loadError ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center">
            <p className="text-white/60 text-sm">
              Couldn&apos;t load community scores right now. Try again in a
              bit.
            </p>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center">
            <p className="text-white/60 text-sm">
              No scores yet — be the first.{" "}
              <Link
                href="/your-turn-to-score"
                className="text-[#39FF14] underline underline-offset-4 hover:brightness-110"
              >
                Score a sesh →
              </Link>
            </p>
          </div>
        ) : (
          rows.map((row, i) => {
            const total = totalOfScores(row);
            const max = maxScoreForSesh(row.sesh);
            return (
              <div
                key={`${row.username}-${row.sesh}-${i}`}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                      className="text-white font-bold text-sm sm:text-base truncate"
                    >
                      {row.username}
                    </span>
                    <span className="text-white/50 text-xs sm:text-sm shrink-0">
                      scored Sesh {row.sesh}
                    </span>
                  </div>
                  <span className="text-white/30 text-[11px] sm:text-xs shrink-0">
                    {timeAgo(row.updated_at)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#39FF14] font-bold text-lg sm:text-xl tabular-nums">
                    {total}/{max}
                  </span>
                  <Link
                    href={`/your-turn-to-score?sesh=${row.sesh}`}
                    className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
                  >
                    Score this sesh yourself →
                  </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {categoryLabels(row.sesh).map(({ key, label }) => (
                    <div
                      key={key}
                      className="bg-black/30 rounded-lg px-2.5 py-2 flex flex-col gap-0.5"
                    >
                      <span className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-wide truncate">
                        {label}
                      </span>
                      <span className="text-white text-sm font-bold tabular-nums">
                        {(row[key] as number | null) ?? 0}/5
                      </span>
                    </div>
                  ))}
                </div>

                {row.notes && (
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{row.notes}&rdquo;
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      <Link
        href="/"
        className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200 mt-10"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}
