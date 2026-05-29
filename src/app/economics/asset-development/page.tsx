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
const btnClass =
  "px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors";

/* ── Asset categories ── */
const assetCategories = [
  {
    title: "Real Estate",
    description:
      "Land, buildings, and property acquisitions for community use and investment.",
    icon: "M2.25 21h19.5M3.75 3v18h16.5V3H3.75zm3 3.75h3v3h-3v-3zm0 6h3v3h-3v-3zm6-6h3v3h-3v-3zm0 6h3v3h-3v-3z",
  },
  {
    title: "Intellectual Property",
    description:
      "Trademarks, copyrights, patents, and proprietary works owned by the Sultanate.",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
  },
  {
    title: "Commercial Holdings",
    description:
      "Ownership stakes in businesses, cooperatives, and commercial enterprises.",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  },
];

/* ── Strategy principles ── */
const principles = [
  {
    title: "Collective Ownership",
    description:
      "Assets are held by the Sultanate for the benefit of all members.",
  },
  {
    title: "Strategic Growth",
    description:
      "Every acquisition must serve the long-term economic mission.",
  },
  {
    title: "Community Return",
    description:
      "All asset income is reinvested into community programs and infrastructure.",
  },
];

/* ── Inquiry type options ── */
const inquiryTypes = [
  "General Inquiry",
  "Property/Real Estate",
  "Intellectual Property",
  "Commercial Investment",
  "Partnership Proposal",
];

export default function AssetDevelopmentPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Form fields ── */
  const [inquiryType, setInquiryType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Validation & Submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !inquiryType ||
      !name.trim() ||
      !email.trim() ||
      !description.trim()
    ) {
      setError("Please complete all required fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: insertError } = await supabase
        .from("asset_inquiries")
        .insert({
          inquiry_type: inquiryType,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          organization: organization.trim() || null,
          description: description.trim(),
          additional_notes: additionalNotes.trim() || null,
        });

      if (insertError) {
        setError(
          "There was an issue submitting your inquiry. Please try again.",
        );
        setLoading(false);
        return;
      }

      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      trackEvent("asset_inquiry_submitted", { inquiry_type: inquiryType });

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
        <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px w-16 bg-[var(--gold)] mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Inquiry Submitted
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              Your asset development inquiry has been received and is pending
              review.
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
                Thank You
              </h2>
              <p className="text-[var(--gray-500)] leading-relaxed mb-2">
                Your{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {inquiryType}
                </span>{" "}
                inquiry has been submitted to the Sultanate for review.
              </p>
              <p className="text-sm text-[var(--gray-500)] mb-8">
                You will receive a response at{" "}
                <span className="font-medium text-[var(--gray-700)]">
                  {email}
                </span>{" "}
                once our team has reviewed your inquiry.
              </p>
              <Link
                href="/economics"
                className={`${btnClass} inline-flex items-center gap-2`}
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
            Asset Development
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Strategic acquisition and development of assets that build
            generational wealth for the community — real estate, intellectual
            property, and commercial holdings held under Sultanate custodianship.
          </p>
        </div>
      </section>

      {/* ── Asset Categories (light) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Asset Categories
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Building Collective Wealth
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            The Sultanate acquires and develops assets across three primary
            categories — each chosen for its capacity to generate lasting value
            and serve the long-term interests of the membership.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assetCategories.map((item) => (
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

      {/* ── Strategy (dark) ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Our Approach
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Asset Development Strategy
          </h2>
          <p className="text-white/60 leading-relaxed max-w-3xl mx-auto text-center mb-12">
            Assets are acquired and developed collectively — not by any single
            member, but by the body as a whole. Every asset held by the Sultanate
            serves the membership and strengthens our collective economic
            position.
          </p>

          <div className="max-w-2xl mx-auto space-y-8">
            {principles.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)] text-[var(--dark-bg)] flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form (light) ── */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Inquiries
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            Asset Development Inquiry
          </h2>
          <p className="text-[var(--gray-600)] text-[15px] leading-relaxed mb-10">
            Interested in asset development opportunities with the Sultanate?
            Complete the form below to submit your inquiry. All inquiries are
            reviewed by the Sultanate administration.
          </p>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inquiry Type */}
            <div>
              <label className={labelClass}>
                Inquiry Type <span className="text-red-500">*</span>
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select inquiry type</option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className={labelClass}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                Phone{" "}
                <span className="text-[var(--gray-400)] text-xs">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="(555) 555-5555"
              />
            </div>

            {/* Organization / Affiliation */}
            <div>
              <label className={labelClass}>
                Organization / Affiliation{" "}
                <span className="text-[var(--gray-400)] text-xs">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className={inputClass}
                placeholder="Your organization or affiliation"
              />
            </div>

            {/* Description of Inquiry */}
            <div>
              <label className={labelClass}>
                Description of Inquiry <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
                rows={5}
                placeholder="Describe what you are interested in or proposing"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className={labelClass}>
                Additional Notes{" "}
                <span className="text-[var(--gray-400)] text-xs">
                  (optional)
                </span>
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="Anything else you would like us to know"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`${btnClass} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
