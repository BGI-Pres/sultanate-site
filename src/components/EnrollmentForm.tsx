"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

const TOTAL_STEPS = 4;
const STEP_LABELS = [
  "Personal Information",
  "Heritage & Intent",
  "Commitments",
  "Review & Submit",
];

/* ── Shared style helpers ── */
const inputClass =
  "w-full px-4 py-[11px] border border-[var(--gray-300)] rounded-[11px] text-sm text-[var(--foreground)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition-shadow";

const selectClass = `${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'12'%20height%3D'8'%20viewBox%3D'0%200%2012%208'%3E%3Cpath%20fill%3D'%236b7280'%20d%3D'M6%208%200%200h12z'%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[right_15px_center] pr-10`;

const labelClass = "block text-[13.5px] font-medium text-[var(--gray-700)] mb-[7px]";

/* ── Sub-components ── */
function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-[34px]">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
              step >= s
                ? "bg-[var(--dark-bg)] text-[var(--gold)]"
                : "bg-[var(--gray-200)] text-[var(--gray-500)]"
            }`}
          >
            {s}
          </div>
          {s < TOTAL_STEPS && (
            <div
              className={`w-11 h-px transition-colors ${
                step > s ? "bg-[var(--gold)]" : "bg-[var(--gray-200)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className={labelClass}>
        {label}
        {required && <span className="text-[var(--cherry-red)]"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[var(--gray-500)] mt-1.5">{hint}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | boolean | undefined }) {
  if (value === undefined || value === "" || value === false) return null;
  const display = value === true ? "Yes" : value;
  return (
    <div className="flex justify-between gap-[18px] text-[13.5px]">
      <span className="text-[var(--gray-500)] shrink-0">{label}</span>
      <span className="font-medium text-[var(--gray-900)] text-right">{display}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main EnrollmentForm component
   ═══════════════════════════════════════════════════════ */
export default function EnrollmentForm({
  inviter,
  code,
}: {
  inviter: string;
  code: string;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  /* Step 1 — Personal Info */
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");

  /* Step 2 — Heritage & Intent */
  const [moorishStatus, setMoorishStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [surnamePref, setSurnamePref] = useState("");
  const [statement, setStatement] = useState("");
  const [howHeard, setHowHeard] = useState(inviter ? "Personal invitation" : "");

  /* Step 3 — Commitments */
  const [canAttend, setCanAttend] = useState(false);
  const [canDues, setCanDues] = useState(false);
  const [canParticipate, setCanParticipate] = useState(false);
  const [affirm, setAffirm] = useState(false);

  /* Step 4 — Review */
  const [terms, setTerms] = useState(false);
  const [ack, setAck] = useState(false);

  function scrollToTop() {
    if (topRef.current) {
      const y = topRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function validate(s: number): boolean {
    setError("");
    if (s === 1) {
      if (!fullName.trim()) { setError("Full legal name is required."); return false; }
      if (!email.trim())    { setError("Email address is required.");   return false; }
    }
    if (s === 2) {
      if (!statement.trim()) { setError("A statement of intent is required."); return false; }
    }
    if (s === 3) {
      if (!affirm) { setError("You must affirm the five principles to continue."); return false; }
    }
    return true;
  }

  function goNext() {
    if (validate(step)) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
      scrollToTop();
    }
  }
  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
    scrollToTop();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) { setError("You must agree to the terms of membership to proceed."); return; }
    if (!ack)   { setError("You must acknowledge the Constitution and Bylaws to proceed."); return; }
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

      const howHeardFinal = inviter
        ? `Personal invitation by ${inviter}${howHeard && howHeard !== "Personal invitation" ? ` — ${howHeard}` : ""}`
        : howHeard;

      const { error: insertError } = await supabase.from("applications").insert({
        user_id: user?.id ?? null,
        full_name: fullName,
        date_of_birth: dob || null,
        phone: phone || null,
        email,
        address: address || null,
        city: city || null,
        state: stateVal || null,
        zip: zip || null,
        moorish_status: moorishStatus || null,
        identification_duration: duration || null,
        surname_preference: surnamePref || null,
        statement_of_intent: statement,
        how_heard: howHeardFinal || null,
        can_attend_assemblies: canAttend,
        can_pay_dues: canDues,
        can_participate: canParticipate,
        affirm_principles: affirm,
        terms_accepted: terms,
        constitution_acknowledged: ack,
      });

      if (insertError) throw insertError;

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "membership_application",
          name: fullName,
          email,
          details: { surname_preference: surnamePref, invite_code: code || null, inviter: inviter || null },
        }),
      });

      trackEvent("membership_application_submitted", { tier: "invite", inviter: inviter || null });
      setSubmitted(true);
    } catch {
      setError("There was an issue submitting your application. Please try again.");
    } finally {
      setLoading(false);
      scrollToTop();
    }
  }

  /* ── Confirmation ── */
  if (submitted) {
    return (
      <div
        ref={topRef}
        className="max-w-[720px] mx-auto bg-white border border-[var(--gray-200)] rounded-[18px] p-10 shadow-[0_30px_60px_-40px_rgba(15,26,14,0.4)]"
      >
        <div className="text-center py-[14px] px-2">
          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem"
            width={84}
            height={84}
            className="mx-auto mb-6"
          />
          <h2 className="text-[28px] font-bold text-[var(--gray-900)] mb-[14px]">
            Application Received
          </h2>
          <p className="text-[15.5px] leading-relaxed text-[var(--gray-500)] max-w-[48ch] mx-auto mb-[26px]">
            Your membership application has been submitted to the Supreme Grand
            Council for review. You will be notified of your application status.
          </p>
          <div className="flex items-center justify-center gap-[26px] mb-[26px] flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--gray-500)]">Estimated review</span>
              <span className="text-[15px] font-semibold text-[var(--gray-900)]">2–4 weeks</span>
            </div>
            <div className="w-px h-[34px] bg-[var(--gray-200)]" />
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--gray-500)]">Confirmation sent to</span>
              <span className="text-[15px] font-semibold text-[var(--gray-900)]">{email || "your email"}</span>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-[var(--gray-500)] max-w-[46ch] mx-auto mb-7">
            Welcome to the path of nationality. The Sultanate will be in contact
            regarding your New Members Orientation.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setStep(1); }}
            className="inline-flex items-center gap-2 px-7 py-[13px] bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            Return to the Invitation
          </button>
        </div>
      </div>
    );
  }

  /* ── Form card ── */
  return (
    <div
      ref={topRef}
      className="max-w-[720px] mx-auto bg-white border border-[var(--gray-200)] rounded-[18px] p-10 shadow-[0_30px_60px_-40px_rgba(15,26,14,0.4)] sm:p-[26px_20px]"
    >
      {/* Card header */}
      <div className="text-center mb-7">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)] mb-[10px]">
          Membership Application
        </p>
        <h2 className="text-[28px] font-bold text-[var(--gray-900)] mb-2">
          {STEP_LABELS[step - 1]}
        </h2>
        <p className="text-[13px] text-[var(--gray-500)]">
          Step {step} of {TOTAL_STEPS} · Sultanate of Amexem
        </p>
      </div>

      <StepDots step={step} />

      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="p-3 mb-5 bg-red-50 border border-red-200 rounded-[11px] text-[13.5px] text-red-700">
            {error}
          </div>
        )}

        {/* ── Step 1: Personal Info ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <Field label="Full Legal Name" required>
              <input
                className={inputClass}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As it will appear on official documents"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date of Birth">
                <input className={inputClass} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </Field>
              <Field label="Phone Number">
                <input className={inputClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(000) 000-0000" />
              </Field>
            </div>

            <Field label="Email Address" required>
              <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </Field>

            <Field label="Street Address">
              <input className={inputClass} type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Field>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="City">
                <input className={inputClass} type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </Field>
              <Field label="State">
                <input className={inputClass} type="text" value={stateVal} onChange={(e) => setStateVal(e.target.value)} />
              </Field>
              <Field label="ZIP">
                <input className={inputClass} type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
              </Field>
            </div>

            <div className="flex justify-end pt-2">
              <button type="button" onClick={goNext} className="px-7 py-[13px] bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Heritage & Intent ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Are you currently proclaimed Moorish American?">
                <select className={selectClass} value={moorishStatus} onChange={(e) => setMoorishStatus(e.target.value)}>
                  <option value="">Select…</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>In Process</option>
                </select>
              </Field>
              <Field label="How long have you identified with this heritage?">
                <select className={selectClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="">Select…</option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                  <option>Lifelong</option>
                </select>
              </Field>
            </div>

            <Field label="Surname Preference" hint="The honorific name you wish to carry within the Sultanate.">
              <select className={selectClass} value={surnamePref} onChange={(e) => setSurnamePref(e.target.value)}>
                <option value="">Select preference…</option>
                <option>Bey</option>
                <option>El</option>
                <option>Not Sure</option>
              </select>
            </Field>

            <Field label="Statement of Intent" required>
              <textarea
                className={`${inputClass} resize-y leading-[1.55]`}
                rows={4}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Why do you wish to join the Sultanate of Amexem?"
              />
            </Field>

            <Field label="How did you hear about the Sultanate?">
              <input className={inputClass} type="text" value={howHeard} onChange={(e) => setHowHeard(e.target.value)} />
            </Field>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={goBack} className="px-7 py-[13px] border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors">
                Back
              </button>
              <button type="button" onClick={goNext} className="px-7 py-[13px] bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Commitments ── */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <p className="text-[14.5px] text-[var(--gray-500)] leading-relaxed">
              Membership is a covenant of participation. Indicate your willingness below.
            </p>

            {[
              { state: canAttend,      set: setCanAttend,      label: "I am willing to attend assemblies and gatherings." },
              { state: canDues,        set: setCanDues,        label: "I am willing to contribute dues as established by the Council." },
              { state: canParticipate, set: setCanParticipate, label: "I am willing to participate in community programs and initiatives." },
            ].map(({ state, set, label }) => (
              <label key={label} className="flex items-start gap-3 cursor-pointer text-[14px] text-[var(--gray-700)] leading-relaxed">
                <input
                  type="checkbox"
                  checked={state}
                  onChange={(e) => set(e.target.checked)}
                  className="mt-0.5 w-[17px] h-[17px] accent-[var(--gold-dark)] shrink-0"
                />
                <span>{label}</span>
              </label>
            ))}

            {/* Affirmation */}
            <label className="flex items-start gap-3 cursor-pointer text-[14px] text-[var(--gray-700)] leading-relaxed border border-[rgba(197,165,90,0.35)] rounded-[12px] p-[18px] bg-[rgba(197,165,90,0.06)]">
              <input
                type="checkbox"
                checked={affirm}
                onChange={(e) => setAffirm(e.target.checked)}
                className="mt-0.5 w-[17px] h-[17px] accent-[var(--gold-dark)] shrink-0"
              />
              <span>
                I affirm the five principles — <strong>Love, Truth, Peace, Freedom, and Justice</strong> —
                and commit to upholding them as a member of the Sultanate.
                <span className="text-[var(--cherry-red)]"> *</span>
              </span>
            </label>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={goBack} className="px-7 py-[13px] border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors">
                Back
              </button>
              <button type="button" onClick={goNext} className="px-7 py-[13px] bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Review & Submit ── */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            {/* Summary */}
            <div className="bg-[var(--gray-50)] rounded-[14px] p-[22px] flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] mb-0.5">
                  Personal Information
                </h4>
                <SummaryRow label="Name"    value={fullName} />
                <SummaryRow label="Date of Birth" value={dob} />
                <SummaryRow label="Phone"   value={phone} />
                <SummaryRow label="Email"   value={email} />
                <SummaryRow label="Address" value={[address, city, stateVal, zip].filter(Boolean).join(", ")} />
              </div>

              <div className="h-px bg-[var(--gray-200)]" />

              <div className="flex flex-col gap-2">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] mb-0.5">
                  Heritage &amp; Intent
                </h4>
                <SummaryRow label="Moorish American"  value={moorishStatus} />
                <SummaryRow label="Heritage Duration"  value={duration} />
                <SummaryRow label="Surname"            value={surnamePref} />
                <SummaryRow label="Statement"          value={statement} />
                <SummaryRow label="How Heard"          value={howHeard} />
              </div>

              <div className="h-px bg-[var(--gray-200)]" />

              <div className="flex flex-col gap-2">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--gold)] mb-0.5">
                  Commitments
                </h4>
                <SummaryRow label="Attend Assemblies"      value={canAttend} />
                <SummaryRow label="Contribute Dues"        value={canDues} />
                <SummaryRow label="Participate in Programs" value={canParticipate} />
                <SummaryRow label="Affirm Five Principles" value={affirm} />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer text-[14px] text-[var(--gray-700)] leading-relaxed border border-[var(--gray-200)] rounded-[12px] p-[18px]">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 w-[17px] h-[17px] accent-[var(--gold-dark)] shrink-0"
              />
              <span>
                I agree to the terms of membership and understand that my information
                will be used for membership processing purposes only.
              </span>
            </label>

            {/* Constitutional acknowledgment */}
            <div className="bg-[var(--dark-bg)] rounded-[14px] p-6">
              <h3 className="text-[14px] font-semibold text-white mb-3">
                Constitutional Acknowledgment
              </h3>
              <p className="text-[12.5px] leading-relaxed text-white/50 mb-[18px]">
                By submitting this application, I affirm that I have read and accept the
                Constitution and Bylaws of the Sultanate of Amexem. I agree to uphold the
                principles of Love, Truth, Peace, Freedom, and Justice, to conduct myself
                lawfully and honorably, and to contribute to the support and advancement
                of the Sultanate and its members.
              </p>
              <label className="flex items-start gap-3 cursor-pointer text-[14px] text-white/72 leading-relaxed">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                  className="mt-0.5 w-[17px] h-[17px] accent-[var(--gold)] shrink-0"
                />
                <span className="text-white/70">
                  I acknowledge and accept the Constitution and Bylaws of the Sultanate of Amexem.
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-2">
              <button type="button" onClick={goBack} className="px-7 py-[13px] border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors">
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !terms || !ack}
                className="px-7 py-[13px] bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
