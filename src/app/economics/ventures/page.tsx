"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

/* ── Shared style constants ── */
const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;

/* ── Institution type options ── */
const institutionTypes = [
  "School/Academy",
  "Health Clinic",
  "Business/Enterprise",
  "Cooperative",
  "Media/Publishing",
  "Community Center",
  "Other",
];

/* ── Example institution categories ── */
const exampleInstitutions = [
  {
    title: "Schools & Academies",
    description:
      "Educational institutions that teach our history, language, trades, and sciences from within our own worldview.",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  },
  {
    title: "Health Clinics",
    description:
      "Community health centers providing holistic and preventive care to the membership and surrounding communities.",
    icon: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  },
  {
    title: "Businesses & Enterprises",
    description:
      "Commercial ventures owned and operated by the membership that circulate wealth within the community.",
    icon: "M2.25 21h19.5M3.75 3v18h16.5V3H3.75zm3 3.75h3v3h-3v-3zm0 6h3v3h-3v-3zm6-6h3v3h-3v-3zm0 6h3v3h-3v-3z",
  },
  {
    title: "Cooperatives",
    description:
      "Member-owned organizations for agriculture, housing, credit, or production — shared risk and shared reward.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Media & Publishing",
    description:
      "News outlets, publishing houses, podcasts, and digital media platforms that amplify the voice of the Sultanate.",
    icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5",
  },
  {
    title: "Community Centers",
    description:
      "Gathering spaces for assemblies, education, cultural events, and community programs that strengthen the bond of the membership.",
    icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819",
  },
];

export default function VenturesPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Form fields ── */
  const [proposalName, setProposalName] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [description, setDescription] = useState("");
  const [targetCommunity, setTargetCommunity] = useState("");
  const [estimatedFunding, setEstimatedFunding] = useState("");
  const [proposedTimeline, setProposedTimeline] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [proposerName, setProposerName] = useState("");
  const [proposerEmail, setProposerEmail] = useState("");
  const [proposerPhone, setProposerPhone] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Validation ── */
  function validate(): boolean {
    if (!proposalName.trim()) {
      setError("Proposal name is required.");
      return false;
    }
    if (!institutionType) {
      setError("Please select an institution type.");
      return false;
    }
    if (!description.trim()) {
      setError("A description of the proposed institution is required.");
      return false;
    }
    if (!targetCommunity.trim()) {
      setError("Target community or area is required.");
      return false;
    }
    if (!proposerName.trim()) {
      setError("Proposer name is required.");
      return false;
    }
    if (!proposerEmail.trim()) {
      setError("Proposer email is required.");
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
        .from("venture_proposals")
        .insert({
          proposal_name: proposalName.trim(),
          institution_type: institutionType,
          description: description.trim(),
          target_community: targetCommunity.trim(),
          estimated_funding: estimatedFunding.trim() || null,
          proposed_timeline: proposedTimeline.trim() || null,
          team_members: teamMembers.trim() || null,
          proposer_name: proposerName.trim(),
          proposer_email: proposerEmail.trim(),
          proposer_phone: proposerPhone.trim() || null,
          additional_notes: additionalNotes.trim() || null,
        });

      if (insertError) {
        setError(
          "There was an issue submitting your proposal. Please try again.",
        );
        setLoading(false);
        return;
      }

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: proposerName.trim(),
          email: proposerEmail.trim(),
        }),
      });

      trackEvent("venture_proposal_submitted");

      setSubmitted(true);
    } catch {
      setError(
        "An unexpected error occurred. Please try again.",
      );
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
              Proposal Submitted
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              Your institutional venture proposal has been received and is under
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
                Thank You, {proposerName}
              </h2>
              <p className="text-[var(--gray-500)] leading-relaxed mb-2">
                Your proposal for{" "}
                <span className="font-semibold text-[var(--gray-700)]">
                  {proposalName}
                </span>{" "}
                has been submitted successfully.
              </p>
              <p className="text-sm text-[var(--gray-500)] mb-8">
                You will receive updates at{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {proposerEmail}
                </span>{" "}
                as the council reviews your proposal.
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
            Institutional Ventures
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Propose new institutions to be built within the Sultanate of Amexem
            — from schools and clinics to cooperatives and media outlets. The
            strength of the nation is built from within.
          </p>
        </div>
      </section>

      {/* ── What Qualifies ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              What Qualifies
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Institutions That Serve the Nation
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            The Sultanate welcomes proposals for any institution that
            strengthens our collective infrastructure — educational,
            commercial, cooperative, or cultural. If it serves the people and
            builds lasting power from within, we want to hear about it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleInstitutions.map((item) => (
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

      {/* ── Proposal Form ── */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Submit a Proposal
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Propose an Institutional Venture
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed mb-10 text-[15px]">
            Complete the form below to submit your institutional venture
            proposal. All proposals are reviewed by the Supreme Grand Council.
            No membership or authentication is required — anyone with a vision
            for the nation may submit.
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

            {/* Proposal Name */}
            <div>
              <label htmlFor="proposalName" className={labelClass}>
                Proposal Name *
              </label>
              <input
                type="text"
                id="proposalName"
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                placeholder="e.g. Amexem Academy of Sciences"
                className={inputClass}
              />
            </div>

            {/* Institution Type */}
            <div>
              <label htmlFor="institutionType" className={labelClass}>
                Institution Type *
              </label>
              <select
                id="institutionType"
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select institution type...</option>
                {institutionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Description of the Proposed Institution *
              </label>
              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this institution do? Who does it serve? What problem does it solve for the community?"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Target Community */}
            <div>
              <label htmlFor="targetCommunity" className={labelClass}>
                Target Community or Area *
              </label>
              <input
                type="text"
                id="targetCommunity"
                value={targetCommunity}
                onChange={(e) => setTargetCommunity(e.target.value)}
                placeholder="e.g. Greater Atlanta Moorish community"
                className={inputClass}
              />
            </div>

            {/* Estimated Funding & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estimatedFunding" className={labelClass}>
                  Estimated Funding Needed
                </label>
                <input
                  type="text"
                  id="estimatedFunding"
                  value={estimatedFunding}
                  onChange={(e) => setEstimatedFunding(e.target.value)}
                  placeholder="e.g. $50,000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="proposedTimeline" className={labelClass}>
                  Proposed Timeline
                </label>
                <input
                  type="text"
                  id="proposedTimeline"
                  value={proposedTimeline}
                  onChange={(e) => setProposedTimeline(e.target.value)}
                  placeholder="e.g. 6 months to launch"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Team Members */}
            <div>
              <label htmlFor="teamMembers" className={labelClass}>
                Team Members Involved
              </label>
              <textarea
                id="teamMembers"
                rows={3}
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                placeholder="Names and roles of team members involved in this venture"
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="h-px bg-[var(--gray-200)]" />

            {/* Proposer Info */}
            <div>
              <label htmlFor="proposerName" className={labelClass}>
                Your Name *
              </label>
              <input
                type="text"
                id="proposerName"
                value={proposerName}
                onChange={(e) => setProposerName(e.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proposerEmail" className={labelClass}>
                  Your Email *
                </label>
                <input
                  type="email"
                  id="proposerEmail"
                  value={proposerEmail}
                  onChange={(e) => setProposerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="proposerPhone" className={labelClass}>
                  Your Phone (optional)
                </label>
                <input
                  type="text"
                  id="proposerPhone"
                  value={proposerPhone}
                  onChange={(e) => setProposerPhone(e.target.value)}
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
                placeholder="Anything else you would like the council to know about this proposal"
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
                {loading ? "Submitting..." : "Submit Proposal"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
