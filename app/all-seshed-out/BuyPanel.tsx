"use client";

import { useState } from "react";
import Link from "next/link";
import { isSalesOpen, SESHED_OUT_PRICE_LABEL } from "@/lib/seshed-out-config";
import { useClientValue } from "@/lib/use-client-value";

/**
 * Buy button + "already bought" link. Stays hidden until sales open
 * (6 Dec 2026, or NEXT_PUBLIC_SESHED_OUT_SALES_OPEN=true for testing).
 * The checkout API enforces the same rule on the server.
 */
export function BuyPanel() {
  const open = useClientValue(() => isSalesOpen(), false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seshed-out/checkout", { method: "POST" });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error || "Couldn't start checkout. Try again.");
        setLoading(false);
        return;
      }
      window.location.href = json.url;
    } catch {
      setError("Couldn't start checkout. Check your connection and try again.");
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="mt-8 max-w-md w-full flex flex-col items-center gap-4 text-center">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="w-full rounded-lg bg-[#39FF14] px-6 py-4 text-lg font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Taking you to checkout..." : `Get All Seshed Out · ${SESHED_OUT_PRICE_LABEL}`}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Link
        href="/all-seshed-out/guide"
        className="text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white"
      >
        Already bought it? Log in here
      </Link>
    </div>
  );
}
