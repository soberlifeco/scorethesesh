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
        {/* Eyebrow — chalkboard treatment */}
        <div className="relative w-full max-w-lg">
          <div
            className="relative overflow-hidden rounded-md border-[6px] px-6 py-7 sm:px-10 sm:py-9 flex flex-col items-center"
            style={{
              backgroundColor: "#1B2B22",
              borderColor: "#6B4A30",
              boxShadow: "inset 0 0 50px 12px rgba(0,0,0,0.5)",
            }}
          >
            {/* Chalk dust texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-chalk)",
                textShadow:
                  "0 0 1px rgba(255,255,255,0.5), 0 0 8px rgba(255,255,255,0.25)",
              }}
              className="relative z-10 text-white/90 text-3xl sm:text-5xl uppercase leading-tight text-center"
            >
              Score The Sesh
            </p>

            <svg
              aria-hidden
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="relative z-10 w-48 sm:w-64 h-4 sm:h-5 mt-2"
            >
              <path
                d="M4 11 Q 30 3, 60 10 T 120 8 Q 150 13, 180 7 T 240 11 Q 265 5, 296 9"
                stroke="#39FF14"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
            </svg>
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
            Scored on 5 categories: Music, Substances, Vibes, Hangover, WTF
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
            Click here to Support Score The Sesh
          </a>
          <Link
            href="/coaching"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="border border-[#39FF14] text-[#39FF14] font-bold px-8 py-3 rounded-full text-sm sm:text-base text-center hover:bg-[#39FF14] hover:text-black transition-all duration-200"
          >
            Work with Tom 1:1
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
