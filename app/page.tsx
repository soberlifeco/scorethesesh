import Link from "next/link";

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
            Scored on 5 categories: Music, Substances, Vibes, WTF, ROI
          </p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            New episode every single day
          </p>
        </div>

        {/* All Seshed Out CTA */}
        <Link
          href="/all-seshed-out"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="mt-2 w-full bg-[#39FF14] text-black font-black uppercase tracking-wide px-6 py-5 sm:py-6 rounded-2xl text-lg sm:text-2xl text-center leading-tight hover:brightness-110 transition-all duration-200"
        >
          Click here to register interest for All Seshed Out
        </Link>
      </div>

      {/* Footer */}
      <p className="text-white/30 text-xs text-center pb-1">scorethesesh.com</p>
    </div>
  );
}
