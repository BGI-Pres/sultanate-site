"use client";

import Link from "next/link";
import { useState, useRef, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

/* ── Shared style constants ── */
const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;

/* ── Venture type options (for proposals) ── */
const ventureTypes = [
  "Retail",
  "Agriculture",
  "Manufacturing",
  "Technology",
  "Media/Publishing",
  "Construction",
  "Services",
  "Other",
];

/* ── Intent options ── */
const intentOptions = [
  { value: "propose", label: "Propose New Venture" },
  { value: "invest", label: "Invest in Existing Venture" },
  { value: "join", label: "Join Existing Venture" },
];

/* ── How It Works cards ── */
const howItWorks = [
  {
    title: "Propose",
    description:
      "Submit a new cooperative venture idea for review by the Supreme Grand Council. Describe your vision and the council will evaluate it for feasibility and alignment with national priorities.",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  {
    title: "Invest",
    description:
      "Express interest in financially supporting an approved cooperative venture. Administration will coordinate investment details, terms, and member participation.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    title: "Join",
    description:
      "Apply to participate as a member-operator of an approved cooperative. Bring your skills, labor, and expertise to help build and run the venture alongside fellow members.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
];

/* ── Example active ventures ── */
const activeVentures = [
  {
    name: "Community Market Co-op",
    type: "Retail Cooperative",
    status: "approved",
    description:
      "A member-owned market providing essential goods at fair prices.",
  },
  {
    name: "Moorish Media Collective",
    type: "Media/Publishing",
    status: "pending",
    description:
      "Cooperative media production and distribution for community storytelling.",
  },
  {
    name: "Heritage Builders Co-op",
    type: "Construction/Development",
    status: "approved",
    description:
      "Member-owned construction cooperative for community infrastructure projects.",
  },
];

export default function CooperativeVenturesPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  /* ── Form fields ── */
  const [intent, setIntent] = useState("");
  const [ventureName, setVentureName] = useState("");
  const [ventureType, setVentureType] = useState("");
  const [description, setDescription] = useState("");
  const [investmentInterest, setInvestmentInterest] = useState("");
  const [skills, setSkills] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Scroll to form ── */
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  /* ── Validation ── */
  function validate(): boolean {
    if (!intent) {
      setError("Please select your intent.");
      return false;
    }
    if (!ventureName.trim()) {
      setError("Venture name is required.");
      return false;
    }
    if (intent === "propose" && !description.trim()) {
      setError("A description is required when proposing a new venture.");
      return false;
    }
    if (intent === "invest" && !investmentInterest.trim()) {
      setError(
        "Investment interest/amount is required when expressing investment interest.",
      );
      return false;
    }
    if (!applicantName.trim()) {
      setError("Your name is required.");
      return false;
    }
    if (!applicantEmail.trim()) {
      setError("Your email is required.");
      return false;
    }
    return true;
  }

  /* ── Submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: insertError } = await supabase
        .from("cooperative_applications")
        .insert({
          intent,
          venture_name: ventureName.trim(),
          venture_type: intent === "propose" ? ventureType || null : null,
          description: intent === "propose" ? description.trim() || null : null,
          investment_interest:
            intent === "invest" ? investmentInterest.trim() || null : null,
          skills: intent === "join" ? skills.trim() || null : null,
          applicant_name: applicantName.trim(),
          applicant_email: applicantEmail.trim(),
          applicant_phone: applicantPhone.trim() || null,
          additional_notes: additionalNotes.trim() || null,
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
        body: JSON.stringify({
          name: applicantName.trim(),
          email: applicantEmail.trim(),
        }),
      });

      setSubmitted(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ═══════════════════════════════════════════════════════
     Confirmation Screen
     ═══════════════════════════════════════════════════════ */
  if (submitted) {
    return (
      <>
        {/* Dark hero */}
        <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px w-16 bg-[var(--gold)] mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Application Submitted
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              Your cooperative venture application has been received and is under
              review by the Supreme Grand Council.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-xl border border-[var(--gray-200)] bg-white p-8 md:p-12">
              <div className="w-16 h-16 rounded-full bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
                Thank You, {applicantName}
              </h2>
              <p className="text-[var(--gray-500)] leading-relaxed mb-2">
                Your{" "}
                {intent === "propose"
                  ? "proposal"
                  : intent === "invest"
                    ? "investment interest"
                    : "application to join"}{" "}
                for{" "}
                <span className="font-semibold text-[var(--gray-700)]">
                  {ventureName}
                </span>{" "}
                has been submitted successfully.
              </p>
              <p className="text-sm text-[var(--gray-500)] mb-8">
                You will receive updates at{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {applicantEmail}
                </span>{" "}
                as the council reviews your application.
              </p>
              <Link
                href="/economics"
                className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
              >
                Back to Economics
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ═══════════════════════════════════════════════════════
     Main Page
     ═══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Dark Hero Header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Cooperative Ventures
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Joint economic enterprises owned and operated by the membership.
            Propose, invest in, or join cooperative ventures that circulate
            wealth and build lasting power within the Sultanate of Amexem.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              How It Works
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Three Paths to Participation
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            Whether you have a vision for a new cooperative, capital to invest,
            or skills to contribute, there is a role for you in building the
            economic infrastructure of the nation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-[var(--gray-200)] bg-white p-6 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Ventures ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Active Ventures
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Current Cooperative Ventures
          </h2>
          <p className="text-white/70 leading-relaxed max-w-3xl mb-10 text-[15px]">
            Below are the cooperative ventures currently under development or
            seeking participants. Approved ventures are open for investment
            interest and membership applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVentures.map((venture) => (
              <div
                key={venture.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-white">
                    {venture.name}
                  </h3>
                  {venture.status === "approved" ? (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30">
                      Approved
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Pending Approval
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
                  {venture.type}
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-6 flex-1">
                  {venture.description}
                </p>
                {venture.status === "approved" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIntent("invest");
                        setVentureName(venture.name);
                        scrollToForm();
                      }}
                      className="px-4 py-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-xs hover:bg-[var(--gold-light)] transition-colors"
                    >
                      Express Interest to Invest
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIntent("join");
                        setVentureName(venture.name);
                        scrollToForm();
                      }}
                      className="px-4 py-2 border border-[var(--gold)] text-[var(--gold)] font-semibold rounded-lg text-xs hover:bg-[var(--gold)]/10 transition-colors"
                    >
                      Apply to Join
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application / Interest Form ── */}
      <section className="py-12 md:py-20" ref={formRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Get Involved
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Submit an Application
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed mb-10 text-[15px]">
            Use the form below to propose a new cooperative venture, express
            investment interest, or apply to join an existing venture. All
            submissions are reviewed and must be approved by the Supreme Grand
            Council before any action is taken. No venture, investment, or
            membership proceeds without formal approval.
          </p>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[var(--gray-200)] bg-white p-6 md:p-8 space-y-6"
          >
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Intent */}
            <div>
              <label htmlFor="intent" className={labelClass}>
                What would you like to do? *
              </label>
              <select
                id="intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className={selectClass}
              >
                <option value="">Select your intent...</option>
                {intentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Venture Name */}
            <div>
              <label htmlFor="ventureName" className={labelClass}>
                Venture Name *
              </label>
              <input
                type="text"
                id="ventureName"
                value={ventureName}
                onChange={(e) => setVentureName(e.target.value)}
                placeholder={
                  intent === "propose"
                    ? "e.g. Amexem Agricultural Co-op"
                    : "Name of the existing venture"
                }
                className={inputClass}
              />
            </div>

            {/* Venture Type — only for Propose */}
            {intent === "propose" && (
              <div>
                <label htmlFor="ventureType" className={labelClass}>
                  Venture Type
                </label>
                <select
                  id="ventureType"
                  value={ventureType}
                  onChange={(e) => setVentureType(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select venture type...</option>
                  {ventureTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Description — only for Propose */}
            {intent === "propose" && (
              <div>
                <label htmlFor="description" className={labelClass}>
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the cooperative venture — its purpose, structure, target market, and how it serves the community."
                  className={`${inputClass} resize-y`}
                />
              </div>
            )}

            {/* Investment Interest — only for Invest */}
            {intent === "invest" && (
              <div>
                <label htmlFor="investmentInterest" className={labelClass}>
                  Investment Interest / Amount *
                </label>
                <input
                  type="text"
                  id="investmentInterest"
                  value={investmentInterest}
                  onChange={(e) => setInvestmentInterest(e.target.value)}
                  placeholder="e.g. $5,000 or a range you are comfortable with"
                  className={inputClass}
                />
              </div>
            )}

            {/* Skills / Experience — only for Join */}
            {intent === "join" && (
              <div>
                <label htmlFor="skills" className={labelClass}>
                  Skills &amp; Experience to Contribute
                </label>
                <textarea
                  id="skills"
                  rows={4}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Describe the skills, experience, or labor you can contribute to the cooperative."
                  className={`${inputClass} resize-y`}
                />
              </div>
            )}

            <div className="h-px bg-[var(--gray-200)]" />

            {/* Applicant Name */}
            <div>
              <label htmlFor="applicantName" className={labelClass}>
                Your Name *
              </label>
              <input
                type="text"
                id="applicantName"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Applicant Email */}
              <div>
                <label htmlFor="applicantEmail" className={labelClass}>
                  Your Email *
                </label>
                <input
                  type="email"
                  id="applicantEmail"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Applicant Phone */}
              <div>
                <label htmlFor="applicantPhone" className={labelClass}>
                  Your Phone (optional)
                </label>
                <input
                  type="text"
                  id="applicantPhone"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className={labelClass}>
                Additional Notes (optional)
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Anything else you would like the council to know"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
