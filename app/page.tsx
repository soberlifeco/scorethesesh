import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/soberlifetom";

export default function HomePage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-6 max-w-md w-full text-center">
        {/* Eyebrow */}
        <p
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-[#39FF14] text-5xl sm:text-7xl font-black tracking-[0.05em] uppercase leading-none"
        >
          Score The Sesh
        </p>

        {/* Heading */}
        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-2xl sm:text-3xl leading-tight"
        >
          Uniting ex sesh heads, current sesh heads and the people that are
          in the middle
        </h1>

        {/* Body copy */}
        <div className="flex flex-col gap-2">
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Parties, raves, afters, festivals and everything in between...
          </p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Scored on 5 categories: Music, Substances, Smell, Hangover, Vibes
          </p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            New episode every single day
          </p>
        </div>

        {/* Scoring Science link */}
        <Link
          href="/scoring-science"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-[#39FF14] text-sm sm:text-base font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200"
        >
          See the Scoring Science →
        </Link>

        {/* Links to the rest of the site */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link
            href="/leaderboard"
            className="text-white/60 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            Sesh Leaderboard
          </Link>
          <Link
            href="/your-turn-to-score"
            className="text-white/60 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            Your Turn To Score
          </Link>
          <Link
            href="/community-scores"
            className="text-white/60 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            Community Scores
          </Link>
          <Link
            href="/support"
            className="text-white/60 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            Support Score The Sesh
          </Link>
        </div>

        {/* Donate CTA */}
        <div className="w-full flex flex-col items-center gap-3 mt-2">
          <Link
            href="/support"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full text-sm sm:text-base text-center hover:brightness-110 transition-all duration-200"
          >
            Click here to donate to Score The Sesh, so I can keep doing this
            for YOU
          </Link>
        </div>

        {/* Secondary link */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
        >
          Follow @soberlifetom on Instagram
        </a>
      </div>

      {/* Footer */}
      <p className="text-white/30 text-xs text-center pb-1">scorethesesh.com</p>
    </div>
  );
}
