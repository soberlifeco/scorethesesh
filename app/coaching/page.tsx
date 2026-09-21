import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "1:1 Coaching — Score The Sesh",
};

const BOOKING_URL = "https://buy.stripe.com/8x27sD5er1jV9FZgXK7EQ07";

const STATS = [
  { value: "4", label: "Sessions" },
  { value: "1", label: "Month" },
  { value: "4hrs", label: "1:1 With Me" },
];

const INCLUDES = [
  "1 hour session per week at a selected time",
  "Calls on whatever platform suits you — WhatsApp video, Zoom, FaceTime, Google Meet, etc.",
  "Unlimited 1:1 WhatsApp messaging between 8am–8pm",
  "Help guides for social situations",
  "Reviewing current habits",
  "Deep dive into goals and aims for the month",
  "Personal and relatable 1:1 talks",
  "No unrelatable bullshit",
];

export default function CoachingPage() {
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
          1:1 Coaching With Me
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          To battle that sober start alongside someone with 3 years
          sobriety, tonnes of lived experience and a passion for helping
          others.
        </p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-3 max-w-md w-full mt-10">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-2"
          >
            <span
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="text-[#39FF14] font-bold text-2xl sm:text-3xl"
            >
              {stat.value}
            </span>
            <span className="text-white/60 text-[11px] sm:text-xs uppercase tracking-wide text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="flex flex-col gap-4 max-w-md w-full mt-10 sm:mt-12">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-xl sm:text-2xl text-left"
        >
          The 4 weeks include
        </h2>

        <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <ul className="flex flex-col gap-3">
            {INCLUDES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-white/70 text-sm sm:text-base leading-relaxed"
              >
                <span className="text-[#39FF14] font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12 max-w-md w-full">
        <span
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-4xl sm:text-5xl"
        >
          £324.99
        </span>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="mt-2 w-full text-center bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-200"
        >
          Book Your Month
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
