"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { ORDERED_CHUNKS, CHUNK_SIZE, categoryLabels, isOldEra, maxScoreForSesh, type Sesh } from "@/lib/sesh-data";

type Account = { userId: string; email: string; username: string; accessToken: string };

type Draft = {
  music: number;
  substances: number;
  cat3: number;
  hangover: number;
  cat5: number;
  notes: string;
};

const EMPTY_DRAFT: Draft = { music: 0, substances: 0, cat3: 0, hangover: 0, cat5: 0, notes: "" };

type CommunityEntry = {
  username: string;
  total: number;
  notes: string | null;
};

type CommunityData = {
  entries: CommunityEntry[];
  average: number | null;
  count: number;
  mine: Omit<Draft, "notes"> & { notes: string | null } | null;
};

function sessionToAccount(session: Session | null): Account | null {
  if (!session?.user) return null;
  const username =
    typeof session.user.user_metadata?.username === "string"
      ? session.user.user_metadata.username
      : session.user.email?.split("@")[0] || "sesh-scorer";
  return {
    userId: session.user.id,
    email: session.user.email || "",
    username,
    accessToken: session.access_token,
  };
}

function AuthForm({ onLoggedIn }: { onLoggedIn: (account: Account) => void }) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "check-email">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setError("Accounts aren't configured yet.");
      return;
    }

    setStatus("loading");
    setError("");

    if (mode === "signup") {
      const trimmedUsername = username.trim();
      if (trimmedUsername.length < 2 || trimmedUsername.length > 24) {
        setStatus("error");
        setError("Username needs to be 2–24 characters.");
        return;
      }
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: trimmedUsername } },
      });
      if (signUpError) {
        setStatus("error");
        setError(signUpError.message);
        return;
      }
      if (!data.session) {
        // Email confirmation is required before they can log in.
        setStatus("check-email");
        return;
      }
      const account = sessionToAccount(data.session);
      if (account) onLoggedIn(account);
    } else {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setStatus("error");
        setError(signInError.message);
        return;
      }
      const account = sessionToAccount(data.session);
      if (account) onLoggedIn(account);
    }
  }

  if (status === "check-email") {
    return (
      <div className="max-w-sm w-full flex flex-col items-center gap-3 mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center">
        <p className="text-white text-sm sm:text-base font-medium">Check your email</p>
        <p className="text-white/60 text-xs sm:text-sm">
          We sent a confirmation link to {email}. Click it, then come back and log in.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full flex flex-col items-center gap-3 mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex w-full bg-black/30 rounded-full p-1">
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full py-2 text-xs sm:text-sm font-bold transition-colors duration-200 ${
            mode === "signup" ? "bg-[#39FF14] text-black" : "text-white/60"
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full py-2 text-xs sm:text-sm font-bold transition-colors duration-200 ${
            mode === "login" ? "bg-[#39FF14] text-black" : "text-white/60"
          }`}
        >
          Log In
        </button>
      </div>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
      />

      {mode === "signup" && (
        <input
          type="text"
          required
          maxLength={24}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Pick a username"
          className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
        />
      )}

      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (6+ characters)"
        className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        className="w-full bg-[#39FF14] text-black font-bold px-8 py-3 rounded-full text-sm hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "..." : mode === "signup" ? "Create Account" : "Log In"}
      </button>

      {status === "error" && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}

      <p className="text-white/30 text-xs text-center">
        Everyone can see your scores and notes — keep it sesh-appropriate.
      </p>
    </form>
  );
}

function ScoreCard({ entry, isOpen, onToggle, account }: { entry: Sesh; isOpen: boolean; onToggle: () => void; account: Account }) {
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [loadingCommunity, setLoadingCommunity] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const [communityError, setCommunityError] = useState("");

  const oldEra = isOldEra(entry.sesh);
  const labels = categoryLabels(entry.sesh);
  const maxScore = maxScoreForSesh(entry.sesh);

  useEffect(() => {
    if (!isOpen || community || loadingCommunity) return;
    queueMicrotask(() => setLoadingCommunity(true));
    fetch(`/api/community/scores?sesh=${entry.sesh}`, {
      headers: { Authorization: `Bearer ${account.accessToken}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Couldn't load community scores.");
        return data as CommunityData;
      })
      .then((data) => {
        setCommunity(data);
        if (data.mine) {
          setDraft({
            music: data.mine.music,
            substances: data.mine.substances,
            cat3: data.mine.cat3,
            hangover: data.mine.hangover ?? 0,
            cat5: data.mine.cat5,
            notes: data.mine.notes ?? "",
          });
        }
      })
      .catch((err) => setCommunityError(err instanceof Error ? err.message : "Couldn't load community scores."))
      .finally(() => setLoadingCommunity(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  async function handleSave() {
    setSaveStatus("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/community/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${account.accessToken}`,
        },
        body: JSON.stringify({
          sesh: entry.sesh,
          music: draft.music,
          substances: draft.substances,
          cat3: draft.cat3,
          hangover: oldEra ? undefined : draft.hangover,
          cat5: draft.cat5,
          notes: draft.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save your score.");
      setSaveStatus("saved");
      setCommunity(null);
      fetch(`/api/community/scores?sesh=${entry.sesh}`, {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      })
        .then((res2) => res2.json())
        .then((data2: CommunityData) => setCommunity(data2));
    } catch (err) {
      setSaveStatus("error");
      setSaveError(err instanceof Error ? err.message : "Couldn't save your score.");
    }
  }

  const myTotal =
    draft.music + draft.substances + draft.cat3 + (oldEra ? 0 : draft.hangover) + draft.cat5;

  return (
    <div id={`sesh-${entry.sesh}`} className="rounded-xl border border-white/10 bg-black/20 overflow-hidden scroll-mt-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-white font-medium text-sm sm:text-base">Sesh {entry.sesh}</span>
        <span
          className={`text-white/40 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 flex flex-col gap-4">
          <a
            href={entry.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#39FF14] text-xs sm:text-sm font-bold underline underline-offset-4 hover:brightness-110 transition-all duration-200 self-start"
          >
            Watch on Instagram →
          </a>

          {/* Your score inputs */}
          <div className="flex flex-col gap-2">
            <p className="text-white/50 text-[11px] uppercase tracking-wide font-bold">
              Your score ({myTotal}/{maxScore})
            </p>
            <div className="grid grid-cols-2 gap-2">
              {labels.map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-white/50 text-[10px] uppercase tracking-wide">
                    {label}
                  </label>
                  <select
                    value={draft[key] || ""}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(5, Number(e.target.value) || 1));
                      setDraft((d) => ({ ...d, [key]: v }));
                    }}
                    className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#39FF14]/70 transition-colors duration-200 appearance-none"
                  >
                    <option value="" disabled>
                      –
                    </option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <label className="text-white/50 text-[10px] uppercase tracking-wide mt-1">
              Notes
            </label>
            <textarea
              value={draft.notes}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value.slice(0, 500) }))}
              placeholder="What made this sesh what it was..."
              rows={2}
              className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#39FF14]/70 transition-colors duration-200 resize-none"
            />

            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              className="self-start bg-[#39FF14] text-black font-bold px-6 py-2 rounded-full text-xs sm:text-sm hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved ✓" : "Save Score"}
            </button>
            {saveStatus === "error" && <p className="text-red-400 text-xs">{saveError}</p>}
          </div>

          {/* Community feed */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
            <p className="text-white/50 text-[11px] uppercase tracking-wide font-bold">
              Community
            </p>
            {loadingCommunity && <p className="text-white/40 text-xs">Loading...</p>}
            {!loadingCommunity && communityError && (
              <p className="text-red-400 text-xs">{communityError}</p>
            )}
            {!loadingCommunity && community && community.count === 0 && (
              <p className="text-white/40 text-xs">Be the first to score this one.</p>
            )}
            {!loadingCommunity && community && community.count > 0 && (
              <>
                <p className="text-white/70 text-xs sm:text-sm">
                  Community avg:{" "}
                  <span className="text-[#39FF14] font-bold tabular-nums">
                    {community.average}/{maxScore}
                  </span>{" "}
                  from {community.count} {community.count === 1 ? "score" : "scores"}
                </p>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                  {community.entries.map((e, idx) => (
                    <div key={idx} className="bg-black/30 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-xs sm:text-sm font-medium">
                          @{e.username}
                        </span>
                        <span className="text-white/70 text-xs tabular-nums">
                          {e.total}/{maxScore}
                        </span>
                      </div>
                      {e.notes && (
                        <p className="text-white/50 text-xs mt-1 leading-relaxed">{e.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function YourTurnToScorePageContent() {
  const searchParams = useSearchParams();
  const targetSesh = Number(searchParams.get("sesh"));
  const hasTarget = Number.isInteger(targetSesh) && targetSesh >= 1 && targetSesh <= 45;

  const [account, setAccount] = useState<Account | null>(null);
  const [checkedSession, setCheckedSession] = useState(false);
  const [openChunk, setOpenChunk] = useState<number>(hasTarget ? Math.floor((targetSesh - 1) / CHUNK_SIZE) : 0);
  const [openSesh, setOpenSesh] = useState<number | null>(hasTarget ? targetSesh : null);
  const [scrolledToTarget, setScrolledToTarget] = useState(false);

  // If they land here already logged in (or log in/sign up) with a
  // ?sesh=N link, jump straight to that sesh's card.
  useEffect(() => {
    if (!account || !hasTarget) return;
    const chunkIndex = Math.floor((targetSesh - 1) / CHUNK_SIZE);
    queueMicrotask(() => {
      setOpenChunk(chunkIndex);
      setOpenSesh(targetSesh);
    });
  }, [account, hasTarget, targetSesh]);

  // Once that card is actually open in the DOM, scroll it into view.
  useEffect(() => {
    if (scrolledToTarget || !hasTarget || openSesh !== targetSesh) return;
    const el = document.getElementById(`sesh-${targetSesh}`);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setScrolledToTarget(true);
    });
  }, [openSesh, hasTarget, targetSesh, scrolledToTarget]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      queueMicrotask(() => setCheckedSession(true));
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      queueMicrotask(() => {
        setAccount(sessionToAccount(data.session));
        setCheckedSession(true);
      });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccount(sessionToAccount(session));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) await supabase.auth.signOut();
    setAccount(null);
  }

  return (
    <div
      className="min-h-[calc(100dvh-56px)] flex flex-col items-center px-6 py-10 sm:py-14"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md w-full text-center">
        <p className="text-[#39FF14] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
          Your Turn To Score
        </p>

        <h1
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-white font-bold text-3xl sm:text-4xl leading-tight"
        >
          Score Every Sesh Yourself
        </h1>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          Score past seshes, add notes and compare them with others, the
          wackier the better.
        </p>
      </div>

      {checkedSession && !account && <AuthForm onLoggedIn={setAccount} />}

      {account && (
        <>
          <div className="max-w-2xl w-full mt-6 flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
            <span className="text-white/70 text-xs sm:text-sm">
              Scoring as{" "}
              <span className="text-[#39FF14] font-bold">@{account.username}</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-white/50 text-xs underline underline-offset-4 hover:text-white transition-colors duration-200"
            >
              Log out
            </button>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl w-full mt-6">
            {ORDERED_CHUNKS.map((chunk, chunkIndex) => {
              const rangeStart = chunkIndex * CHUNK_SIZE + 1;
              const rangeEnd = rangeStart + chunk.length - 1;
              const isChunkOpen = openChunk === chunkIndex;

              return (
                <div
                  key={chunkIndex}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenChunk(isChunkOpen ? -1 : chunkIndex)}
                    aria-expanded={isChunkOpen}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                      className="text-white font-bold text-sm sm:text-base"
                    >
                      Sesh {rangeStart}–{rangeEnd}
                    </span>
                    <span
                      className={`text-[#39FF14] text-xs transition-transform duration-200 ${
                        isChunkOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isChunkOpen && (
                    <div className="px-3 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {chunk.map((entry) => (
                        <ScoreCard
                          key={entry.sesh}
                          entry={entry}
                          account={account}
                          isOpen={openSesh === entry.sesh}
                          onToggle={() => setOpenSesh(openSesh === entry.sesh ? null : entry.sesh)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <Link
        href="/"
        className="text-white/50 text-xs sm:text-sm underline underline-offset-4 hover:text-white transition-colors duration-200 mt-10"
      >
        Back to scorethesesh.com
      </Link>
    </div>
  );
}

export default function YourTurnToScorePage() {
  return (
    <Suspense fallback={null}>
      <YourTurnToScorePageContent />
    </Suspense>
  );
}
