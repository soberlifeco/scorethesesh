import type { Metadata } from "next";
import Link from "next/link";
import { MailerLiteForm } from "./MailerLiteForm";
import { BuyPanel } from "./BuyPanel";

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
          With soberlifetom. Something&apos;s coming on the 6th December.
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
