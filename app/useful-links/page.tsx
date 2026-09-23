import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Useful Links & Support — Score The Sesh",
};

type Resource = {
  name: string;
  detail: string;
  phone?: string;
  url: string;
  urlLabel: string;
};

const ALCOHOL_RESOURCES: Resource[] = [
  {
    name: "Drinkline",
    detail:
      "The national alcohol helpline. Free and confidential, for anyone concerned about their own drinking or someone else's. Weekdays 9am–8pm, weekends 11am–4pm.",
    phone: "0300 123 1110",
    url: "https://www.nhs.uk/live-well/alcohol-advice/alcohol-support/",
    urlLabel: "nhs.uk",
  },
  {
    name: "We Are With You",
    detail:
      "Free, confidential drug and alcohol support — online, by phone, or at a local service near you.",
    phone: "0808 801 0750",
    url: "https://www.wearewithyou.org.uk/",
    urlLabel: "wearewithyou.org.uk",
  },
  {
    name: "Alcoholics Anonymous (AA) Great Britain",
    detail: "Free peer support and local meetings, built around the 12-step programme.",
    phone: "0800 917 7650",
    url: "https://www.alcoholics-anonymous.org.uk/",
    urlLabel: "alcoholics-anonymous.org.uk",
  },
  {
    name: "SMART Recovery UK",
    detail:
      "A secular, self-management based alternative to 12-step — tools and meetings for building motivation to change.",
    url: "https://smartrecovery.org.uk/",
    urlLabel: "smartrecovery.org.uk",
  },
  {
    name: "Club Soda",
    detail:
      "A mindful drinking community for anyone cutting down, taking a break, or going alcohol-free — not just full abstinence.",
    url: "https://joinclubsoda.com/",
    urlLabel: "joinclubsoda.com",
  },
  {
    name: "Al-Anon Family Groups",
    detail: "Support for the friends and family of someone else's drinking, not just the drinker.",
    phone: "0800 008 6811",
    url: "https://al-anonuk.org.uk/",
    urlLabel: "al-anonuk.org.uk",
  },
];

const MENTAL_HEALTH_RESOURCES: Resource[] = [
  {
    name: "Samaritans",
    detail: "Free, confidential, non-judgemental support for anyone struggling — any time, day or night.",
    phone: "116 123",
    url: "https://www.samaritans.org/",
    urlLabel: "samaritans.org",
  },
  {
    name: "CALM (Campaign Against Living Miserably)",
    detail:
      "Support for anyone affected by suicide or suicidal thoughts. Phone, webchat and WhatsApp, open 5pm–midnight every day.",
    phone: "0800 58 58 58",
    url: "https://www.thecalmzone.net/",
    urlLabel: "thecalmzone.net",
  },
  {
    name: "Mind",
    detail: "Information and support on any mental health problem, plus a directory of local services.",
    phone: "0300 123 3393",
    url: "https://www.mind.org.uk/",
    urlLabel: "mind.org.uk",
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
      <h3
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="text-white font-bold text-lg sm:text-xl mb-1"
      >
        {resource.name}
      </h3>
      <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3">{resource.detail}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {resource.phone && (
          <a
            href={`tel:${resource.phone.replace(/\s+/g, "")}`}
            className="text-[#39FF14] font-bold text-sm sm:text-base hover:brightness-110 transition-all duration-200"
          >
            {resource.phone}
          </a>
        )}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200"
        >
          {resource.urlLabel}
        </a>
      </div>
    </div>
  );
}

export default function UsefulLinksPage() {
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
          Useful Links &amp; Support
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          If any of this resonates and you want to talk to someone properly — not just me on
          Instagram — these are real, free UK services worth knowing about.
        </p>

        <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
          If you or someone else is in immediate danger, call 999.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-md w-full mt-10 sm:mt-12">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-xl sm:text-2xl text-left"
        >
          Alcohol &amp; Recovery Support
        </h2>
        {ALCOHOL_RESOURCES.map((resource) => (
          <ResourceCard key={resource.name} resource={resource} />
        ))}
      </div>

      <div className="flex flex-col gap-4 max-w-md w-full mt-10 sm:mt-12">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-xl sm:text-2xl text-left"
        >
          Mental Health &amp; Crisis Support
        </h2>
        {MENTAL_HEALTH_RESOURCES.map((resource) => (
          <ResourceCard key={resource.name} resource={resource} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12">
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
