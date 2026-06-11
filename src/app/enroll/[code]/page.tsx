"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

interface Invite {
  code: string;
  name: string | null;
  email: string | null;
  status: string;
  invited_by_name: string | null;
  inviter_message: string | null;
  admin_label: string | null;
  expires_at: string;
  revoked_at: string | null;
  draft_payload: Record<string, unknown> | null;
}

// The honorific shown next to the inviter's name when no admin_label is set.
const INVITER_DEFAULT_TITLE = "of the Supreme Grand Council";

interface RollStats {
  cap: number;
  sealed: number;
  in_flight: number;
  remaining: number;
}

const PRINCIPLES = ["Love", "Truth", "Peace", "Freedom", "Justice"];

// The three things Original Standing holds forever. Every name on the
// Original Roll keeps these; every name added later pays more for less.
// This is the FOMO engine — phrase it like a deed, not a brochure.
const COMPOUND = [
  {
    title: "Original Standing Dues — Locked for Life",
    rate: "$50",
    cadence: "per month, forever",
    desc:
      "Every name on the Original Roll pays the Original Standing rate for as long as their seat stands. The Roll has never been re-rated, and the Council does not retroactively raise on those who were entered first.",
    note: "Later admissions will be priced against the cooperative's grown ledger — not against your seat.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Hereditary Standing",
    rate: "1 → 2 → ∞",
    cadence: "passed by blood",
    desc:
      "Your seat is not a subscription. It is a recorded name, inheritable by your descendants without re-application, without re-vetting, without re-purchase. What you take today, your grandchildren still hold.",
    note: "Citizenship by descent is the oldest right a nation issues. The Original Roll writes the line.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM5 21l-2 2M19 21l2 2",
  },
  {
    title: "Cooperative Equity",
    rate: "Pro-rata",
    cadence: "across every venture",
    desc:
      "Every commercial undertaking the Sultanate launches — services, real estate, lending, ventures — holds a pro-rata share for the names on the Original Roll. Later admissions buy in at a higher cost basis against a larger ledger.",
    note: "The cost of entry only goes up. Original Standing is the basis you compound from.",
    icon: "M3 20h18M5 20V10m4 10V4m4 16V8m4 12v-6m4 6V12",
  },
];

// The gap that makes refusal indefensible — what a member holds versus
// what a non-member can never assemble on their own.
const GAP_ROWS: { label: string; member: string; outside: string }[] = [
  { label: "Recognized nationality", member: "Documented, recorded, defensible", outside: "Whatever the state assigns you" },
  { label: "Dues rate", member: "$50/mo locked for life", outside: "Re-priced at every admission" },
  { label: "Cooperative equity", member: "Pro-rata in every venture", outside: "Customer of others' ventures" },
  { label: "Hereditary seat", member: "Passes to descendants", outside: "Nothing to pass" },
  { label: "Standing in Council", member: "Voice + vote, seniority-weighted", outside: "Outside the room" },
  { label: "Network of members", member: "Direct access — by introduction", outside: "Cold outreach, no warrant" },
];

const HOW = [
  { h: "Submit your application", p: "Complete the membership application below — your details, heritage, intent, and affirmation of the five principles." },
  { h: "Council review", p: "The Supreme Grand Council reviews each application. Estimated review time is two to four weeks." },
  { h: "Orientation & welcome", p: "Upon acceptance you are invited to New Members Orientation, covering the sacred texts and the Constitution." },
];

export default function EnrollPage() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();
  const [invite, setInvite] = useState<Invite | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [rateLimited, setRateLimited] = useState(false);
  const [roll, setRoll] = useState<RollStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .rpc("get_invite_by_code", { p_code: code })
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        if (error.message?.includes("rate_limited")) {
          setRateLimited(true);
        } else {
          setNotFound(true);
        }
        setLoading(false);
        return;
      }
      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setInvite(data as Invite);
      setLoading(false);
      const uaHint = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 200) : "";
      supabase.rpc("mark_invite_viewed", { p_code: code, p_ua_hint: uaHint }).then(() => undefined);
      // Original Roll scarcity counter — pulled live so the page shows
      // the actual seats remaining, not a marketing fiction.
      supabase
        .rpc("get_founders_cohort_stats")
        .maybeSingle()
        .then(({ data: stats }) => {
          if (cancelled || !stats) return;
          setRoll(stats as RollStats);
        });
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1A0E] text-white/70 text-sm">
        Opening your invitation…
      </div>
    );
  }

  if (rateLimited) {
    return (
      <SacredScreen
        eyebrow="Slow down"
        title="Too many lookups from this network"
        body="For everyone's protection, invitation codes can only be checked a few times in a short window. Please wait a few minutes and try again from the link you were sent."
      />
    );
  }

  if (notFound) {
    return (
      <SacredScreen
        eyebrow="Sultanate of Amexem"
        title="Invitation not found"
        body="This invitation code is invalid or has been retired. If you believe this is in error, reach out to the person who invited you."
        action={{ label: "Return to Sultanate of Amexem", onClick: () => router.push("/") }}
      />
    );
  }

  if (!invite) return null;

  if (invite.revoked_at) {
    return (
      <SacredScreen
        eyebrow="Invitation Withdrawn"
        title="No longer valid"
        body={`This invitation has been withdrawn by the Sultanate. Reach out to ${invite.invited_by_name ?? "the council"} for a new invitation.`}
      />
    );
  }

  const expired = new Date(invite.expires_at) < new Date();
  if (expired) {
    return (
      <SacredScreen
        eyebrow="Invitation Lapsed"
        title="This invitation has expired"
        body={`Your invitation lapsed on ${new Date(invite.expires_at).toLocaleDateString()}. Reach out to ${invite.invited_by_name ?? "the Sultanate"} to request a fresh link.`}
      />
    );
  }

  if (invite.status === "completed" || invite.status === "accepted") {
    const greet = invite.name?.split(" ")[0];
    return (
      <SacredScreen
        eyebrow="Application Received"
        title="Already submitted"
        body={
          greet
            ? `We have your enrollment, ${greet}. The Supreme Grand Council will be in touch by email within two to four weeks.`
            : "We have your enrollment. The Supreme Grand Council will be in touch by email within two to four weeks."
        }
      />
    );
  }

  return <EnrollContent invite={invite} roll={roll} />;
}

/* ─── Shared gate screen — emblem ring, eyebrow, italic serif, gold rule ─── */
function SacredScreen({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0F1A0E] text-white text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #C5A55A 0 1.2px, transparent 1.6px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        className="absolute w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(197,165,90,0.16), transparent 65%)",
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <span className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#C5A55A,transparent)]" />
      <span className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#C5A55A,transparent)]" />
      <div className="relative max-w-md">
        <div className="relative w-[120px] h-[120px] mx-auto mb-7 flex items-center justify-center">
          <span className="absolute inset-[-10px] rounded-full border border-[#C5A55A]/55" />
          <span className="absolute inset-[-22px] rounded-full border border-[#C5A55A]/20" />
          <Image
            src="/images/emblem.svg"
            alt="Sultanate emblem"
            width={84}
            height={84}
            className="drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
          />
        </div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#C5A55A] mb-4">
          {eyebrow}
        </p>
        <h1
          className="text-4xl md:text-5xl mb-5 leading-[1.1]"
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {title}
        </h1>
        <div
          className="mx-auto mb-6 h-px"
          style={{
            width: 96,
            background:
              "linear-gradient(90deg, transparent, #C5A55A, transparent)",
          }}
        />
        <p className="text-white/72 text-sm leading-relaxed">{body}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-semibold text-[#C5A55A] hover:text-[#D4BA7A] transition-colors"
          >
            <span className="h-px w-6 bg-[#C5A55A]" />
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Opening overture — black overlay, italic line word-by-word,
       gold emblem pulse, then dissolves to reveal the hero. Shown once
       per browser session per invite code, dismissable on tap/scroll. ─── */
function Overture({ inviterName }: { inviterName: string | null }) {
  const WORDS = ["You", "have", "been", "invited", "to", "the", "Sultanate", "of", "Amexem."];
  // Played-once latch lives in sessionStorage so a refresh doesn't replay it
  // (animations are charming once and grating after that), but a fresh
  // session — a new visit — gets the full reveal.
  const [phase, setPhase] = useState<"hidden" | "in" | "out" | "done">("hidden");
  const [shownWords, setShownWords] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = "sultanate.overture.played";
    if (sessionStorage.getItem(key)) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem(key, "1");
    setPhase("in");
    const wordTimers: ReturnType<typeof setTimeout>[] = [];
    // 320ms emblem fade-in, then ~140ms between words.
    WORDS.forEach((_, i) => {
      wordTimers.push(setTimeout(() => setShownWords(i + 1), 420 + i * 140));
    });
    const fadeOut = setTimeout(() => setPhase("out"), 420 + WORDS.length * 140 + 900);
    const done = setTimeout(() => setPhase("done"), 420 + WORDS.length * 140 + 1500);
    return () => {
      wordTimers.forEach(clearTimeout);
      clearTimeout(fadeOut);
      clearTimeout(done);
    };
    // Intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = useCallback(() => {
    setShownWords(WORDS.length);
    setPhase("out");
    setTimeout(() => setPhase("done"), 450);
  }, [WORDS.length]);

  useEffect(() => {
    if (phase !== "in") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") skip();
    };
    const onPointer = () => skip();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("wheel", onPointer, { passive: true });
    window.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("wheel", onPointer);
      window.removeEventListener("touchstart", onPointer);
    };
  }, [phase, skip]);

  if (phase === "done") return null;

  const emblemBloomed = shownWords >= WORDS.length;

  return (
    <div
      role="presentation"
      aria-hidden
      className="fixed inset-0 z-[60] flex items-center justify-center text-white text-center px-6 select-none"
      style={{
        background: "#050808",
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 480ms ease-out",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #C5A55A 0 1.2px, transparent 1.6px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative max-w-2xl">
        <div
          className="relative w-[124px] h-[124px] mx-auto mb-9 flex items-center justify-center"
          style={{
            opacity: phase === "in" ? 1 : 0,
            transform: emblemBloomed ? "scale(1.06)" : "scale(1)",
            transition: "opacity 380ms ease-out, transform 700ms ease-out",
            filter: emblemBloomed
              ? "drop-shadow(0 0 22px rgba(197,165,90,0.55))"
              : "drop-shadow(0 0 0 rgba(197,165,90,0))",
          }}
        >
          <span className="absolute inset-[-10px] rounded-full border border-[#C5A55A]/55" />
          <span className="absolute inset-[-22px] rounded-full border border-[#C5A55A]/20" />
          <Image
            src="/images/emblem.svg"
            alt=""
            width={88}
            height={88}
            priority
            className="drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
          />
        </div>
        <p
          className="text-2xl md:text-4xl leading-[1.25]"
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {WORDS.map((w, i) => (
            <span
              key={`${w}-${i}`}
              style={{
                display: "inline-block",
                opacity: i < shownWords ? 1 : 0,
                transform: i < shownWords ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 380ms ease-out, transform 380ms ease-out",
                marginRight: "0.32em",
              }}
            >
              {w}
            </span>
          ))}
        </p>
        {inviterName && (
          <p
            className="mt-6 text-[11px] uppercase tracking-[0.32em] text-[#C5A55A]"
            style={{
              opacity: emblemBloomed ? 1 : 0,
              transition: "opacity 500ms ease-out",
            }}
          >
            Extended by {inviterName}
          </p>
        )}
        <p
          className="mt-10 text-[11px] uppercase tracking-[0.28em] text-white/35"
          style={{
            opacity: emblemBloomed ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        >
          Tap to enter
        </p>
      </div>
    </div>
  );
}

/* ─── The Original Roll — live scarcity band. Counter pulled from the
       members + in-flight invites tables. The page degrades gracefully
       if the RPC hasn't returned yet; the band only renders once we
       have real numbers. ─── */
function OriginalRoll({
  roll,
  onEnroll,
}: {
  roll: RollStats | null;
  onEnroll: () => void;
}) {
  if (!roll) return null;
  const filled = Math.max(0, Math.min(roll.cap, roll.sealed));
  const pct = roll.cap > 0 ? (filled / roll.cap) * 100 : 0;
  const closed = roll.remaining <= 0;
  return (
    <section className="relative bg-[#0F1A0E] text-white overflow-hidden border-b border-[#C5A55A]/30">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #C5A55A 0 1.2px, transparent 1.6px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-10 md:py-14 relative">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-7 md:gap-10 items-center">
          <div>
            <p className="text-[10.5px] md:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C5A55A] mb-2.5 md:mb-3">
              The Original Roll
            </p>
            <h2
              className="text-[26px] md:text-4xl leading-[1.12] mb-3 md:mb-4"
              style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontStyle: "italic", fontWeight: 400 }}
            >
              {closed
                ? "The Original Roll is closed."
                : "One thousand names. Once entered, never re-issued."}
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
              The Sultanate is a nation, not a subscription. The Original Roll is the
              record of those first recognized by the Council &mdash; capped at one
              thousand names. After that, admission reopens at a new rate, with no
              claim on the Original Standing held by the names already entered. This
              instrument is granted once.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-[#C5A55A]/30 rounded-2xl p-5 md:p-7 backdrop-blur-sm">
            <div className="flex items-end justify-between gap-3 mb-3">
              <div>
                <div
                  className="text-[44px] md:text-6xl font-bold leading-none text-[#C5A55A] tabular-nums"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {closed ? 0 : roll.remaining.toLocaleString()}
                </div>
                <p className="text-[10.5px] md:text-[11px] uppercase tracking-[0.22em] text-white/55 mt-2">
                  {closed ? "Roll closed" : "Names unwritten"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-[12.5px] md:text-sm text-white/70 tabular-nums leading-tight">
                  <strong className="text-white font-semibold">{filled.toLocaleString()}</strong>
                  <span className="text-white/40"> of {roll.cap.toLocaleString()} entered</span>
                </div>
                {roll.in_flight > 0 && !closed && (
                  <div className="text-[10.5px] md:text-[11px] text-[#C5A55A]/85 mt-1 tabular-nums leading-tight">
                    + {roll.in_flight.toLocaleString()} standing for entry
                  </div>
                )}
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#A8893E] to-[#C5A55A]"
                style={{ width: `${Math.max(2, pct)}%` }}
              />
            </div>
            {!closed && (
              <button
                onClick={onEnroll}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 md:py-3 bg-[#C5A55A] text-[#0F1A0E] font-semibold rounded-lg hover:bg-[#D4BA7A] transition-colors"
              >
                Take your name on the Roll <span aria-hidden>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main landing content ─── */
function EnrollContent({ invite, roll }: { invite: Invite; roll: RollStats | null }) {
  function scrollToEnroll() {
    const el = document.getElementById("enroll");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const inviterLabel = invite.admin_label?.trim() || INVITER_DEFAULT_TITLE;
  const inviterName = invite.invited_by_name?.trim() || null;

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen">
      <Overture inviterName={inviterName} />
      {/* Utility bar */}
      <div className="bg-[#0F1A0E] border-b border-white/5">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 flex items-center justify-between h-9">
          <span className="text-[10.5px] md:text-[11px] uppercase tracking-[0.15em] text-[#C5A55A]">
            Reconstituted October 2020
          </span>
          <button
            onClick={scrollToEnroll}
            className="text-[11px] md:text-xs text-gray-400 hover:text-[#C5A55A] transition-colors"
          >
            Take name on Roll
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#0F1A0E] text-white overflow-hidden border-b-2 border-[#C5A55A]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(197,165,90,0.6) 0%, transparent 35%), radial-gradient(circle at 80% 60%, rgba(45,90,39,0.4) 0%, transparent 40%)" }} />
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-12 md:py-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#C5A55A]/30 text-[11px] md:text-xs text-[#C5A55A] mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A55A] shrink-0" />
            <span className="leading-tight">
              {inviterName ? (
                <>
                  Extended by{" "}
                  <strong className="font-semibold text-white">{inviterName}</strong>
                  <span className="text-white/55"> · {inviterLabel}</span>
                </>
              ) : (
                <>By private invitation of the Supreme Grand Council</>
              )}
            </span>
          </div>

          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem emblem"
            width={96}
            height={96}
            className="mb-6 md:mb-8 w-[72px] h-[72px] md:w-[96px] md:h-[96px]"
          />

          <p
            className="text-xl md:text-3xl text-white/85 leading-[1.25] mb-5 md:mb-7 max-w-3xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontStyle: "italic", fontWeight: 400 }}
          >
            You have been invited to the Sultanate of Amexem.
          </p>
          <h1 className="text-[34px] md:text-6xl font-bold leading-[1.04] md:leading-[1.02] tracking-[-0.01em] mb-5 md:mb-7">
            <span className="block">Reclaim your <span className="text-[#C5A55A]">nationality.</span></span>
            <span className="block">Secure your <span className="text-[#C5A55A]">economy.</span></span>
            <span className="block">Found your <span className="text-[#C5A55A]">lineage.</span></span>
          </h1>
          <p className="text-base md:text-lg text-white/72 max-w-2xl leading-relaxed mb-6 md:mb-8">
            Membership is a name entered on the Original Roll of the custodial governing
            authority for the descendants of the Nation of Moab &mdash; modernly
            identified as Moorish American. Three things only the Original Roll holds:
            lawful standing, equity in cooperative ventures, and a seat your descendants
            inherit.
          </p>

          {/* Scarcity chips — three things every visitor sees before scrolling */}
          <div className="flex flex-wrap items-center gap-2 md:gap-2.5 mb-6 md:mb-8">
            {roll && roll.remaining > 0 && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A55A]/10 border border-[#C5A55A]/40 text-[11px] md:text-xs text-[#C5A55A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A55A] animate-pulse shrink-0" />
                <span>The Original Roll · <strong className="font-semibold text-white">{roll.remaining.toLocaleString()}</strong> of {roll.cap.toLocaleString()} names unwritten</span>
              </span>
            )}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] md:text-xs text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
              <span><strong className="font-semibold text-white">$50/mo</strong>&nbsp;Original Standing</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] md:text-xs text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
              Hereditary seat
            </span>
          </div>

          {invite.inviter_message && (
            <div className="mb-6 md:mb-8 max-w-2xl p-4 md:p-5 rounded-lg border border-[#C5A55A]/30 bg-[#C5A55A]/5">
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-[#C5A55A] mb-2 font-semibold">
                A word from {invite.invited_by_name ?? "your inviter"}
              </p>
              <p className="text-white/85 text-sm leading-relaxed italic">
                &ldquo;{invite.inviter_message}&rdquo;
              </p>
            </div>
          )}

          {/* Mobile: stacked, full-width primary CTA. Desktop: side-by-side. */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8 md:mb-10">
            <button
              onClick={scrollToEnroll}
              className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3.5 md:py-3 bg-[#C5A55A] text-[#0F1A0E] font-semibold rounded-lg hover:bg-[#D4BA7A] transition-colors"
            >
              Take your name on the Roll <span aria-hidden>→</span>
            </button>
            <a
              href="#learn"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-7 py-3.5 md:py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-semibold"
            >
              What Original Standing holds
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3 text-[11px] md:text-xs text-white/50 flex-wrap">
            <span>Chicago, Illinois</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>House of Simmons Bey</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="font-mono text-[#C5A55A]">Invitation {invite.code}</span>
          </div>
        </div>
      </section>

      {/* Principles band */}
      <div className="bg-[#162214] text-white">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-3 md:gap-6">
            {PRINCIPLES.map((p, i) => (
              <div key={p} className="flex items-center gap-2 md:gap-3">
                <span className="text-[11px] md:text-xs font-mono text-[#C5A55A]/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] md:text-sm uppercase tracking-[0.14em] md:tracking-[0.15em] font-semibold text-white/85">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Original Roll scarcity band */}
      <OriginalRoll roll={roll} onEnroll={scrollToEnroll} />

      {/* Compound interest — what Original Standing holds forever */}
      <section id="learn" className="py-12 md:py-24 bg-white">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6">
          <div className="text-center mb-9 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-5">
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                What Original Standing Holds
              </span>
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-[26px] md:text-4xl font-bold mb-3 md:mb-4 leading-[1.15]">
              The cost of arriving on the Original Roll
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Three things only the Original Roll holds. Names entered later can join
              the Sultanate &mdash; they cannot join this rate, this seat, this share.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {COMPOUND.map((c) => (
              <div
                key={c.title}
                className="relative p-5 md:p-7 rounded-2xl border border-gray-200 bg-white hover:border-[#C5A55A] hover:shadow-[0_24px_60px_-30px_rgba(15,26,14,0.4)] transition-all"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#0F1A0E] text-[#C5A55A] flex items-center justify-center mb-4 md:mb-5">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={c.icon} />
                  </svg>
                </div>
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-1">
                  <span className="text-2xl md:text-4xl font-bold text-[#0F1A0E] tracking-tight">{c.rate}</span>
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.16em] text-[#A8893E] font-semibold">{c.cadence}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 mt-1.5 md:mt-2 leading-snug">{c.title}</h3>
                <p className="text-[13.5px] md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">{c.desc}</p>
                <p className="text-[11.5px] md:text-xs italic text-[#A8893E]/90 border-t border-gray-100 pt-3 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member vs Non-Member gap — loss-aversion engine */}
      <section className="py-12 md:py-24 bg-[#f6f5f1]">
        <div className="max-w-[1040px] mx-auto px-5 md:px-6">
          <div className="text-center mb-9 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-5">
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                The Gap
              </span>
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-[26px] md:text-4xl font-bold mb-3 md:mb-4 leading-[1.15]">
              What a member holds. What no outsider can assemble.
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Side by side. Decide whether what you give up by staying outside is
              cheaper than what membership costs to keep.
            </p>
          </div>

          {/* md+ : three-column comparison table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,26,14,0.45)]">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] text-xs uppercase tracking-[0.14em] font-semibold bg-[#0F1A0E] text-white/85">
              <div className="px-5 py-4">&nbsp;</div>
              <div className="px-5 py-4 flex items-center gap-2 border-l border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#C5A55A]" />
                Sealed member
              </div>
              <div className="px-5 py-4 flex items-center gap-2 border-l border-white/10 text-white/55">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                Outside the roll
              </div>
            </div>
            {GAP_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.1fr_1fr_1fr] text-sm ${i % 2 ? "bg-[#fafaf6]" : "bg-white"}`}
              >
                <div className="px-5 py-4 font-semibold text-gray-800 border-t border-gray-100">{row.label}</div>
                <div className="px-5 py-4 text-[#1E3D1A] border-t border-l border-gray-100 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#2D5A27]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{row.member}</span>
                </div>
                <div className="px-5 py-4 text-gray-500 border-t border-l border-gray-100 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#9B1B30]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{row.outside}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: one card per row, member/outside stacked.
              Squeezing three columns onto a 360px viewport crushed the
              copy; on a phone the comparison reads cleaner card-by-card. */}
          <div className="md:hidden flex flex-col gap-3">
            {GAP_ROWS.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-[0_10px_24px_-18px_rgba(15,26,14,0.4)]"
              >
                <div className="px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#C5A55A] bg-[#0F1A0E]">
                  {row.label}
                </div>
                <div className="px-4 py-3 flex items-start gap-2.5 border-b border-gray-100">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#2D5A27]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="text-sm leading-snug">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#2D5A27]/70 font-semibold mb-0.5">Sealed member</div>
                    <div className="text-[#1E3D1A]">{row.member}</div>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-start gap-2.5 bg-[#fafaf6]">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#9B1B30]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="text-sm leading-snug">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-gray-400 font-semibold mb-0.5">Outside the Roll</div>
                    <div className="text-gray-500">{row.outside}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 md:mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-4">
            <button
              onClick={scrollToEnroll}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 bg-[#0F1A0E] text-[#C5A55A] font-semibold rounded-lg hover:bg-[#1a2c19] transition-colors text-sm md:text-base"
            >
              Take your name on the Roll <span aria-hidden>→</span>
            </button>
            <p className="text-[11px] md:text-xs text-gray-500 text-center">
              Invitation {invite.code} · expires {new Date(invite.expires_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Constitution quote */}
      <section className="py-12 md:py-24 bg-[#0F1A0E] text-white">
        <div className="max-w-[760px] mx-auto px-5 md:px-6 text-center">
          <blockquote className="text-lg md:text-2xl font-serif italic leading-relaxed text-white/90">
            &ldquo;We, the Moorish American people of the Sultanate of Amexem &mdash;
            descendants and successors in interest to the ancient Nation of Moab
            &mdash; gather in fidelity to the principles of Love, Truth, Peace, Freedom,
            and Justice, and in reverence to Allah, the Most High.&rdquo;
          </blockquote>
          <div className="w-14 md:w-16 h-px bg-[#C5A55A] mx-auto my-6 md:my-8" />
          <p className="text-[12.5px] md:text-sm text-[#C5A55A]/80">
            From the Constitution of the Sultanate of Amexem &mdash; Chicago, Illinois
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6">
          <div className="text-center mb-9 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-5">
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                The Path to Membership
              </span>
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-[26px] md:text-4xl font-bold leading-[1.15]">How Enrollment Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {HOW.map((s, i) => (
              <div key={s.h} className="p-5 md:p-6 rounded-xl border border-gray-200 bg-white">
                <div className="text-2xl md:text-3xl font-mono font-bold text-[#C5A55A]/40 mb-2 md:mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-base md:text-lg font-bold mb-2">{s.h}</h4>
                <p className="text-[13.5px] md:text-sm text-gray-600 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment form */}
      <section id="enroll" className="py-12 md:py-24 bg-[#f6f5f1]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6">
          <div className="text-center mb-9 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-4 md:mb-5">
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
              <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                Take Your Name on the Roll
              </span>
              <span className="h-px w-9 md:w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-[26px] md:text-4xl font-bold mb-3 leading-[1.15]">
              Be entered onto the Original Roll
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Four short steps. Submitting locks your $50/mo Original Standing rate,
              your pro-rata share of cooperative ventures, and a seat your descendants
              inherit. Your information is used only for Council review.
            </p>
          </div>
          <EnrollmentForm invite={invite} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1A0E] text-white py-10 md:py-12">
        <div className="max-w-[1120px] mx-auto px-5 md:px-6 text-center">
          <Image
            src="/images/emblem.svg"
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-4 opacity-80 w-12 h-12 md:w-14 md:h-14"
          />
          <p className="text-sm font-semibold text-[#C5A55A] mb-1">Sultanate of Amexem</p>
          <p className="text-[11px] md:text-xs text-white/60 mb-4">Custodian of the Nation of Moab</p>
          <p className="text-[11px] md:text-xs text-white/40 leading-relaxed">
            Chicago, Illinois &middot; Reconstituted October 2020 &middot; House of Simmons Bey
            <br />
            sultanateofamexem.com
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─── 4-step Enrollment Form ─── */
const TOTAL_STEPS = 4;
const STEP_LABELS = ["Personal", "Heritage & Intent", "Commitments", "Review"];

function EnrollmentForm({ invite }: { invite: Invite }) {
  // Draft + invite prefill. Draft wins when both exist; an empty draft string
  // is honored so a user who cleared a prefilled field doesn't get it back.
  const draft = (invite.draft_payload ?? {}) as Record<string, unknown>;
  const draftStr = (k: string, fallback = "") => {
    const v = draft[k];
    return typeof v === "string" ? v : fallback;
  };
  const draftBool = (k: string) => draft[k] === true;

  const [step, setStep] = useState(typeof draft.step === "number" ? (draft.step as number) : 1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touchedOnce, setTouchedOnce] = useState(false);

  // Form fields. Prefer the saved draft, then the invite, then empty.
  const [fullName, setFullName] = useState(draftStr("fullName", invite.name ?? ""));
  const [dob, setDob] = useState(draftStr("dob"));
  const [phone, setPhone] = useState(draftStr("phone"));
  const [email, setEmail] = useState(draftStr("email", invite.email ?? ""));
  const [address, setAddress] = useState(draftStr("address"));
  const [city, setCity] = useState(draftStr("city"));
  const [stateVal, setStateVal] = useState(draftStr("stateVal"));
  const [zip, setZip] = useState(draftStr("zip"));
  const [moorishStatus, setMoorishStatus] = useState(draftStr("moorishStatus"));
  const [duration, setDuration] = useState(draftStr("duration"));
  const [surnamePref, setSurnamePref] = useState(draftStr("surnamePref"));
  const [statement, setStatement] = useState(draftStr("statement"));
  const [howHeard, setHowHeard] = useState(draftStr("howHeard", invite.invited_by_name ?? ""));
  const [canAttend, setCanAttend] = useState(draftBool("canAttend"));
  const [canDues, setCanDues] = useState(draftBool("canDues"));
  const [canParticipate, setCanParticipate] = useState(draftBool("canParticipate"));
  const [affirm, setAffirm] = useState(draftBool("affirm"));

  // Debounced auto-save of the form state to the invite row, so a user
  // who closes the tab mid-application can pick up where they left off.
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (submitted) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const supabase = createClient();
      supabase
        .rpc("save_enrollment_draft", {
          p_code: invite.code,
          p_partial: {
            step,
            fullName, dob, phone, email,
            address, city, stateVal, zip,
            moorishStatus, duration, surnamePref, statement, howHeard,
            canAttend, canDues, canParticipate, affirm,
          },
        })
        .then(() => undefined);
    }, 1200);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [
    invite.code, submitted, step,
    fullName, dob, phone, email, address, city, stateVal, zip,
    moorishStatus, duration, surnamePref, statement, howHeard,
    canAttend, canDues, canParticipate, affirm,
  ]);

  // Mark "started" the first time a user types anything.
  const markStarted = useCallback(() => {
    if (touchedOnce) return;
    setTouchedOnce(true);
    const supabase = createClient();
    supabase.rpc("mark_invite_started", { p_code: invite.code }).then(() => undefined);
  }, [invite.code, touchedOnce]);

  const canNext = useMemo(() => {
    if (step === 1) return fullName && email && phone;
    if (step === 2) return moorishStatus && statement.trim().length > 0;
    if (step === 3) return canAttend && canDues && canParticipate && affirm;
    return true;
  }, [step, fullName, email, phone, moorishStatus, statement, canAttend, canDues, canParticipate, affirm]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const supabase = createClient();

    const { error: submitErr } = await supabase.rpc("submit_enrollment", {
      p_code: invite.code,
      p_payload: {
        full_name: fullName,
        date_of_birth: dob || null,
        phone,
        email,
        address: address || null,
        city: city || null,
        state: stateVal || null,
        zip: zip || null,
        moorish_status: moorishStatus || null,
        identification_duration: duration || null,
        surname_preference: surnamePref || null,
        statement_of_intent: statement,
        how_heard: howHeard || null,
        can_attend_assemblies: canAttend,
        can_pay_dues: canDues,
        can_participate: canParticipate,
        affirm_principles: affirm,
        constitution_acknowledged: affirm,
        terms_accepted: affirm,
      },
    });

    if (submitErr) {
      const msg = submitErr.message.includes("invite_expired")
        ? "This invitation has expired. Please ask your inviter to send a fresh one."
        : submitErr.message.includes("invite_revoked")
          ? "This invitation has been revoked and can no longer be used."
          : submitErr.message.includes("already_submitted")
            ? "This invitation has already been used."
            : `Submission failed: ${submitErr.message}`;
      setError(msg);
      setSubmitting(false);
      return;
    }

    // Notify admins.
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "membership_application",
        name: fullName,
        email,
        details: {
          surname_preference: surnamePref,
          source: `Invitation ${invite.code}`,
          invited_by: invite.invited_by_name,
        },
      }),
    });

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-7 md:p-14 text-center shadow-[0_24px_60px_-30px_rgba(15,26,14,0.4)] overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#C5A55A,transparent)]" />
        <span className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#C5A55A,transparent)]" />
        <div className="relative w-[108px] h-[108px] mx-auto mb-7 flex items-center justify-center">
          <span className="absolute inset-[-10px] rounded-full border border-[#C5A55A]/60" />
          <span className="absolute inset-[-22px] rounded-full border border-[#C5A55A]/25" />
          <div className="w-16 h-16 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#A8893E] mb-3">
          Application Received
        </p>
        <h3
          className="text-3xl md:text-4xl text-[#1a1a1a] mb-4 leading-tight"
          style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontStyle: "italic", fontWeight: 400 }}
        >
          {fullName.trim() ? `Welcome, ${fullName.trim().split(" ")[0]}` : "Welcome"}
        </h3>
        <div
          className="mx-auto mb-5 h-px"
          style={{ width: 96, background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }}
        />
        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
          The Supreme Grand Council will review your enrollment. Expect a decision by
          email within two to four weeks. Stand in your nationality.
        </p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/40 focus:border-transparent bg-white";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-5 md:p-10 shadow-sm">
      {/* Stepper */}
      <div className="flex items-center mb-7 md:mb-10">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex-1 flex items-center last:flex-none">
            <div
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[11px] md:text-xs font-semibold shrink-0 ${
                step >= s
                  ? "bg-[#C5A55A] text-[#0F1A0E]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < TOTAL_STEPS && (
              <div className={`flex-1 h-px mx-1.5 md:mx-2 ${step > s ? "bg-[#C5A55A]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <p className="text-[11px] md:text-xs uppercase tracking-wider text-[#C5A55A] font-semibold mb-2">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6">{STEP_LABELS[step - 1]}</h3>

      {/* Step 1: Personal */}
      {step === 1 && (
        <div className="space-y-4" onChange={markStarted}>
          <Field label="Full Legal Name" required>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Date of Birth">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Phone" required>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Email" required>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Street Address">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="State">
              <input
                type="text"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="ZIP">
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Step 2: Heritage & Intent */}
      {step === 2 && (
        <div className="space-y-4" onChange={markStarted}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Moorish American Status" required>
              <select
                value={moorishStatus}
                onChange={(e) => setMoorishStatus(e.target.value)}
                required
                className={inputCls}
              >
                <option value="">Select…</option>
                <option value="Identified">Already identified</option>
                <option value="In Process">In the process of identifying</option>
                <option value="New">New to the nationality</option>
              </select>
            </Field>
            <Field label="How long have you identified?">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputCls}
              >
                <option value="">Select…</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1–3 years</option>
                <option value="3-5 years">3–5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </Field>
          </div>
          <Field label="Surname Preference (Bey / El)">
            <select
              value={surnamePref}
              onChange={(e) => setSurnamePref(e.target.value)}
              className={inputCls}
            >
              <option value="">Select preference…</option>
              <option value="Bey">Bey</option>
              <option value="El">El</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </Field>
          <Field label="Statement of Intent" required>
            <textarea
              rows={5}
              required
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Share why you wish to enroll, what nationality means to you, and how you intend to contribute."
              className={inputCls}
            />
          </Field>
          <Field label="How did you hear about the Sultanate?">
            <input
              type="text"
              value={howHeard}
              onChange={(e) => setHowHeard(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      )}

      {/* Step 3: Commitments */}
      {step === 3 && (
        <div className="space-y-3">
          <Checkbox checked={canAttend} onChange={setCanAttend}>
            I commit to attending Friday Holy Day Meetings as my schedule allows.
          </Checkbox>
          <Checkbox checked={canDues} onChange={setCanDues}>
            I am able to pay monthly dues at the Community tier ($50/month) once enrolled.
          </Checkbox>
          <Checkbox checked={canParticipate} onChange={setCanParticipate}>
            I commit to participating in community affairs, study, and uplift work.
          </Checkbox>
          <div className="pt-3 mt-3 border-t border-gray-200">
            <Checkbox checked={affirm} onChange={setAffirm} accent>
              I affirm the five principles — <strong>Love, Truth, Peace, Freedom, and Justice</strong> —
              and acknowledge the Constitution of the Sultanate of Amexem.
            </Checkbox>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="space-y-5">
          <p className="text-sm text-gray-600">
            Review your application below. When you submit, it goes to the Supreme Grand
            Council for review.
          </p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm space-y-2">
            <SummaryRow label="Name" value={fullName} />
            <SummaryRow label="Email" value={email} />
            <SummaryRow label="Phone" value={phone} />
            <SummaryRow label="Date of Birth" value={dob} />
            <SummaryRow label="Address" value={[address, city, stateVal, zip].filter(Boolean).join(", ")} />
            <SummaryRow label="Moorish Status" value={moorishStatus} />
            <SummaryRow label="Surname Preference" value={surnamePref} />
            <SummaryRow label="Statement" value={statement} multiline />
            <SummaryRow label="Affirms 5 principles" value={affirm ? "Yes" : "No"} />
          </div>
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 mt-8 md:mt-10 pt-5 md:pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1 || submitting}
          className="text-sm px-4 py-3 md:py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
        >
          Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="flex-1 sm:flex-none text-sm px-6 py-3 md:py-2.5 rounded-lg bg-[#C5A55A] text-[#0F1A0E] font-semibold disabled:opacity-50 hover:bg-[#D4BA7A]"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 sm:flex-none text-sm px-6 py-3 md:py-2.5 rounded-lg bg-[#2D5A27] text-white font-semibold disabled:opacity-50 hover:bg-[#1E3D1A]"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-[#C41E3A]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
  accent,
}: {
  checked: boolean;
  onChange: (b: boolean) => void;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
      checked
        ? accent
          ? "border-[#C5A55A] bg-[#C5A55A]/5"
          : "border-[#2D5A27] bg-[#2D5A27]/5"
        : "border-gray-200 hover:bg-gray-50"
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 shrink-0"
      />
      <span className="text-sm text-gray-700 leading-relaxed">{children}</span>
    </label>
  );
}

function SummaryRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  if (!value) return null;
  return (
    <div className={multiline ? "" : "flex gap-3"}>
      <span className="text-gray-500 font-medium shrink-0 min-w-[140px]">{label}:</span>
      <span className="text-gray-800 whitespace-pre-wrap">{value}</span>
    </div>
  );
}
