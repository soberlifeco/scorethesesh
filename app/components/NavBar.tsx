"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Score The Sesh", href: "/" },
  { label: "Scoring Science", href: "/scoring-science" },
  { label: "Sesh Leaderboard", href: "/leaderboard" },
  { label: "Your Turn To Score", href: "/your-turn-to-score" },
  { label: "Community Scores", href: "/community-scores" },
  { label: "Support Score The Sesh", href: "/support" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className={`text-[11px] sm:text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                isActive
                  ? "text-[#39FF14]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
