import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're in — Score The Sesh",
};

export default function ThankYouPage() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-6 text-center gap-5 sm:gap-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
        You&apos;re in
      </p>

      <h1
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-md"
      >
        You&apos;re on the list
      </h1>

      <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-sm">
        Keep an eye on your inbox — that&apos;s where the good stuff lands first.
      </p>

      <Link
        href="/scoring-science"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="inline-block bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-200"
      >
        See the Scoring Science
      </Link>

      <a
        href="https://www.instagram.com/soberlifetom"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/70 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
      >
        Follow @soberlifetom on Instagram
      </a>

      <Link
        href="/"
        className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}
