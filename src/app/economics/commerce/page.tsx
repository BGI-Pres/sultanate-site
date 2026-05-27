"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

/* ── Shared style constants ── */
const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;

const businessTypes = [
  "Retail",
  "Wholesale",
  "Manufacturing",
  "Agriculture",
  "Food & Beverage",
  "Technology",
  "Services",
  "Other",
];

export default function CommercePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Form state ── */
  const [applicationType, setApplicationType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [productsServices, setProductsServices] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [tradeInterest, setTradeInterest] = useState("");
  const [ventureProposal, setVentureProposal] = useState("");
  const [estimatedFunding, setEstimatedFunding] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Validation ── */
  function validate(): boolean {
    if (!applicationType) {
      setError("Please select an application type.");
      return false;
    }
    if (!businessName.trim()) {
      setError("Business or venture name is required.");
      return false;
    }
    if (!productsServices.trim()) {
      setError("Products or services offered is required.");
      return false;
    }
    if (!contactName.trim()) {
      setError("Contact name is required.");
      return false;
    }
    if (!contactEmail.trim()) {
      setError("Contact email is required.");
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

    const supabase = createClient();

    const { error: insertError } = await supabase
      .from("commerce_applications")
      .insert({
        application_type: applicationType,
        business_name: businessName,
        business_type: businessType || null,
        products_services: productsServices,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        trade_interest:
          applicationType === "Trade Network Registration"
            ? tradeInterest || null
            : null,
        venture_proposal:
          applicationType === "Cooperative Venture Proposal"
            ? ventureProposal || null
            : null,
        estimated_funding:
          applicationType === "Cooperative Venture Proposal"
            ? estimatedFunding || null
            : null,
        additional_notes: additionalNotes || null,
      });

    if (insertError) {
      setError(
        "There was an issue submitting your application. Please try again."
      );
      setLoading(false);
      return;
    }

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: contactName, email: contactEmail }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  /* ═══════════════════════════════════════════════════════
     Confirmation Screen
     ═══════════════════════════════════════════════════════ */
  if (submitted) {
    return (
      <>
        <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px w-16 bg-[var(--gold)] mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Application Submitted
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              Your commerce application has been received and is pending review.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-xl border border-[var(--gray-200)] bg-white p-8">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
                Thank You
              </h2>
              <p className="text-[var(--gray-500)] mb-2 leading-relaxed">
                Your{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {applicationType}
                </span>{" "}
                application for{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {businessName}
                </span>{" "}
                has been submitted to the Sultanate for review.
              </p>
              <p className="text-sm text-[var(--gray-500)] mb-8">
                You will receive a response at{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {contactEmail}
                </span>{" "}
                once a decision is made.
              </p>
              <Link
                href="/economics"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
              >
                Back to Economics
                <span aria-hidden="true">&rarr;</span>
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
            Commerce &amp; Trade
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Cooperative commercial ventures and trade networks that circulate
            wealth within the community under Sultanate custodianship.
          </p>
        </div>
      </section>

      {/* ── Info Section: Two Paths ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Two Paths Forward
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            How to Participate
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            The Sultanate of Amexem supports economic development through two
            primary pathways. Choose the one that best fits your enterprise or
            vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trade Network Registration */}
            <div className="group rounded-xl border border-[var(--gray-200)] bg-white p-6 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                Trade Network Registration
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Register your business to buy and sell within the community.
                Gain access to the Sultanate trade network, connect with fellow
                member-owned enterprises, and circulate wealth internally.
              </p>
            </div>

            {/* Cooperative Venture Proposal */}
            <div className="group rounded-xl border border-[var(--gray-200)] bg-white p-6 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                Cooperative Venture Proposal
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Propose a cooperative venture to be backed by the Sultanate.
                Present your business plan, outline the community benefit, and
                request institutional support for your enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Application
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            Commerce Application
          </h2>
          <p className="text-[var(--gray-500)] text-sm mb-8">
            Complete the form below to register your business or propose a
            cooperative venture. All applications are reviewed by the Sultanate
            administration.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Application Type */}
            <div>
              <label htmlFor="applicationType" className={labelClass}>
                Application Type *
              </label>
              <select
                id="applicationType"
                value={applicationType}
                onChange={(e) => setApplicationType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select application type...</option>
                <option value="Trade Network Registration">
                  Trade Network Registration
                </option>
                <option value="Cooperative Venture Proposal">
                  Cooperative Venture Proposal
                </option>
              </select>
            </div>

            {/* Business / Venture Name */}
            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business / Venture Name *
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Name of your business or proposed venture"
                className={inputClass}
              />
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className={labelClass}>
                Business Type
              </label>
              <select
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select business type...</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Products / Services */}
            <div>
              <label htmlFor="productsServices" className={labelClass}>
                Products / Services Offered *
              </label>
              <textarea
                id="productsServices"
                rows={3}
                value={productsServices}
                onChange={(e) => setProductsServices(e.target.value)}
                placeholder="Describe the products or services your business offers"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Contact Name */}
            <div>
              <label htmlFor="contactName" className={labelClass}>
                Contact Name *
              </label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full name of the primary contact"
                className={inputClass}
              />
            </div>

            {/* Contact Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactEmail" className={labelClass}>
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contactPhone" className={labelClass}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
            </div>

            {/* ── Conditional: Trade Network Registration ── */}
            {applicationType === "Trade Network Registration" && (
              <div>
                <label htmlFor="tradeInterest" className={labelClass}>
                  Trade Network Interest
                </label>
                <select
                  id="tradeInterest"
                  value={tradeInterest}
                  onChange={(e) => setTradeInterest(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select interest...</option>
                  <option value="Buying">Buying</option>
                  <option value="Selling">Selling</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            )}

            {/* ── Conditional: Cooperative Venture Proposal ── */}
            {applicationType === "Cooperative Venture Proposal" && (
              <>
                <div>
                  <label htmlFor="ventureProposal" className={labelClass}>
                    Venture Proposal Description
                  </label>
                  <textarea
                    id="ventureProposal"
                    rows={4}
                    value={ventureProposal}
                    onChange={(e) => setVentureProposal(e.target.value)}
                    placeholder="Describe your proposed cooperative venture, its goals, and how it benefits the community"
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div>
                  <label htmlFor="estimatedFunding" className={labelClass}>
                    Estimated Funding Needed
                  </label>
                  <input
                    type="text"
                    id="estimatedFunding"
                    value={estimatedFunding}
                    onChange={(e) => setEstimatedFunding(e.target.value)}
                    placeholder="e.g. $5,000 - $10,000"
                    className={inputClass}
                  />
                </div>
              </>
            )}

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
                placeholder="Anything else you would like to share"
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
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
