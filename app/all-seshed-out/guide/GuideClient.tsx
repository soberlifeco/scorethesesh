"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { isSalesOpen, SESHED_OUT_PRICE_LABEL } from "@/lib/seshed-out-config";
import { useClientValue } from "@/lib/use-client-value";
// Type-only import: erased at build time, so no paid content reaches the bundle.
import type { Phase, Week } from "@/lib/seshed-out-content";

type VideoItem = { title: string; description: string; url: string | null };

type Content = {
  email: string;
  plan: Phase[];
  survivalGuide: {
    title: string;
    intro: string;
    sections: { id: string; title: string; points: string[] }[];
    lines: { title: string; items: { situation: string; line: string }[] };
  };
  safetyNote: string;
  intro: VideoItem;
  exclusive: (VideoItem & { id: string })[];
  guidePdfUrl: string | null;
  completed: string[];
};

type View =
  | { kind: "loading" }
  | { kind: "signedOut" }
  | { kind: "noPurchase"; email: string }
  | { kind: "error"; message: string }
  | { kind: "ready"; content: Content };

const heading = { fontFamily: "var(--font-space-grotesk)" } as const;

export function GuideClient() {
  const supabase = getSupabaseBrowserClient();
  const [view, setView] = useState<View>(() =>
    supabase
      ? { kind: "loading" }
      : { kind: "error", message: "Login isn't set up yet." }
  );
  const [done, setDone] = useState<Set<string>>(new Set());
  const [saveError, setSaveError] = useState("");
  const justPaid = useClientValue(
    () => new URLSearchParams(window.location.search).get("checkout") === "success",
    false
  );
  const salesOpen = useClientValue(() => isSalesOpen(), false);
  const loadedRef = useRef(false);

  const load = useCallback(async (token: string) => {
    loadedRef.current = true;
    try {
      const res = await fetch("/api/seshed-out/content", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.status === 401) {
        loadedRef.current = false;
        setView({ kind: "signedOut" });
        return;
      }
      if (res.status === 403) {
        const json = (await res.json()) as { email?: string };
        setView({ kind: "noPurchase", email: json.email || "" });
        return;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      const content = (await res.json()) as Content;
      setDone(new Set(content.completed));
      setView({ kind: "ready", content });
    } catch {
      loadedRef.current = false;
      setView({
        kind: "error",
        message: "Couldn't load your guide. Check your connection and refresh.",
      });
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) {
        if (!loadedRef.current) load(data.session.access_token);
      } else {
        setView((v) => (v.kind === "loading" ? { kind: "signedOut" } : v));
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "SIGNED_OUT") {
        loadedRef.current = false;
        setView({ kind: "signedOut" });
        return;
      }
      if (session && event === "SIGNED_IN" && !loadedRef.current) {
        load(session.access_token);
      }
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, load]);

  async function toggle(taskId: string) {
    if (!supabase) return;
    const next = !done.has(taskId);
    setSaveError("");
    setDone((prev) => {
      const s = new Set(prev);
      if (next) s.add(taskId);
      else s.delete(taskId);
      return s;
    });

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("no session");
      const res = await fetch("/api/seshed-out/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ taskId, done: next }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
    } catch {
      setDone((prev) => {
        const s = new Set(prev);
        if (next) s.delete(taskId);
        else s.add(taskId);
        return s;
      });
      setSaveError("Couldn't save that tick. Check your connection and try again.");
    }
  }

  async function signOut() {
    await supabase?.auth.signOut();
  }

  async function refresh() {
    if (!supabase) return;
    setView({ kind: "loading" });
    const { data } = await supabase.auth.getSession();
    if (data.session) load(data.session.access_token);
    else setView({ kind: "signedOut" });
  }

  const shell = "mx-auto w-full max-w-2xl px-4 py-10 sm:py-14";

  if (view.kind === "loading") {
    return (
      <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
        <p className="text-center text-white/50">Loading...</p>
      </div>
    );
  }

  if (view.kind === "error") {
    return (
      <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
        <p className="text-center text-red-400">{view.message}</p>
      </div>
    );
  }

  if (view.kind === "signedOut") {
    return (
      <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
        <LoginPanel justPaid={justPaid} />
      </div>
    );
  }

  if (view.kind === "noPurchase") {
    return (
      <div
        className={`${shell} flex flex-col items-center gap-5 text-center`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <h1 style={heading} className="text-3xl font-bold text-white">
          No purchase found
        </h1>
        <p className="text-white/70">
          We couldn&apos;t find an All Seshed Out purchase for{" "}
          <span className="text-white">{view.email}</span>. Log in with the email you paid
          with. If you only just paid, give it a minute and refresh.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={refresh}
            className="rounded-lg bg-[#39FF14] px-5 py-3 font-bold text-black"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={signOut}
            className="rounded-lg border border-white/30 px-5 py-3 font-bold text-white"
          >
            Use a different email
          </button>
        </div>
        {salesOpen && (
          <Link
            href="/all-seshed-out"
            className="text-sm text-white/60 underline underline-offset-4 hover:text-white"
          >
            Haven&apos;t bought it yet? Get All Seshed Out ({SESHED_OUT_PRICE_LABEL})
          </Link>
        )}
      </div>
    );
  }

  const { content } = view;
  const allTasks = content.plan.flatMap((p) => p.weeks.flatMap((w) => w.tasks));
  const doneCount = allTasks.filter((t) => done.has(t.id)).length;
  const percent = allTasks.length ? Math.round((doneCount / allTasks.length) * 100) : 0;
  const initiallyDone = new Set(content.completed);
  const firstOpenWeekId =
    content.plan
      .flatMap((p) => p.weeks)
      .find((w) => w.tasks.some((t) => !initiallyDone.has(t.id)))?.id ?? null;

  return (
    <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
      {/* Title */}
      <header className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#39FF14] sm:text-sm">
          Score The Sesh
        </p>
        <h1 style={heading} className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
          All Seshed Out
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Signed in as {content.email} ·{" "}
          <button type="button" onClick={signOut} className="underline underline-offset-4 hover:text-white">
            Log out
          </button>
        </p>
      </header>

      {/* Intro video */}
      <section className="mt-10">
        <VideoCard video={content.intro} />
      </section>

      {/* Plan */}
      <section className="mt-14" id="plan">
        <h2 style={heading} className="text-2xl font-bold text-white sm:text-3xl">
          Your 90-day plan
        </h2>
        <p className="mt-2 text-white/70">
          Tick things off as you go. It saves automatically, so you can pick it up on your phone any
          time.
        </p>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-white/70">
              {doneCount} of {allTasks.length} done
            </span>
            <span className="font-bold text-[#39FF14]">{percent}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Plan progress"
          >
            <div
              className="h-full rounded-full bg-[#39FF14] transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {saveError && <p className="mt-3 text-sm text-red-400">{saveError}</p>}

        {content.plan.map((phase) => (
          <div key={phase.id} className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#39FF14]">
              Phase {phase.number} · {phase.days}
            </p>
            <h3 style={heading} className="mt-1 text-xl font-bold text-white sm:text-2xl">
              {phase.title}
            </h3>
            <p className="mt-2 text-white/70">{phase.blurb}</p>
            <p className="mt-3 border-l-2 border-[#39FF14] pl-3 text-sm italic text-white/80">
              {phase.tomLine}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {phase.weeks.map((week) => (
                <WeekCard
                  key={week.id}
                  week={week}
                  done={done}
                  onToggle={toggle}
                  defaultOpen={week.id === firstOpenWeekId}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Survival guide */}
      <section className="mt-16" id="survival-guide-section">
        <h2 style={heading} className="text-2xl font-bold text-white sm:text-3xl">
          {content.survivalGuide.title}
        </h2>
        <p className="mt-2 text-white/70">{content.survivalGuide.intro}</p>

        <div
          id="survival-guide"
          className="mt-5 rounded-2xl border border-[#39FF14]/50 bg-[#0A0A0A] p-5 sm:p-6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#39FF14]">
            Score The Sesh · All Seshed Out
          </p>
          <h3 style={heading} className="mt-1 text-2xl font-bold text-white">
            {content.survivalGuide.title}
          </h3>

          {content.survivalGuide.sections.map((s) => (
            <div key={s.id} className="mt-5">
              <h4 style={heading} className="text-lg font-bold text-[#39FF14]">
                {s.title}
              </h4>
              <ul className="mt-2 flex flex-col gap-2">
                {s.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-white/90">
                    <span aria-hidden className="text-[#39FF14]">
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-6">
            <h4 style={heading} className="text-lg font-bold text-[#39FF14]">
              {content.survivalGuide.lines.title}
            </h4>
            <dl className="mt-2 flex flex-col gap-3">
              {content.survivalGuide.lines.items.map((item) => (
                <div key={item.situation} className="rounded-lg bg-white/[0.05] p-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-white/60">
                    {item.situation}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{item.line}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">scorethesesh.com</p>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          {content.guidePdfUrl ? (
            <a
              href={content.guidePdfUrl}
              download="sesh-survival-guide.pdf"
              className="rounded-lg bg-[#39FF14] px-5 py-3 font-bold text-black"
            >
              Download the guide (PDF)
            </a>
          ) : (
            <span className="text-sm text-white/40">PDF download coming soon.</span>
          )}
          <span className="text-sm text-white/50">
            Or screenshot the card above and keep it in your photos.
          </span>
        </div>
      </section>

      {/* Exclusive videos */}
      <section className="mt-16" id="exclusive">
        <h2 style={heading} className="text-2xl font-bold text-white sm:text-3xl">
          Your exclusive Score The Sesh deep dives
        </h2>
        <p className="mt-2 text-white/70">
          Three longer episodes you won&apos;t find anywhere else. Watch them whenever you like.
        </p>
        <div className="mt-5 flex flex-col gap-8">
          {content.exclusive.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>

      {/* Safety note */}
      <footer className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-bold text-white">Safety note</p>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{content.safetyNote}</p>
      </footer>
    </div>
  );
}

function WeekCard({
  week,
  done,
  onToggle,
  defaultOpen,
}: {
  week: Week;
  done: Set<string>;
  onToggle: (taskId: string) => void;
  defaultOpen: boolean;
}) {
  const doneInWeek = week.tasks.filter((t) => done.has(t.id)).length;
  const complete = doneInWeek === week.tasks.length;

  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-white/10 bg-white/[0.03] open:border-white/20"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-xs uppercase tracking-wide text-white/50">
            Week {week.number} · {week.days}
          </span>
          <span style={heading} className="block text-lg font-bold text-white">
            {week.theme}
          </span>
        </span>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            complete ? "bg-[#39FF14] text-black" : "bg-white/10 text-white/70"
          }`}
        >
          {doneInWeek}/{week.tasks.length}
        </span>
      </summary>

      <div className="px-4 pb-4">
        <p className="text-sm leading-relaxed text-white/70">{week.intro}</p>
        <ul className="mt-2">
          {week.tasks.map((task) => {
            const checked = done.has(task.id);
            return (
              <li key={task.id} className="border-t border-white/5 first:border-t-0">
                <button
                  type="button"
                  onClick={() => onToggle(task.id)}
                  aria-pressed={checked}
                  className="flex min-h-[48px] w-full items-start gap-3 py-3 text-left"
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      checked ? "border-[#39FF14] bg-[#39FF14] text-black" : "border-white/30"
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm leading-snug ${checked ? "text-white/40 line-through" : "text-white/90"}`}>
                    {task.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}

function VideoCard({ video }: { video: VideoItem }) {
  return (
    <div>
      <h3 style={heading} className="text-lg font-bold text-white">
        {video.title}
      </h3>
      <p className="mt-1 text-sm text-white/60">{video.description}</p>
      {video.url ? (
        <video
          controls
          playsInline
          preload="metadata"
          src={video.url}
          className="mt-3 aspect-video w-full rounded-lg bg-black"
        />
      ) : (
        <div className="mt-3 flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.03] text-sm text-white/40">
          Coming soon
        </div>
      )}
    </div>
  );
}

function LoginPanel({ justPaid }: { justPaid: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setError("Login isn't set up yet.");
      return;
    }
    const clean = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(clean)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }

    setStatus("sending");
    setError("");
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { emailRedirectTo: `${window.location.origin}/all-seshed-out/guide` },
    });
    if (otpError) {
      setStatus("error");
      setError(otpError.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#39FF14] sm:text-sm">
        Score The Sesh
      </p>
      <h1 style={heading} className="text-4xl font-bold leading-tight text-white">
        All Seshed Out
      </h1>
      {justPaid && (
        <p className="rounded-lg border border-[#39FF14]/50 bg-[#39FF14]/10 p-3 text-sm text-white">
          Payment received, thank you. Log in below with the email you paid with to open your guide.
        </p>
      )}
      <p className="max-w-md text-white/70">
        Enter the email you bought with and we&apos;ll send you a login link. No password needed.
      </p>

      {status === "sent" ? (
        <p className="max-w-md text-white">
          Check your inbox for a login link (and your spam folder). Open it on this device and you&apos;ll
          land straight in your guide.
        </p>
      ) : (
        <form onSubmit={submit} className="flex w-full max-w-sm flex-col gap-3">
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            aria-label="Email"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-[#39FF14] px-5 py-3 font-bold text-black disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Email me a login link"}
          </button>
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
        </form>
      )}

      <Link
        href="/all-seshed-out"
        className="text-sm text-white/50 underline underline-offset-4 hover:text-white"
      >
        Back to All Seshed Out
      </Link>
    </div>
  );
}
