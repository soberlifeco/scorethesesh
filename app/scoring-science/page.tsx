import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scoring Science — Score The Sesh",
};

const CATEGORIES = [
  {
    name: "Music",
    direction: "Better music = higher score",
    copy: "Every sesh MUST have music — if it doesn't, can it even be called a sesh? Music is everywhere, and music is life. Simply put, the better the music, the higher the score.",
  },
  {
    name: "Substances",
    direction: "More/heavy substances = higher score",
    copy: "Not every sesh NEEDS substances, but most of them have some form of drink or drug involved. Unless you're like me — boring, three years sober, and running on a few Lucky Saints, a vape and some chewing gum. The crazier — or the more — of the substances, the higher the score.",
  },
  {
    name: "Vibes",
    direction: "Better vibes = higher score",
    copy: "A wide spectrum category, this one. It gathers the impact of the people, the location, the atmosphere and anything else relevant. The higher the better.",
  },
  {
    name: "WTF",
    direction: "Crazier sesh = higher score",
    copy: "Says it on the tin. The higher the rating, the crazier the sesh — things we don't usually see. The more we say what the fuck, the higher it goes.",
  },
  {
    name: "ROI (Return on Indulgence)",
    direction: "More worthwhile sesh = higher score",
    copy: "We've all been on the sesh — this category is to determine how worthwhile that sesh actually was. It encapsulates a lot of the other scores into one. Think of it as the next day/week in a nutshell. Replaced Hangover from Episode 66.",
  },
];

const VAULTED = [
  {
    name: "Hangover",
    direction: "Vaulted from Episode 66",
    copy: "Worse hangover = higher score. If you were waking up hungover or coming down hard, it usually meant you went too far / had an amazing night. It's been vaulted — but not gone forever. Episodes 40-65 were scored with it.",
  },
];

export default function ScoringSciencePage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-12 sm:py-16"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-md w-full text-center">
        <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
          Score The Sesh
        </p>

        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-3xl sm:text-4xl leading-tight"
        >
          Scoring Science
        </h1>

        <div className="flex flex-col gap-3 text-white/70 text-sm sm:text-base leading-relaxed">
          <p>Each category normally runs 0 to 5 — but can go as low as -5 for the seshes that earn it.</p>
          <p>
            There are 5 categories in total, meaning the max score that can be
            awarded is <span className="text-[#39FF14] font-bold">25/25</span>.
            Don&apos;t worry — I try to keep it simple (because I am stupid).
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-4 max-w-md w-full mt-10 sm:mt-12">
        {CATEGORIES.map((category) => (
          <div
            key={category.name}
            className="text-left bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
          >
            <div className="flex flex-col gap-1 mb-2">
              <h2
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="text-white font-bold text-xl sm:text-2xl"
              >
                {category.name}
              </h2>
              <span className="text-[#39FF14] text-[11px] sm:text-xs font-medium uppercase tracking-wide">
                {category.direction}
              </span>
            </div>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              {category.copy}
            </p>
          </div>
        ))}
      </div>

      {/* Vaulted categories */}
      <div className="flex flex-col gap-4 max-w-md w-full mt-8">
        <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] text-center">
          In the vault
        </p>
        {VAULTED.map((category) => (
          <div
            key={category.name}
            className="text-left bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 opacity-70"
          >
            <div className="flex flex-col gap-1 mb-2">
              <h2
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                className="text-white font-bold text-xl sm:text-2xl"
              >
                {category.name}
              </h2>
              <span className="text-white/50 text-[11px] sm:text-xs font-medium uppercase tracking-wide">
                {category.direction}
              </span>
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              {category.copy}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12">
        <a
          href="https://www.instagram.com/soberlifetom"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="inline-block bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-200"
        >
          Follow @soberlifetom
        </a>

        <Link
          href="/"
          className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
        >
          Back to scorethesesh.com
        </Link>
      </div>
    </div>
  );
}
