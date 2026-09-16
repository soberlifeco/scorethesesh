import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Turn To Score — Score The Sesh",
};

export default function YourTurnToScorePage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center justify-center px-6 py-6 text-center gap-5 sm:gap-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
        Your Turn To Score
      </p>

      <h1
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-md"
      >
        Coming Soon
      </h1>

      <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-sm">
        Send in your worst one and get it scored. Details dropping soon.
      </p>

      <Link
        href="/"
        className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}
