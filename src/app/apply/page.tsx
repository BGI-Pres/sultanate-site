"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

const TOTAL_STEPS = 7;

const stepLabels = [
  "Personal Information",
  "Employment & Business",
  "Heritage & Background",
  "Intent & Purpose",
  "Commitments & Participation",
  "Emergency Contact & Reference",
  "Review & Submit",
];

/* ── Shared style constants ── */
const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;
const checkboxLabelClass = "flex items-start gap-3 cursor-pointer";
const checkboxClass =
  "mt-1 w-4 h-4 rounded border-[var(--gray-300)] text-[var(--gold)] focus:ring-[var(--gold)]";
const continueBtn =
  "px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors";
const backBtn =
  "px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors";

/* ── Section divider ── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-px bg-[var(--gold)]" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--gold)]/20" />
    </div>
  );
}

/* ── Summary helpers ── */
function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | boolean | undefined;
}) {
  if (value === undefined || value === "" || value === false) return null;
  const display = value === true ? "Yes" : value;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--gray-500)] shrink-0">{label}</span>
      <span className="font-medium text-[var(--gray-900)] text-right">
        {display}
      </span>
    </div>
  );
}

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gold)] mb-2">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Step 1 — Personal Information ── */
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  /* ── Step 2 — Employment & Business ── */
  const [occupation, setOccupation] = useState("");
  const [employer, setEmployer] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [skills, setSkills] = useState("");

  /* ── Step 3 — Heritage & Background ── */
  const [moorishStatus, setMoorishStatus] = useState("");
  const [identificationDuration, setIdentificationDuration] = useState("");
  const [lineage, setLineage] = useState("");
  const [priorAffiliations, setPriorAffiliations] = useState("");

  /* ── Step 4 — Intent & Purpose ── */
  const [surnamePref, setSurnamePref] = useState("");
  const [statement, setStatement] = useState("");
  const [howHeard, setHowHeard] = useState("");

  /* ── Step 5 — Commitments & Participation ── */
  const [canAttendAssemblies, setCanAttendAssemblies] = useState(false);
  const [canPayDues, setCanPayDues] = useState(false);
  const [canParticipate, setCanParticipate] = useState(false);
  const [constitutionRead, setConstitutionRead] = useState("");
  const [affirmPrinciples, setAffirmPrinciples] = useState(false);

  /* ── Step 6 — Emergency Contact & Reference ── */
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [referenceName, setReferenceName] = useState("");
  const [referencePhone, setReferencePhone] = useState("");
  const [referenceEmail, setReferenceEmail] = useState("");
  const [referenceRelationship, setReferenceRelationship] = useState("");

  /* ── Step 7 — Review & Submit ── */
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  /* ── Validation ── */
  function validateStep(s: number): boolean {
    setError("");
    switch (s) {
      case 1:
        if (!fullName.trim()) {
          setError("Full legal name is required.");
          return false;
        }
        if (!email.trim()) {
          setError("Email address is required.");
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        if (!statement.trim()) {
          setError("Statement of intent is required.");
          return false;
        }
        return true;
      case 5:
        if (!affirmPrinciples) {
          setError("You must affirm the five principles to continue.");
          return false;
        }
        return true;
      case 6:
        if (!emergencyName.trim()) {
          setError("Emergency contact name is required.");
          return false;
        }
        if (!emergencyPhone.trim()) {
          setError("Emergency contact phone is required.");
          return false;
        }
        if (!referenceName.trim()) {
          setError("Member reference name is required.");
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  function goNext() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  /* ── Submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must agree to the terms of membership to proceed.");
      return;
    }
    if (!acknowledged) {
      setError(
        "You must acknowledge the Constitution and Bylaws to proceed.",
      );
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

    const { error: insertError } = await supabase
      .from("applications")
      .insert({
        user_id: user?.id ?? null,
        full_name: fullName,
        date_of_birth: dob || null,
        phone,
        email,
        address,
        city,
        state,
        zip,
        occupation,
        employer,
        business_name: businessName || null,
        skills: skills || null,
        moorish_status: moorishStatus || null,
        identification_duration: identificationDuration || null,
        lineage: lineage || null,
        prior_affiliations: priorAffiliations || null,
        surname_preference: surnamePref || null,
        statement_of_intent: statement,
        how_heard: howHeard || null,
        can_attend_assemblies: canAttendAssemblies,
        can_pay_dues: canPayDues,
        can_participate: canParticipate,
        constitution_read: constitutionRead || null,
        affirm_principles: affirmPrinciples,
        emergency_name: emergencyName,
        emergency_phone: emergencyPhone,
        emergency_relationship: emergencyRelationship || null,
        reference_name: referenceName,
        reference_phone: referencePhone || null,
        reference_email: referenceEmail || null,
        reference_relationship: referenceRelationship || null,
        terms_accepted: termsAccepted,
        constitution_acknowledged: acknowledged,
      });

    if (insertError) {
      setError(
        "There was an issue submitting your application. Please try again.",
      );
      setLoading(false);
      return;
    }

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email, surnamePref }),
    });

    trackEvent("membership_application_submitted", { tier: "applicant" });

    setSubmitted(true);
    setLoading(false);
  }

  /* ═══════════════════════════════════════════════════════
     Confirmation Screen
     ═══════════════════════════════════════════════════════ */
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <Image
          src="/images/emblem.svg"
          alt="Sultanate of Amexem"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
          Application Received
        </h1>
        <p className="text-[var(--gray-500)] mb-2 leading-relaxed">
          Your membership application has been submitted to the Supreme Grand
          Council for review. You will be notified of your application status.
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-2">
          Estimated review time: 2--4 weeks
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-8">
          You will receive confirmation at{" "}
          <span className="font-medium text-[var(--gray-700)]">{email}</span>{" "}
          when a decision is made.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/auth/signup"
            className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            Create a portal account
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--gold)] font-medium hover:underline"
          >
            Return to Home &rarr;
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     Main Form
     ═══════════════════════════════════════════════════════ */
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
          Membership Application
        </h1>
        <p className="text-sm text-[var(--gray-500)]">
          Sultanate of Amexem — Custodian of the Nation of Moab
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 overflow-x-auto px-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                step >= s
                  ? "bg-[var(--dark-bg)] text-[var(--gold)]"
                  : "bg-[var(--gray-200)] text-[var(--gray-500)]"
              }`}
            >
              {s}
            </div>
            {s < TOTAL_STEPS && (
              <div
                className={`w-6 sm:w-10 h-px transition-colors ${
                  step > s ? "bg-[var(--gold)]" : "bg-[var(--gray-200)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* ═══════════════ Step 1 — Personal Information ═══════════════ */}
        {step === 1 && (
          <div className="space-y-5">
            <SectionLabel label="Personal Information" />

            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Legal Name *
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As it will appear on official documents"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className={labelClass}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="address" className={labelClass}>
                Street Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="zip" className={labelClass}>
                  ZIP
                </label>
                <input
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 2 — Employment & Business ═══════════════ */}
        {step === 2 && (
          <div className="space-y-5">
            <SectionLabel label="Employment &amp; Business" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="occupation" className={labelClass}>
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="employer" className={labelClass}>
                  Employer
                </label>
                <input
                  type="text"
                  id="employer"
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business Name (if applicable)
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="skills" className={labelClass}>
                Skills, Profession, or Expertise You Can Contribute
              </label>
              <textarea
                id="skills"
                rows={3}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="What skills or professional expertise can you offer the Sultanate?"
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 3 — Heritage & Background ═══════════════ */}
        {step === 3 && (
          <div className="space-y-5">
            <SectionLabel label="Heritage &amp; Background" />

            <div>
              <label htmlFor="moorishStatus" className={labelClass}>
                Are you currently proclaimed Moorish American?
              </label>
              <select
                id="moorishStatus"
                value={moorishStatus}
                onChange={(e) => setMoorishStatus(e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In Process">In Process</option>
              </select>
            </div>

            <div>
              <label htmlFor="identificationDuration" className={labelClass}>
                How long have you identified with this heritage?
              </label>
              <select
                id="identificationDuration"
                value={identificationDuration}
                onChange={(e) => setIdentificationDuration(e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
                <option value="Lifelong">Lifelong</option>
              </select>
            </div>

            <div>
              <label htmlFor="lineage" className={labelClass}>
                Family Lineage or Tribal/Family Connections (optional)
              </label>
              <textarea
                id="lineage"
                rows={3}
                value={lineage}
                onChange={(e) => setLineage(e.target.value)}
                placeholder="Any known family lineage, tribal, or family connections..."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="priorAffiliations" className={labelClass}>
                Previous Organizational Affiliations (optional)
              </label>
              <textarea
                id="priorAffiliations"
                rows={3}
                value={priorAffiliations}
                onChange={(e) => setPriorAffiliations(e.target.value)}
                placeholder="Temples, lodges, or similar bodies..."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 4 — Intent & Purpose ═══════════════ */}
        {step === 4 && (
          <div className="space-y-5">
            <SectionLabel label="Intent &amp; Purpose" />

            <div>
              <label htmlFor="surnamePref" className={labelClass}>
                Surname Preference
              </label>
              <select
                id="surnamePref"
                value={surnamePref}
                onChange={(e) => setSurnamePref(e.target.value)}
                className={selectClass}
              >
                <option value="">Select preference...</option>
                <option value="Bey">Bey</option>
                <option value="El">El</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div>
              <label htmlFor="statement" className={labelClass}>
                Statement of Intent *
              </label>
              <textarea
                id="statement"
                required
                rows={4}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Why do you wish to join the Sultanate of Amexem?"
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="howHeard" className={labelClass}>
                How did you hear about the Sultanate?
              </label>
              <input
                type="text"
                id="howHeard"
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 5 — Commitments & Participation ═══════════════ */}
        {step === 5 && (
          <div className="space-y-5">
            <SectionLabel label="Commitments &amp; Participation" />

            <div className="space-y-4">
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={canAttendAssemblies}
                  onChange={(e) => setCanAttendAssemblies(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I am willing to attend assemblies and gatherings
                </span>
              </label>

              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={canPayDues}
                  onChange={(e) => setCanPayDues(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I am willing to contribute dues as established by the Council
                </span>
              </label>

              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={canParticipate}
                  onChange={(e) => setCanParticipate(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I am willing to participate in community programs and
                  initiatives
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="constitutionRead" className={labelClass}>
                Have you read the Constitution of the Sultanate of Amexem?
              </label>
              <select
                id="constitutionRead"
                value={constitutionRead}
                onChange={(e) => setConstitutionRead(e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="border border-[var(--gold)]/30 rounded-xl p-5 bg-[var(--gold)]/5">
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={affirmPrinciples}
                  onChange={(e) => setAffirmPrinciples(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I affirm the five principles —{" "}
                  <strong>Love, Truth, Peace, Freedom, and Justice</strong> —
                  and commit to upholding them as a member of the Sultanate. *
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 6 — Emergency Contact & Reference ═══════════════ */}
        {step === 6 && (
          <div className="space-y-5">
            <SectionLabel label="Emergency Contact &amp; Reference" />

            <h3 className="text-sm font-semibold text-[var(--gray-900)]">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emergencyName" className={labelClass}>
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="emergencyName"
                  required
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className={labelClass}>
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  required
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="emergencyRelationship" className={labelClass}>
                Relationship
              </label>
              <input
                type="text"
                id="emergencyRelationship"
                value={emergencyRelationship}
                onChange={(e) => setEmergencyRelationship(e.target.value)}
                placeholder="e.g. Spouse, Parent, Sibling"
                className={inputClass}
              />
            </div>

            <div className="h-px bg-[var(--gray-200)] my-2" />

            <h3 className="text-sm font-semibold text-[var(--gray-900)]">
              Member Reference
            </h3>
            <p className="text-xs text-[var(--gray-500)] -mt-3">
              Someone who is already a member of the Sultanate.
            </p>

            <div>
              <label htmlFor="referenceName" className={labelClass}>
                Reference Name *
              </label>
              <input
                type="text"
                id="referenceName"
                required
                value={referenceName}
                onChange={(e) => setReferenceName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="referencePhone" className={labelClass}>
                  Reference Phone
                </label>
                <input
                  type="tel"
                  id="referencePhone"
                  value={referencePhone}
                  onChange={(e) => setReferencePhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="referenceEmail" className={labelClass}>
                  Reference Email
                </label>
                <input
                  type="email"
                  id="referenceEmail"
                  value={referenceEmail}
                  onChange={(e) => setReferenceEmail(e.target.value)}
                  placeholder="reference@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="referenceRelationship" className={labelClass}>
                Relationship to Reference
              </label>
              <input
                type="text"
                id="referenceRelationship"
                value={referenceRelationship}
                onChange={(e) => setReferenceRelationship(e.target.value)}
                placeholder="e.g. Friend, Family, Community member"
                className={inputClass}
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 7 — Review & Submit ═══════════════ */}
        {step === 7 && (
          <div className="space-y-5">
            <SectionLabel label="Review &amp; Submit" />

            {/* Summary card */}
            <div className="bg-[var(--gray-50)] rounded-xl p-5 space-y-5 text-sm">
              <SummarySection title="Personal Information">
                <SummaryRow label="Name" value={fullName} />
                <SummaryRow label="Date of Birth" value={dob} />
                <SummaryRow label="Phone" value={phone} />
                <SummaryRow label="Email" value={email} />
                <SummaryRow
                  label="Address"
                  value={[address, city, state, zip]
                    .filter(Boolean)
                    .join(", ")}
                />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Employment &amp; Business">
                <SummaryRow label="Occupation" value={occupation} />
                <SummaryRow label="Employer" value={employer} />
                <SummaryRow label="Business" value={businessName} />
                <SummaryRow label="Skills" value={skills} />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Heritage &amp; Background">
                <SummaryRow label="Moorish American" value={moorishStatus} />
                <SummaryRow
                  label="Heritage Duration"
                  value={identificationDuration}
                />
                <SummaryRow label="Lineage" value={lineage} />
                <SummaryRow
                  label="Prior Affiliations"
                  value={priorAffiliations}
                />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Intent &amp; Purpose">
                <SummaryRow label="Surname" value={surnamePref} />
                <SummaryRow label="Statement" value={statement} />
                <SummaryRow label="How Heard" value={howHeard} />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Commitments">
                <SummaryRow
                  label="Attend Assemblies"
                  value={canAttendAssemblies}
                />
                <SummaryRow label="Contribute Dues" value={canPayDues} />
                <SummaryRow
                  label="Participate in Programs"
                  value={canParticipate}
                />
                <SummaryRow
                  label="Constitution Read"
                  value={constitutionRead}
                />
                <SummaryRow
                  label="Affirm Five Principles"
                  value={affirmPrinciples}
                />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Emergency Contact &amp; Reference">
                <SummaryRow label="Emergency Contact" value={emergencyName} />
                <SummaryRow label="Emergency Phone" value={emergencyPhone} />
                <SummaryRow
                  label="Emergency Relationship"
                  value={emergencyRelationship}
                />
                <SummaryRow label="Reference" value={referenceName} />
                <SummaryRow label="Reference Phone" value={referencePhone} />
                <SummaryRow label="Reference Email" value={referenceEmail} />
                <SummaryRow
                  label="Reference Relationship"
                  value={referenceRelationship}
                />
              </SummarySection>
            </div>

            {/* Terms & Privacy */}
            <div className="border border-[var(--gray-200)] rounded-xl p-5">
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I agree to the terms of membership and understand that my
                  information will be used for membership processing purposes
                  only.
                </span>
              </label>
            </div>

            {/* Constitutional Acknowledgment */}
            <div className="bg-[var(--dark-bg)] rounded-xl p-5 md:p-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                Constitutional Acknowledgment
              </h3>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                By submitting this application, I affirm that I have read and
                accept the Constitution and Bylaws of the Sultanate of Amexem. I
                agree to uphold the principles of Love, Truth, Peace, Freedom,
                and Justice, to conduct myself lawfully and honorably, and to
                contribute to the support and advancement of the Sultanate and
                its members.
              </p>
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]"
                />
                <span className="text-sm text-white/70">
                  I acknowledge and accept the Constitution and Bylaws of the
                  Sultanate of Amexem.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={goBack} className={backBtn}>
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !acknowledged || !termsAccepted}
                className="px-8 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
