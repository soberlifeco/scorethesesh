"use client";

import { useState } from "react";
import Link from "next/link";

type Sesh = {
  sesh: number;
  music: number;
  substances: number;
  cat3: number;
  hangover: number | null; // null = old 4-category era (no Hangover)
  cat5: number;
  total: number;
  maxScore: number;
  instagram: string;
};

const SESH_DATA: Sesh[] = [
  { sesh: 1, music: 3, substances: 0, cat3: 1, hangover: 1, cat5: 1, total: 6, maxScore: 25, instagram: "https://www.instagram.com/reel/Dbjbp3ftTOY/" },
  { sesh: 2, music: 2, substances: 2, cat3: 3, hangover: 2, cat5: 0, total: 9, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DblkD45tSob/" },
  { sesh: 3, music: 3, substances: 5, cat3: 2, hangover: 4, cat5: 3, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DboJEh5Nu7W/" },
  { sesh: 4, music: 2, substances: 2, cat3: 4, hangover: 1, cat5: 3, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbquVN1trzw/" },
  { sesh: 5, music: 5, substances: 0, cat3: 3, hangover: 1, cat5: 4, total: 13, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbspGc1N6Md/" },
  { sesh: 6, music: 1, substances: 2, cat3: 3, hangover: 4, cat5: 2, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Dbvuzk8N5ZT/" },
  { sesh: 7, music: 2, substances: 1, cat3: 4, hangover: 1, cat5: 0, total: 8, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DbyMuHatdZu/" },
  { sesh: 8, music: 4, substances: 4, cat3: 3, hangover: 3, cat5: 3, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db0zm74N_g4/" },
  { sesh: 9, music: 2, substances: 0, cat3: 5, hangover: 0, cat5: 3, total: 10, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db3YTCet6ub/" },
  { sesh: 10, music: 3, substances: 1, cat3: 2, hangover: 1, cat5: 5, total: 12, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db56HLztQrY/" },
  { sesh: 11, music: 2, substances: 0, cat3: 1, hangover: 0, cat5: 3, total: 6, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db8fIeGN4ZF/" },
  { sesh: 12, music: 3, substances: 2, cat3: 1, hangover: 0, cat5: 2, total: 8, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/Db_HC_ZtDeQ/" },
  { sesh: 13, music: 2, substances: 2, cat3: 3, hangover: 4, cat5: 4, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DcBwpPVt_GD/" },
  { sesh: 14, music: 3, substances: 1, cat3: 3, hangover: null, cat5: 4, total: 11, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcEGMtLt4-q/" },
  { sesh: 15, music: 3, substances: 4, cat3: 2, hangover: null, cat5: 5, total: 14, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcGzJ8At56y/" },
  { sesh: 16, music: 2, substances: 4, cat3: 3, hangover: null, cat5: 1, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcJk3-oNF_V/" },
  { sesh: 17, music: 0, substances: 3, cat3: 2, hangover: null, cat5: 5, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcMP1wftFjK/" },
  { sesh: 18, music: 4, substances: 4, cat3: 4, hangover: null, cat5: 2, total: 14, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcO0rFatAr4/" },
  { sesh: 19, music: 3, substances: 3, cat3: 0, hangover: null, cat5: 0, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcRVU9EtRj2/" },
  { sesh: 20, music: 4, substances: 2, cat3: 3, hangover: null, cat5: 3, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcUAC2kNhM_/" },
  { sesh: 21, music: 1, substances: 5, cat3: 0, hangover: null, cat5: 3, total: 9, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcWZQR7N-cB/" },
  { sesh: 22, music: 1, substances: 3, cat3: 1, hangover: null, cat5: 2, total: 7, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcY4E8jNZGn/" },
  { sesh: 23, music: 3, substances: 3, cat3: 1, hangover: null, cat5: 5, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcbfYkzt817/" },
  { sesh: 24, music: 0, substances: 2, cat3: 2, hangover: null, cat5: 3, total: 7, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DceBdG4MhH0/" },
  { sesh: 25, music: 2, substances: 4, cat3: 1, hangover: null, cat5: 2, total: 9, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcgwUSBtv3E/" },
  { sesh: 26, music: 2, substances: 4, cat3: 2, hangover: null, cat5: 4, total: 12, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcjMCOQtho0/" },
  { sesh: 27, music: 5, substances: 3, cat3: 3, hangover: null, cat5: 4, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DclwQ4SNY5M/" },
  { sesh: 28, music: 3, substances: 5, cat3: 4, hangover: null, cat5: 3, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcoX6TetjSb/" },
  { sesh: 29, music: 0, substances: 2, cat3: 2, hangover: null, cat5: 4, total: 8, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcrJ810NokB/" },
  { sesh: 30, music: 1, substances: 4, cat3: 0, hangover: null, cat5: 1, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dcthr-atINg/" },
  { sesh: 31, music: 4, substances: 4, cat3: 0, hangover: null, cat5: 2, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DcwHmfPtPjr/" },
  { sesh: 32, music: 4, substances: 2, cat3: 4, hangover: null, cat5: 5, total: 15, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dcy4P76thtq/" },
  { sesh: 33, music: 2, substances: 3, cat3: 2, hangover: null, cat5: 4, total: 11, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc1Jt_BtyJf/" },
  { sesh: 34, music: 5, substances: 5, cat3: 4, hangover: null, cat5: 5, total: 19, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc3w5NxtLKy/" },
  { sesh: 35, music: 3, substances: 0, cat3: 0, hangover: null, cat5: 1, total: 4, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc6TOsctnU1/" },
  { sesh: 36, music: 4, substances: 2, cat3: 1, hangover: null, cat5: 3, total: 10, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc82lSgNdJO/" },
  { sesh: 37, music: 5, substances: 0, cat3: 2, hangover: null, cat5: 1, total: 8, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/Dc_mE9xt1WR/" },
  { sesh: 38, music: 0, substances: 4, cat3: 2, hangover: null, cat5: 0, total: 6, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DdCGVy9tvz0/" },
  { sesh: 39, music: 3, substances: 0, cat3: 2, hangover: null, cat5: 0, total: 5, maxScore: 20, instagram: "https://www.instagram.com/soberlifetom/reel/DdEpadmNYJz/" },
  { sesh: 40, music: 3, substances: 3, cat3: 3, hangover: 1, cat5: 4, total: 14, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdHT00mtFhH/" },
  { sesh: 41, music: 4, substances: 3, cat3: 3, hangover: 0, cat5: 5, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdJ2-hsNwh9/" },
  { sesh: 42, music: 1, substances: 4, cat3: 5, hangover: 3, cat5: 4, total: 17, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdMf0z7t-W7/" },
  { sesh: 43, music: 3, substances: 2, cat3: 2, hangover: 4, cat5: 4, total: 15, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdPADFpNs-b/" },
  { sesh: 44, music: 1, substances: 0, cat3: 3, hangover: 0, cat5: 0, total: 4, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdRlxg_NqVX/" },
  { sesh: 45, music: 3, substances: 2, cat3: 4, hangover: 2, cat5: 5, total: 16, maxScore: 25, instagram: "https://www.instagram.com/soberlifetom/reel/DdUGKh5tvet/" },
];

const RANKED = [...SESH_DATA].sort((a, b) => b.total - a.total || a.sesh - b.sesh);

const CHUNK_SIZE = 10;
const CHUNKS: Sesh[][] = [];
for (let i = 0; i < RANKED.length; i += CHUNK_SIZE) {
  CHUNKS.push(RANKED.slice(i, i + CHUNK_SIZE));
}

function categoryBreakdown(entry: Sesh): { label: string; value: number }[] {
  if (entry.hangover === null) {
    return [
      { label: "Music", value: entry.music },
      { label: "Substances", value: entry.substances },
      { label: "Atmosphere/Location", value: entry.cat3 },
      { label: "Characters/Talent", value: entry.cat5 },
    ];
  }
  return [
    { label: "Music", value: entry.music },
    { label: "Substances", value: entry.substances },
    { label: "Smell", value: entry.cat3 },
    { label: "Hangover", value: entry.hangover },
    { label: "Vibes", value: entry.cat5 },
  ];
}

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
                  Rank {rangeStart}–{rangeEnd}
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
                  {chunk.map((entry, indexInChunk) => {
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

                            <a
                              href={entry.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#39FF14] text-xs sm:text-sm font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200 self-start"
                            >
                              Watch on Instagram →
                            </a>
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
