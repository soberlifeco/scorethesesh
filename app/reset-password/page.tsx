"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setError("Accounts aren't configured yet.");
      return;
    }
    if (password.length < 6) {
      setStatus("error");
      setError("Password needs to be 6+ characters.");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setError("Passwords don't match.");
      return;
    }

    setStatus("loading");
    setError("");

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setStatus("error");
      setError(updateError.message);
      return;
    }
    setStatus("done");
  }

  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center justify-center px-6 py-10 text-center gap-5 sm:gap-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
        Reset Password
      </p>

      <h1
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-md"
      >
        Set A New Password
      </h1>

      {status === "done" ? (
        <div className="max-w-sm w-full flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center">
          <p className="text-white text-sm sm:text-base font-medium">Password updated</p>
          <p className="text-white/60 text-xs sm:text-sm">
            You&apos;re all set — head back and log in with your new password.
          </p>
          <Link
            href="/your-turn-to-score"
            className="text-[#39FF14] text-xs sm:text-sm font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200"
          >
            Go to Your Turn To Score →
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-sm w-full flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (6+ characters)"
            className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
          />
          <input
            type="password"
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="w-full bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full text-sm hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "..." : "Update Password"}
          </button>

          {status === "error" && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}
        </form>
      )}

      <Link
        href="/"
        className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}
