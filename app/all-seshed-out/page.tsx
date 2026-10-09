import type { Metadata } from "next";
import Link from "next/link";
import { MailerLiteForm } from "./MailerLiteForm";
import { BuyPanel } from "./BuyPanel";
import { SESHED_OUT_PRICE_LABEL } from "@/lib/seshed-out-config";

export const metadata: Metadata = {
  title: "All Seshed Out — with soberlifetom",
};

export default function AllSeshedOutPage() {
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
          All Seshed Out
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          With soberlifetom. Out on the 6th December.
        </p>

        <p className="text-white text-base sm:text-lg leading-relaxed">
          Cut back on drink without becoming boring. 90 days, one plan, and a
          survival guide for the nights out.
        </p>

        <ul className="w-full text-left flex flex-col gap-3 text-sm sm:text-base text-white/80">
          <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-[#39FF14] font-semibold">The 90-day plan.</span>{" "}
            Week by week, tick it off on your phone. Not sure where to start?
            Start here.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-[#39FF14] font-semibold">The sesh survival guide.</span>{" "}
            Get through the night out. Screenshot it, keep it, use it.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-[#39FF14] font-semibold">3 exclusive Score The Sesh deep dives.</span>{" "}
            Five minutes plus each, only for people inside.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-[#39FF14] font-semibold">A tote bag.</span>{" "}
            Posted to your door when you get in.
          </li>
        </ul>

        <p className="text-white/60 text-xs sm:text-sm">
          {SESHED_OUT_PRICE_LABEL}, one-off. Join the list below and you&apos;ll hear first.
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
