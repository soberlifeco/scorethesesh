import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/soberlifetom";
const DONATE_URL = "https://donate.stripe.com/00wfZ9bCP9QrcSb0YM7EQ06";

export default function HomePage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-6 max-w-md w-full text-center">
        {/* Eyebrow — scoreboard/LED display treatment */}
        <div className="relative w-full max-w-lg">
          {/* Ambient glow spilling behind the "screen" */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
            style={{ backgroundColor: "#39FF14" }}
          />

          <div className="relative overflow-hidden rounded-lg border border-[#39FF14]/25 bg-black px-5 py-5 sm:px-9 sm:py-7">
            {/* Scanline texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(57,255,20,0.12) 0px, rgba(57,255,20,0.12) 1px, transparent 1px, transparent 3px)",
              }}
            />
            {/* Faint vignette so the panel reads as a screen, not a flat box */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 40px 10px rgba(0,0,0,0.6)",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-space-grotesk)",
                letterSpacing: "-0.02em",
                textShadow:
                  "0 0 6px rgba(57,255,20,0.9), 0 0 18px rgba(57,255,20,0.7), 0 0 42px rgba(57,255,20,0.45)",
              }}
              className="relative z-10 text-[#39FF14] text-5xl sm:text-7xl font-black uppercase leading-none"
            >
              Score The Sesh
            </p>
          </div>
        </div>

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
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
          >
            Support Score The Sesh
          </a>
        </div>

        {/* Donate CTA */}
        <div className="w-full flex flex-col items-center gap-3 mt-2">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full text-sm sm:text-base text-center hover:brightness-110 transition-all duration-200"
          >
            Click here to donate to Score The Sesh, so I can keep doing this
            for YOU
          </a>
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
