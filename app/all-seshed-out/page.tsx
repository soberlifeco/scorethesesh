import type { Metadata } from "next";
import Link from "next/link";
import { MailerLiteForm } from "./MailerLiteForm";
import { BuyPanel } from "./BuyPanel";
import { SESHED_OUT_PRICE_LABEL } from "@/lib/seshed-out-config";

export const metadata: Metadata = {
  title: "All Seshed Out — from soberlifetom",
};

export default function AllSeshedOutPage() {
  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-12 sm:py-16"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-col items-center gap-5 sm:gap-6 max-w-md w-full text-center">
        <div>
          <h1
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="text-white font-bold text-4xl sm:text-5xl leading-tight"
          >
            All Seshed Out
          </h1>
          <p className="mt-1 text-[#39FF14] text-sm sm:text-base font-medium tracking-[0.15em] uppercase">
            from soberlifetom
          </p>
        </div>

        <p className="text-white text-base sm:text-lg leading-relaxed">
          Filling the sober space in society, cut back without being judged or
          ashamed. 90 days, one plan. To get you on track and to the point you
          can look back and say &quot;I miss the sesh, but not how I felt after
          it&quot;
        </p>

        <div className="w-full rounded-xl border border-[#39FF14]/40 bg-white/5 px-5 py-4 text-left">
          <p
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            className="text-[#39FF14] text-sm font-bold tracking-[0.2em] uppercase"
          >
            Bonus
          </p>
          <ul className="mt-3 flex flex-col gap-3 text-sm sm:text-base text-white/85 list-disc pl-5">
            <li>
              A sesh survival guide for those already sober/curious folk
            </li>
            <li>
              3 exclusive Score The Sesh deep dive videos - to make you laugh
              but also think and reflect
            </li>
            <li>A free Score The Sesh tote bag delivered to your address</li>
          </ul>
        </div>

        <p className="text-white/60 text-xs sm:text-sm">
          Launching 6th December · {SESHED_OUT_PRICE_LABEL} one-off. Register
          your interest below and you&apos;ll hear first.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 max-w-md w-full">
        <MailerLiteForm />
      </div>

      <BuyPanel />

      <Link
        href="/"
        className="mt-8 text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}
