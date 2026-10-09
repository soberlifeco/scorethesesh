import type { Metadata } from "next";
import { GuideClient } from "./GuideClient";

export const metadata: Metadata = {
  title: "All Seshed Out — your guide",
  robots: { index: false, follow: false },
};

export default function GuidePage() {
  return <GuideClient />;
}
