"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

const TOTAL_STEPS = 3;
const stepLabels = [
  "Member Verification",
  "Card Details & Photo",
  "Review & Submit",
];

const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const selectClass = `${inputClass} bg-white`;
const continueBtn =
  "px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors";
const backBtn =
  "px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors";

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

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--gray-500)] shrink-0">{label}</span>
      <span className="font-medium text-[var(--gray-900)] text-right">
        {value}
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

export default function MembershipCardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ── Step 1 — Member Verification ── */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [membershipTier, setMembershipTier] = useState("");

  /* ── Step 2 — Card Details & Photo ── */
  const [reason, setReason] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  /* ── Step 3 — Review ── */
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setEmail(data.user.email ?? "");
        setFullName(data.user.user_metadata?.full_name ?? "");
      }
      setAuthLoading(false);
    });
  }, []);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validateStep(s: number): boolean {
    setError("");
    switch (s) {
      case 1:
        if (!fullName.trim()) { setError("Full legal name is required."); return false; }
        if (!email.trim()) { setError("Email address is required."); return false; }
        if (!memberId.trim()) { setError("Member ID number is required."); return false; }
        if (!membershipTier) { setError("Membership tier is required."); return false; }
        return true;
      case 2:
        if (!reason) { setError("Reason for request is required."); return false; }
        if (!streetAddress.trim()) { setError("Mailing address is required."); return false; }
        if (!city.trim()) { setError("City is required."); return false; }
        if (!state.trim()) { setError("State is required."); return false; }
        if (!zip.trim()) { setError("ZIP code is required."); return false; }
        if (!photoFile) { setError("A headshot photo is required for your ID card."); return false; }
        return true;
      default:
        return true;
    }
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function goBack() { setError(""); setStep((s) => Math.max(s - 1, 1)); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!confirmed) {
      setError("You must confirm that all information is accurate.");
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();

    let photoUrl: string | null = null;
    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const filePath = `card-photos/${user?.id ?? "anon"}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("uploads")
        .upload(filePath, photoFile);
      if (!uploadErr) {
        const { data: urlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(filePath);
        photoUrl = urlData.publicUrl;
      }
    }

    const { error: insertError } = await supabase
      .from("card_requests")
      .insert({
        user_id: user?.id ?? null,
        full_name: fullName,
        email,
        member_id: memberId,
        membership_tier: membershipTier,
        reason,
        street_address: streetAddress,
        city,
        state,
        zip,
        photo_url: photoUrl,
      });

    if (insertError) {
      setError("There was an issue submitting your request. Please try again.");
      setLoading(false);
      return;
    }

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email,
        surnamePref: `Card Request: ${reason}`,
      }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  /* ── Auth gate ── */
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center px-4">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--dark-bg)] flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-3">
          Active Members Only
        </h1>
        <p className="text-[var(--gray-500)] mb-6">
          You must be signed in with an active member account to request a
          membership card.
        </p>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  /* ── Confirmation screen ── */
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center px-4">
        <Image
          src="/images/emblem.svg"
          alt="Sultanate of Amexem"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-[var(--gray-900)] mb-4">
          Card Request Submitted
        </h1>
        <p className="text-[var(--gray-500)] mb-8 max-w-md mx-auto leading-relaxed">
          Your membership card request has been received and is being reviewed.
          You will be contacted at <strong>{email}</strong> once your card is
          ready to ship.
        </p>
        <div className="bg-[var(--gold)]/5 border border-[var(--gold)]/20 rounded-xl p-6 mb-8 text-left max-w-sm mx-auto">
          <h3 className="font-semibold text-[var(--gray-900)] mb-3 text-center">
            What happens next?
          </h3>
          <ol className="space-y-2 text-sm text-[var(--gray-600)]">
            <li className="flex gap-2">
              <span className="font-bold text-[var(--gold)]">1.</span>
              Your membership status is verified
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[var(--gold)]">2.</span>
              Photo and details are reviewed
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[var(--gold)]">3.</span>
              Card is printed and mailed to your address
            </li>
          </ol>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href="/resources"
            className="px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors"
          >
            Back to Resources
          </Link>
          <Link
            href="/portal"
            className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            Member Portal
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <>
      <section className="bg-[var(--dark-bg)] py-10 md:py-16 border-b-2 border-[var(--gold)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Request Membership Card
          </h1>
          <p className="text-white/60 max-w-xl text-sm leading-relaxed">
            Request a new or replacement official membership identification
            card. A headshot photo is required.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {stepLabels.map((label, i) => (
                <div
                  key={label}
                  className={`text-xs font-medium transition-colors ${
                    i + 1 <= step
                      ? "text-[var(--gold)]"
                      : "text-[var(--gray-400)]"
                  } ${i > 0 ? "hidden sm:block" : ""}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-[var(--gray-200)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--gold)] rounded-full transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[var(--gray-400)] mt-2">
              Step {step} of {TOTAL_STEPS}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* ── Step 1: Member Verification ── */}
            {step === 1 && (
              <div className="space-y-6">
                <SectionLabel label="Member Verification" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="As it should appear on the card"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Member ID Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      placeholder="Your assigned member ID"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Membership Tier <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={selectClass}
                      value={membershipTier}
                      onChange={(e) => setMembershipTier(e.target.value)}
                    >
                      <option value="">Select tier</option>
                      <option value="Associate Member">Associate Member</option>
                      <option value="Full Member">Full Member</option>
                      <option value="Elder / Council Member">
                        Elder / Council Member
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Card Details & Photo ── */}
            {step === 2 && (
              <div className="space-y-6">
                <SectionLabel label="Card Details & Photo" />
                <div>
                  <label className={labelClass}>
                    Reason for Request <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={selectClass}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Select reason</option>
                    <option value="New Card">New Card</option>
                    <option value="Replacement (Lost/Damaged)">
                      Replacement (Lost/Damaged)
                    </option>
                    <option value="Update Information">
                      Update Information
                    </option>
                  </select>
                </div>

                <SectionLabel label="Mailing Address" />
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <SectionLabel label="Photo Upload" />
                <div>
                  <label className={labelClass}>
                    Headshot Photo <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-[var(--gray-400)] mb-3">
                    Upload a clear, front-facing headshot on a plain background.
                    This photo will appear on your membership card.
                  </p>
                  <div className="flex items-start gap-6">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-[var(--gray-300)] rounded-xl p-6 text-center hover:border-[var(--gold)] transition-colors">
                        <svg
                          className="w-8 h-8 mx-auto mb-2 text-[var(--gray-400)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <span className="text-sm text-[var(--gray-500)]">
                          {photoFile
                            ? photoFile.name
                            : "Click to upload photo"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    {photoPreview && (
                      <div className="w-24 h-28 rounded-lg overflow-hidden border border-[var(--gray-200)] shrink-0">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Review & Submit ── */}
            {step === 3 && (
              <div className="space-y-6">
                <SectionLabel label="Review Your Request" />
                <div className="bg-[var(--gray-50)] rounded-xl p-6 space-y-5 text-sm">
                  <SummarySection title="Member Information">
                    <SummaryRow label="Full Name" value={fullName} />
                    <SummaryRow label="Email" value={email} />
                    <SummaryRow label="Member ID" value={memberId} />
                    <SummaryRow label="Tier" value={membershipTier} />
                  </SummarySection>
                  <hr className="border-[var(--gray-200)]" />
                  <SummarySection title="Card Details">
                    <SummaryRow label="Reason" value={reason} />
                    <SummaryRow
                      label="Mailing Address"
                      value={`${streetAddress}, ${city}, ${state} ${zip}`}
                    />
                    <SummaryRow
                      label="Photo"
                      value={photoFile ? photoFile.name : "Not uploaded"}
                    />
                  </SummarySection>
                </div>

                {photoPreview && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-[var(--gray-200)]">
                      <img
                        src={photoPreview}
                        alt="Your photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-[var(--gray-500)]">
                      This photo will appear on your card
                    </span>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[var(--gray-300)] text-[var(--gold)] focus:ring-[var(--gold)]"
                  />
                  <span className="text-sm text-[var(--gray-700)]">
                    I confirm that all information provided is accurate and that
                    I am an active member of the Sultanate of Amexem in good
                    standing.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-[var(--gray-200)]">
              {step > 1 ? (
                <button type="button" className={backBtn} onClick={goBack}>
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < TOTAL_STEPS ? (
                <button type="button" className={continueBtn} onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`${continueBtn} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
