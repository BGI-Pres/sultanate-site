"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

/* ── Shared style constants ── */
const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;
const btnClass =
  "px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors";

export default function ProfessionalServicesPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Form fields ── */
  const [applicationType, setApplicationType] = useState("");
  const [providerName, setProviderName] = useState("");
  const [profession, setProfession] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Validation & Submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    /* Required field validation */
    if (
      !applicationType ||
      !providerName.trim() ||
      !profession.trim() ||
      !servicesOffered.trim() ||
      !yearsExperience.trim() ||
      !serviceArea.trim() ||
      !contactName.trim() ||
      !contactEmail.trim()
    ) {
      setError("Please complete all required fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: insertError } = await supabase
        .from("service_applications")
        .insert({
          application_type: applicationType,
          provider_name: providerName,
          profession,
          services_offered: servicesOffered,
          years_experience: yearsExperience,
          certifications: certifications || null,
          service_area: serviceArea,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone || null,
          website_url: websiteUrl || null,
          additional_notes: additionalNotes || null,
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
        body: JSON.stringify({ name: contactName, email: contactEmail }),
      });

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
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-[var(--gold)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
          Application Received
        </h2>
        <p className="text-[var(--gray-600)] leading-relaxed mb-8 max-w-md mx-auto">
          Thank you for submitting your professional services application. Our
          team will review your information and follow up at the contact email
          you provided.
        </p>
        <Link
          href="/economics"
          className={btnClass}
        >
          Back to Economics
        </Link>
      </div>
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
            Professional Services
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Skilled professionals within the membership offering services that
            strengthen the community and generate cooperative economic returns.
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
            Whether you are a seasoned practitioner or just beginning to offer
            your skills professionally, the Sultanate provides two paths for
            connecting your services with the community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Provider Directory Listing */}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                Provider Directory Listing
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                List your services so community members can find you. Your
                profile will appear in the Sultanate&apos;s professional services
                directory, making it easy for members to locate and engage your
                expertise.
              </p>
            </div>

            {/* Official Endorsement */}
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                Official Endorsement
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Apply for the Sultanate&apos;s formal endorsement of your
                practice. Endorsed providers carry the institutional backing and
                recognition of the Sultanate of Amexem — a mark of trust and
                quality for the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Application
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            Submit Your Application
          </h2>
          <p className="text-[var(--gray-600)] text-[15px] leading-relaxed mb-10">
            Complete the form below to apply for a directory listing, official
            endorsement, or both. All applications are reviewed by the Sultanate
            administration.
          </p>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Application Type */}
            <div>
              <label className={labelClass}>
                Application Type <span className="text-red-500">*</span>
              </label>
              <select
                value={applicationType}
                onChange={(e) => setApplicationType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select application type</option>
                <option value="Directory Listing">Directory Listing</option>
                <option value="Official Endorsement">
                  Official Endorsement
                </option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Provider / Business Name */}
            <div>
              <label className={labelClass}>
                Provider / Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                className={inputClass}
                placeholder="Your business or provider name"
              />
            </div>

            {/* Profession or Trade */}
            <div>
              <label className={labelClass}>
                Profession or Trade <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className={inputClass}
                placeholder="e.g. Attorney, Electrician, Tax Preparer"
              />
            </div>

            {/* Services Offered */}
            <div>
              <label className={labelClass}>
                Services Offered <span className="text-red-500">*</span>
              </label>
              <textarea
                value={servicesOffered}
                onChange={(e) => setServicesOffered(e.target.value)}
                className={inputClass}
                rows={4}
                placeholder="Describe the services you provide"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label className={labelClass}>
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className={inputClass}
                placeholder="e.g. 5"
              />
            </div>

            {/* Certifications or Licenses */}
            <div>
              <label className={labelClass}>
                Certifications or Licenses{" "}
                <span className="text-[var(--gray-400)] text-xs">(optional)</span>
              </label>
              <textarea
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="List any relevant certifications or licenses"
              />
            </div>

            {/* Service Area / Location */}
            <div>
              <label className={labelClass}>
                Service Area / Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                className={inputClass}
                placeholder="e.g. Atlanta, GA or Nationwide"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className={labelClass}>
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={inputClass}
                placeholder="Full name of primary contact"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className={labelClass}>
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className={labelClass}>
                Contact Phone{" "}
                <span className="text-[var(--gray-400)] text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className={inputClass}
                placeholder="(555) 555-5555"
              />
            </div>

            {/* Website or Portfolio URL */}
            <div>
              <label className={labelClass}>
                Website or Portfolio URL{" "}
                <span className="text-[var(--gray-400)] text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className={inputClass}
                placeholder="https://yoursite.com"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className={labelClass}>
                Additional Notes{" "}
                <span className="text-[var(--gray-400)] text-xs">(optional)</span>
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
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
