import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support Score The Sesh",
};

export default function SupportPage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center justify-center px-6 py-6 text-center gap-5 sm:gap-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
        Support Score The Sesh
      </p>

      <h1
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-md"
      >
        Help Me Pour Everything Into This
      </h1>

      <div className="flex flex-col gap-3 max-w-md text-white/70 text-sm sm:text-base leading-relaxed">
        <p>Help me pour everything into this.</p>
        <p>
          You are all amazing and you can donate whatever you like to this
          venture.
        </p>
        <p>
          I hate asking for things and Score The Sesh should be absolutely
          free for the people, but if you&apos;d like to help me push on, I
          would greatly appreciate it.
        </p>
      </div>

      <a
        href="https://donate.stripe.com/00wfZ9bCP9QrcSb0YM7EQ06"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="inline-block bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-200"
      >
        Donate
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
