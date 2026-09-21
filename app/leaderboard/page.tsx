"use client";

import { useState } from "react";
import Link from "next/link";
import { CHUNKS, CHUNK_SIZE, categoryBreakdown, type Sesh } from "@/lib/sesh-data";

// One emoji per 10-sesh rank band: 1–10, 11–20, 21–30, 31–40, 41–50.
// Anything ranked 51 or worse gets a gravestone instead.
const RANGE_EMOJI = ["👑", "🐟", "🤠", "❌", "☠️"];
const GRAVEYARD_EMOJI = "🪦";
const GRAVEYARD_START_RANK = 51;

export default function LeaderboardPage() {
  const [openSesh, setOpenSesh] = useState<number | null>(null);
  const [openChunk, setOpenChunk] = useState<number>(0);

  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-10 sm:py-14"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md w-full text-center">
        <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
          Sesh Leaderboard
        </p>

        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-3xl sm:text-4xl leading-tight"
        >
          Every Sesh, Ranked
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          Every sesh, sorted highest score to lowest. Tap any sesh to see
          the category breakdown.
        </p>
      </div>

      {/* Old scoring system note */}
      <div className="max-w-2xl w-full mt-6 bg-[#39FF14]/5 border border-[#39FF14]/30 rounded-2xl p-4 sm:p-5 text-left">
        <p className="text-[#39FF14] text-[11px] sm:text-xs font-bold uppercase tracking-wide mb-2">
          Before you judge the numbers
        </p>
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
          Seshes 14–39 were scored under an older 4-category system, out of
          20 rather than 25. Score The Sesh has been through a few category
          changes since it started — Atmosphere, Characters, Location and
          Talent all used to be scored categories and are now vaulted (not
          gone forever, just resting). Keep that in mind comparing seshes
          from different eras.
        </p>
      </div>

      {/* Leaderboard, grouped 10 at a time */}
      <div className="flex flex-col gap-3 max-w-2xl w-full mt-8">
        {CHUNKS.map((chunk, chunkIndex) => {
          const rangeStart = chunkIndex * CHUNK_SIZE + 1;
          const rangeEnd = rangeStart + chunk.length - 1;
          const isChunkOpen = openChunk === chunkIndex;
          const chunkEmoji =
            rangeStart >= GRAVEYARD_START_RANK
              ? GRAVEYARD_EMOJI
              : RANGE_EMOJI[chunkIndex] ?? "";

          return (
            <div
              key={chunkIndex}
              className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenChunk(isChunkOpen ? -1 : chunkIndex)}
                aria-expanded={isChunkOpen}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                  className="text-white font-bold text-sm sm:text-base"
                >
                  {chunkEmoji} Rank {rangeStart}–{rangeEnd}
                </span>
                <span
                  className={`text-[#39FF14] text-xs transition-transform duration-200 ${
                    isChunkOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isChunkOpen && (
                <div className="px-3 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chunk.map((entry: Sesh, indexInChunk) => {
                    const rank = rangeStart + indexInChunk;
                    const isTop = rank === 1;
                    const isOpen = openSesh === entry.sesh;
                    return (
                      <div
                        key={entry.sesh}
                        className={`rounded-xl border overflow-hidden ${
                          isTop
                            ? "bg-[#39FF14]/10 border-[#39FF14]/50"
                            : "bg-black/20 border-white/10"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenSesh(isOpen ? null : entry.sesh)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              style={{ fontFamily: "var(--font-space-grotesk)" }}
                              className={`text-sm font-bold w-7 shrink-0 text-center ${
                                isTop ? "text-[#39FF14]" : "text-white/50"
                              }`}
                            >
                              {rank}
                            </span>
                            <span className="text-white font-medium text-sm sm:text-base truncate">
                              Sesh {entry.sesh}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-white/70 text-xs sm:text-sm tabular-nums">
                              {entry.total}/{entry.maxScore}
                            </span>
                            <span
                              className={`text-white/40 text-xs transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-2">
                              {categoryBreakdown(entry).map((cat) => (
                                <div
                                  key={cat.label}
                                  className="bg-black/30 rounded-lg px-3 py-2 flex flex-col gap-0.5"
                                >
                                  <span className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-wide">
                                    {cat.label}
                                  </span>
                                  <span className="text-white text-sm font-bold tabular-nums">
                                    {cat.value}/5
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                              <a
                                href={entry.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#39FF14] text-xs sm:text-sm font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200"
                              >
                                Watch on Instagram →
                              </a>
                              <Link
                                href={`/your-turn-to-score?sesh=${entry.sesh}`}
                                className="text-[#39FF14] text-xs sm:text-sm font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200"
                              >
                                You score it, click here →
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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
