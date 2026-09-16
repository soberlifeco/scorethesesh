"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INSTAGRAM_URL = "https://www.instagram.com/soberlifetom";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Try again.");
      }

      router.push("/thank-you");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  return (
    <div
      className="min-h-dvh flex flex-col items-center px-6 py-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-6 max-w-md w-full text-center">
        {/* Eyebrow */}
        <p className="text-[#39FF14] text-lg sm:text-xl font-extrabold tracking-[0.15em] uppercase">
          Score The Sesh
        </p>

        {/* Heading */}
        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-2xl sm:text-3xl leading-tight"
        >
          10+ years on the sesh, 3 years off the sesh. Created for current
          sesh heads, ex sesh heads and anyone in the middle.
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

        {/* Email capture */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3 mt-2"
        >
          <p className="text-white text-sm sm:text-base font-medium">
            Become a scorer with me,{" "}
            <span className="text-[#39FF14]">early access</span> to everything
            Score The Sesh: leaderboards, exclusive sessions and more
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm sm:text-base placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Join the List"}
            </button>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-xs sm:text-sm">{errorMessage}</p>
          )}

          <p className="text-white/30 text-xs">No spam. Unsubscribe anytime.</p>
        </form>

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
