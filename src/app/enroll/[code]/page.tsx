"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

interface Invite {
  code: string;
  name: string;
  email: string;
  status: string;
  invited_by_name: string | null;
  inviter_message: string | null;
  expires_at: string;
}

const PRINCIPLES = ["Love", "Truth", "Peace", "Freedom", "Justice"];

const PILLARS = [
  {
    title: "Nationality & Standing",
    desc: "Formal identity under the custodianship of the Sultanate — documentation, constitutional protections, and proclaimed standing.",
    items: ["Official identification", "Constitutional protections", "Proclaimed nationality status"],
    icon: "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10",
  },
  {
    title: "Economic Security",
    desc: "A nation that does not control its economics controls nothing. Cooperative commerce and ventures born from our own membership.",
    items: ["Cooperative commercial ventures", "Collective business network", "Institutional development"],
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Culture & Presence",
    desc: "Our customs and culture presented to the world on our terms — ensuring our heritage is recognized and preserved for generations.",
    items: ["Global cultural presentation", "Heritage preservation", "Community network"],
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
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

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .rpc("get_invite_by_code", { p_code: code })
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setInvite(data as Invite);
      setLoading(false);
      // Fire-and-forget: bump status from sent → opened.
      supabase.rpc("mark_invite_opened", { p_code: code }).then(() => undefined);
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

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1A0E] text-white text-center px-6">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3">Invitation not found</h1>
          <p className="text-white/70 text-sm">
            This invitation code is invalid or has been retired. If you believe this is in error,
            reach out to the person who invited you.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 text-sm text-[#C5A55A] hover:underline"
          >
            Return to Sultanate of Amexem
          </button>
        </div>
      </div>
    );
  }

  if (!invite) return null;

  const expired = new Date(invite.expires_at) < new Date();
  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1A0E] text-white text-center px-6">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3">This invitation has expired</h1>
          <p className="text-white/70 text-sm">
            Your invitation lapsed on {new Date(invite.expires_at).toLocaleDateString()}.
            Reach out to {invite.invited_by_name ?? "the Sultanate"} to request a fresh link.
          </p>
        </div>
      </div>
    );
  }

  if (invite.status === "completed" || invite.status === "accepted") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1A0E] text-white text-center px-6">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3">Application already submitted</h1>
          <p className="text-white/70 text-sm">
            We have your enrollment, {invite.name.split(" ")[0]}. The Supreme Grand Council
            will be in touch by email within two to four weeks.
          </p>
        </div>
      </div>
    );
  }

  return <EnrollContent invite={invite} />;
}

/* ─── Main landing content ─── */
function EnrollContent({ invite }: { invite: Invite }) {
  function scrollToEnroll() {
    const el = document.getElementById("enroll");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const firstName = invite.name.split(" ")[0] || "Friend";

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen">
      {/* Utility bar */}
      <div className="bg-[#0F1A0E] border-b border-white/5">
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between h-9">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#C5A55A]">
            Reconstituted October 2020
          </span>
          <button
            onClick={scrollToEnroll}
            className="text-xs text-gray-400 hover:text-[#C5A55A] transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#0F1A0E] text-white overflow-hidden border-b-2 border-[#C5A55A]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(197,165,90,0.6) 0%, transparent 35%), radial-gradient(circle at 80% 60%, rgba(45,90,39,0.4) 0%, transparent 40%)" }} />
        <div className="max-w-[1120px] mx-auto px-6 py-16 md:py-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#C5A55A]/30 text-xs text-[#C5A55A] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A55A]" />
            <span>
              {invite.invited_by_name ? (
                <>
                  Personal invitation for <strong className="font-semibold text-white">{firstName}</strong>{" "}
                  from <strong className="font-semibold text-white">{invite.invited_by_name}</strong>
                </>
              ) : (
                <>Personal invitation for <strong className="font-semibold text-white">{firstName}</strong></>
              )}
            </span>
          </div>

          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem emblem"
            width={96}
            height={96}
            className="mb-8"
          />

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
            Proclaim Your <span className="text-[#C5A55A]">Nationality</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            You are invited to enroll as a member of the Sultanate of Amexem — the
            custodial governing authority for the descendants of the Nation of Moab,
            modernly identified as Moorish American. Standing, economic security, and
            heritage — secured from within our own membership.
          </p>

          {invite.inviter_message && (
            <div className="mb-8 max-w-2xl p-5 rounded-lg border border-[#C5A55A]/30 bg-[#C5A55A]/5">
              <p className="text-xs uppercase tracking-wider text-[#C5A55A] mb-2 font-semibold">
                A word from {invite.invited_by_name ?? "your inviter"}
              </p>
              <p className="text-white/85 text-sm leading-relaxed italic">
                &ldquo;{invite.inviter_message}&rdquo;
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={scrollToEnroll}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#C5A55A] text-[#0F1A0E] font-semibold rounded-lg hover:bg-[#D4BA7A] transition-colors"
            >
              Begin Enrollment <span aria-hidden>→</span>
            </button>
            <a
              href="#learn"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-sm font-semibold"
            >
              What membership secures
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/50 flex-wrap">
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
        <div className="max-w-[1120px] mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {PRINCIPLES.map((p, i) => (
              <div key={p} className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#C5A55A]/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm uppercase tracking-[0.15em] font-semibold text-white/85">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pillars */}
      <section id="learn" className="py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#C5A55A]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                What Membership Secures
              </span>
              <span className="h-px w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nationality Is the Order of the Day
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Without nationality, there is no standing, no protection, no commerce.
              The Sultanate secures all three.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pl) => (
              <div key={pl.title} className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[#C5A55A] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#0F1A0E] text-[#C5A55A] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pl.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">{pl.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{pl.desc}</p>
                <ul className="space-y-2">
                  {pl.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1 h-1 rounded-full bg-[#C5A55A] mt-2 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Constitution quote */}
      <section className="py-16 md:py-24 bg-[#0F1A0E] text-white">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <blockquote className="text-xl md:text-2xl font-serif italic leading-relaxed text-white/90">
            &ldquo;We, the Moorish American people of the Sultanate of Amexem — descendants
            and successors in interest to the ancient Nation of Moab — gather in fidelity
            to the principles of Love, Truth, Peace, Freedom, and Justice, and in
            reverence to Allah, the Most High.&rdquo;
          </blockquote>
          <div className="w-16 h-px bg-[#C5A55A] mx-auto my-8" />
          <p className="text-sm text-[#C5A55A]/80">
            From the Constitution of the Sultanate of Amexem — Chicago, Illinois
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#C5A55A]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                The Path to Membership
              </span>
              <span className="h-px w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">How Enrollment Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW.map((s, i) => (
              <div key={s.h} className="p-6 rounded-xl border border-gray-200 bg-white">
                <div className="text-3xl font-mono font-bold text-[#C5A55A]/40 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-lg font-bold mb-2">{s.h}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment form */}
      <section id="enroll" className="py-16 md:py-24 bg-[#f6f5f1]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#C5A55A]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A55A]">
                Enroll Now
              </span>
              <span className="h-px w-12 bg-[#C5A55A]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Begin Your Membership Application
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Complete the application below. Your information is used for membership
              processing only.
            </p>
          </div>
          <EnrollmentForm invite={invite} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1A0E] text-white py-12">
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <Image
            src="/images/emblem.svg"
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-4 opacity-80"
          />
          <p className="text-sm font-semibold text-[#C5A55A] mb-1">Sultanate of Amexem</p>
          <p className="text-xs text-white/60 mb-4">Custodian of the Nation of Moab</p>
          <p className="text-xs text-white/40 leading-relaxed">
            Chicago, Illinois · Reconstituted October 2020 · House of Simmons Bey
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
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touchedOnce, setTouchedOnce] = useState(false);

  // Form fields, prefilled from the invite where possible
  const [fullName, setFullName] = useState(invite.name);
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(invite.email);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [moorishStatus, setMoorishStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [surnamePref, setSurnamePref] = useState("");
  const [statement, setStatement] = useState("");
  const [howHeard, setHowHeard] = useState(invite.invited_by_name ?? "");
  const [canAttend, setCanAttend] = useState(false);
  const [canDues, setCanDues] = useState(false);
  const [canParticipate, setCanParticipate] = useState(false);
  const [affirm, setAffirm] = useState(false);

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

    const { data, error: insertErr } = await supabase
      .from("applications")
      .insert({
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
      })
      .select("id")
      .single();

    if (insertErr) {
      setError(`Submission failed: ${insertErr.message}`);
      setSubmitting(false);
      return;
    }

    // Mark invite completed and link to the new application row.
    await supabase.rpc("complete_invite", {
      p_code: invite.code,
      p_application_id: data.id,
    });

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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">Your application has been received</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
          Thank you, {fullName.split(" ")[0]}. The Supreme Grand Council will review your
          enrollment. Expect a decision by email within two to four weeks.
        </p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A55A]/40 focus:border-transparent bg-white";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
      {/* Stepper */}
      <div className="flex items-center mb-10">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex-1 flex items-center last:flex-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                step >= s
                  ? "bg-[#C5A55A] text-[#0F1A0E]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < TOTAL_STEPS && (
              <div className={`flex-1 h-px mx-2 ${step > s ? "bg-[#C5A55A]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <p className="text-xs uppercase tracking-wider text-[#C5A55A] font-semibold mb-2">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h3 className="text-xl font-bold mb-6">{STEP_LABELS[step - 1]}</h3>

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
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1 || submitting}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
        >
          Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="text-sm px-6 py-2.5 rounded-lg bg-[#C5A55A] text-[#0F1A0E] font-semibold disabled:opacity-50 hover:bg-[#D4BA7A]"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="text-sm px-6 py-2.5 rounded-lg bg-[#2D5A27] text-white font-semibold disabled:opacity-50 hover:bg-[#1E3D1A]"
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
