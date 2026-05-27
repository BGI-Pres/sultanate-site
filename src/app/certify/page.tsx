"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

const TOTAL_STEPS = 5;

const stepLabels = [
  "Applicant & Member Verification",
  "Business Details",
  "Business Address",
  "Business Plan & Financials",
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

export default function CertifyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Step 1 — Applicant & Member Verification ── */
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [memberDuration, setMemberDuration] = useState("");

  /* ── Step 2 — Business Details ── */
  const [certType, setCertType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [ein, setEin] = useState("");
  const [industry, setIndustry] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");

  /* ── Step 3 — Business Address ── */
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  /* ── Step 4 — Business Plan & Financials ── */
  const [businessDescription, setBusinessDescription] = useState("");
  const [revenueRange, setRevenueRange] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [yearsOperating, setYearsOperating] = useState("");
  const [documentsDescription, setDocumentsDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* ── Step 5 — Review & Submit ── */
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  /* ── Validation ── */
  function validateStep(s: number): boolean {
    setError("");
    switch (s) {
      case 1:
        if (!applicantName.trim()) {
          setError("Full name is required.");
          return false;
        }
        if (!applicantEmail.trim()) {
          setError("Email address is required.");
          return false;
        }
        return true;
      case 2:
        if (!certType) {
          setError("Certification type is required.");
          return false;
        }
        if (!businessName.trim()) {
          setError("Business name is required.");
          return false;
        }
        return true;
      case 3:
        return true;
      case 4:
        if (!businessDescription.trim()) {
          setError("Business description is required.");
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
      setError(
        "You must certify that all information provided is accurate and complete.",
      );
      return;
    }
    if (!acknowledged) {
      setError(
        "You must acknowledge the certification review and fee terms.",
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
      .from("certifications")
      .insert({
        user_id: user?.id ?? null,
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        membership_id: membershipId || null,
        member_duration: memberDuration || null,
        certification_type: certType,
        business_name: businessName,
        business_type: businessType || null,
        ein: ein || null,
        industry: industry || null,
        business_phone: businessPhone || null,
        business_website: businessWebsite || null,
        street_address: streetAddress || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        business_description: businessDescription,
        revenue_range: revenueRange || null,
        employee_count: employeeCount || null,
        years_operating: yearsOperating || null,
        documents_description: documentsDescription || null,
        additional_notes: additionalNotes || null,
        terms_accepted: termsAccepted,
        fee_acknowledged: acknowledged,
      });

    if (insertError) {
      setError(
        "There was an issue submitting your certification application. Please try again.",
      );
      setLoading(false);
      return;
    }

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: applicantName,
        email: applicantEmail,
        surnamePref: `Business: ${businessName}`,
      }),
    });

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
          Certification Application Received
        </h1>
        <p className="text-[var(--gray-500)] mb-2 leading-relaxed">
          Your business certification application has been submitted to the
          Supreme Grand Council for review. You will be notified of your
          application status.
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-2">
          Estimated review time: 2--4 weeks
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-8">
          Upon approval, you will receive instructions to complete your $75
          certification purchase.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/economics"
            className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            View Economics &rarr;
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
          Business Certification Application
        </h1>
        <p className="text-sm text-[var(--gray-500)]">
          Sultanate of Amexem — Business Certification Program
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

        {/* ═══════════════ Step 1 — Applicant & Member Verification ═══════════════ */}
        {step === 1 && (
          <div className="space-y-5">
            <SectionLabel label="Applicant &amp; Member Verification" />

            <div>
              <label htmlFor="applicantName" className={labelClass}>
                Full Name *
              </label>
              <input
                type="text"
                id="applicantName"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Your full legal name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="applicantEmail" className={labelClass}>
                Email Address *
              </label>
              <input
                type="email"
                id="applicantEmail"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="membershipId" className={labelClass}>
                Membership ID
              </label>
              <input
                type="text"
                id="membershipId"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value)}
                placeholder="If you have one"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="memberDuration" className={labelClass}>
                How long have you been a member?
              </label>
              <select
                id="memberDuration"
                value={memberDuration}
                onChange={(e) => setMemberDuration(e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" onClick={goNext} className={continueBtn}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ Step 2 — Business Details ═══════════════ */}
        {step === 2 && (
          <div className="space-y-5">
            <SectionLabel label="Business Details" />

            <div>
              <label htmlFor="certType" className={labelClass}>
                Certification Type *
              </label>
              <select
                id="certType"
                required
                value={certType}
                onChange={(e) => setCertType(e.target.value)}
                className={selectClass}
              >
                <option value="">Select certification type...</option>
                <option value="Certify an existing business">
                  Certify an existing business
                </option>
                <option value="Form a new business (additional fees apply)">
                  Form a new business (additional fees apply)
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="businessName" className={labelClass}>
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Legal business name"
                className={inputClass}
              />
            </div>

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
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="LLC">LLC</option>
                <option value="Corporation">Corporation</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="ein" className={labelClass}>
                EIN (Employer Identification Number)
              </label>
              <input
                type="text"
                id="ein"
                value={ein}
                onChange={(e) => setEin(e.target.value)}
                placeholder="Optional"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="industry" className={labelClass}>
                Industry / Sector
              </label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Technology, Construction, Healthcare"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="businessPhone" className={labelClass}>
                  Business Phone
                </label>
                <input
                  type="tel"
                  id="businessPhone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="businessWebsite" className={labelClass}>
                  Business Website
                </label>
                <input
                  type="url"
                  id="businessWebsite"
                  value={businessWebsite}
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>
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

        {/* ═══════════════ Step 3 — Business Address ═══════════════ */}
        {step === 3 && (
          <div className="space-y-5">
            <SectionLabel label="Business Address" />

            <div>
              <label htmlFor="streetAddress" className={labelClass}>
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
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

        {/* ═══════════════ Step 4 — Business Plan & Financials ═══════════════ */}
        {step === 4 && (
          <div className="space-y-5">
            <SectionLabel label="Business Plan &amp; Financials" />

            <div>
              <label htmlFor="businessDescription" className={labelClass}>
                Brief description of the business and its operations *
              </label>
              <textarea
                id="businessDescription"
                required
                rows={4}
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Describe what your business does, products or services offered, and how it operates."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="revenueRange" className={labelClass}>
                Revenue Range
              </label>
              <select
                id="revenueRange"
                value={revenueRange}
                onChange={(e) => setRevenueRange(e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                <option value="Pre-revenue">Pre-revenue</option>
                <option value="Under $50K">Under $50K</option>
                <option value="$50K-$100K">$50K-$100K</option>
                <option value="$100K-$500K">$100K-$500K</option>
                <option value="$500K-$1M">$500K-$1M</option>
                <option value="$1M+">$1M+</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employeeCount" className={labelClass}>
                  Number of Employees
                </label>
                <select
                  id="employeeCount"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  <option value="Just me">Just me</option>
                  <option value="2-5">2-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-25">11-25</option>
                  <option value="26-50">26-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div>
                <label htmlFor="yearsOperating" className={labelClass}>
                  Years Operating
                </label>
                <select
                  id="yearsOperating"
                  value={yearsOperating}
                  onChange={(e) => setYearsOperating(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select...</option>
                  <option value="Not yet started">Not yet started</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="documentsDescription" className={labelClass}>
                Describe any documents you can provide
              </label>
              <textarea
                id="documentsDescription"
                rows={3}
                value={documentsDescription}
                onChange={(e) => setDocumentsDescription(e.target.value)}
                placeholder="Articles of incorporation, business license, tax returns, etc."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="additionalNotes" className={labelClass}>
                Additional Notes (optional)
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Anything else you would like the Council to know..."
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

        {/* ═══════════════ Step 5 — Review & Submit ═══════════════ */}
        {step === 5 && (
          <div className="space-y-5">
            <SectionLabel label="Review &amp; Submit" />

            {/* Summary card */}
            <div className="bg-[var(--gray-50)] rounded-xl p-5 space-y-5 text-sm">
              <SummarySection title="Applicant &amp; Member Verification">
                <SummaryRow label="Name" value={applicantName} />
                <SummaryRow label="Email" value={applicantEmail} />
                <SummaryRow label="Membership ID" value={membershipId} />
                <SummaryRow label="Member Duration" value={memberDuration} />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Business Details">
                <SummaryRow label="Certification Type" value={certType} />
                <SummaryRow label="Business Name" value={businessName} />
                <SummaryRow label="Business Type" value={businessType} />
                <SummaryRow label="EIN" value={ein} />
                <SummaryRow label="Industry / Sector" value={industry} />
                <SummaryRow label="Business Phone" value={businessPhone} />
                <SummaryRow label="Business Website" value={businessWebsite} />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Business Address">
                <SummaryRow
                  label="Address"
                  value={[streetAddress, city, state, zip]
                    .filter(Boolean)
                    .join(", ")}
                />
              </SummarySection>

              <div className="h-px bg-[var(--gray-200)]" />

              <SummarySection title="Business Plan &amp; Financials">
                <SummaryRow
                  label="Description"
                  value={businessDescription}
                />
                <SummaryRow label="Revenue Range" value={revenueRange} />
                <SummaryRow label="Employees" value={employeeCount} />
                <SummaryRow label="Years Operating" value={yearsOperating} />
                <SummaryRow label="Documents" value={documentsDescription} />
                <SummaryRow label="Additional Notes" value={additionalNotes} />
              </SummarySection>
            </div>

            {/* New Business callout */}
            {certType ===
              "Form a new business (additional fees apply)" && (
              <div className="border border-[var(--gold)]/30 rounded-xl p-5 bg-[var(--gold)]/5">
                <p className="text-sm text-[var(--gray-700)]">
                  <strong className="text-[var(--gold)]">
                    New Business Formation:
                  </strong>{" "}
                  New business formation includes additional consultation and
                  filing fees. You will be contacted after review.
                </p>
              </div>
            )}

            {/* Terms */}
            <div className="border border-[var(--gray-200)] rounded-xl p-5">
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-sm text-[var(--gray-700)]">
                  I certify that all information provided is accurate and
                  complete.
                </span>
              </label>
            </div>

            {/* Acknowledgment */}
            <div className="bg-[var(--dark-bg)] rounded-xl p-5 md:p-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                Certification Acknowledgment
              </h3>
              <label className={checkboxLabelClass}>
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]"
                />
                <span className="text-sm text-white/70">
                  I understand that business certification is subject to review
                  by the Supreme Grand Council and that the $75 certification
                  fee is collected separately upon approval.
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
                {loading ? "Submitting..." : "Submit Certification Application"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
