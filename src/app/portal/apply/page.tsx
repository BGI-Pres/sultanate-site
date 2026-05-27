"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [employer, setEmployer] = useState("");
  const [occupation, setOccupation] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [surnamePref, setSurnamePref] = useState("");
  const [statement, setStatement] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!acknowledged) {
      setError("You must acknowledge the Constitution and Bylaws to proceed.");
      return;
    }
    if (!termsAccepted) {
      setError("You must agree to the terms of membership to proceed.");
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("applications").insert({
      user_id: user?.id,
      full_name: fullName,
      date_of_birth: dob || null,
      address,
      city,
      state,
      zip,
      phone,
      email: email || user?.email,
      employer,
      occupation,
      business_name: businessName || null,
      surname_preference: surnamePref || null,
      statement_of_intent: statement,
      how_heard: howHeard,
      constitution_acknowledged: acknowledged,
    });

    if (insertError) {
      setError("There was an issue submitting your application. Please try again.");
      setLoading(false);
      return;
    }

    // Fire-and-forget notification to admin emails
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email: email || user?.email, surnamePref }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <Image src="/images/emblem.svg" alt="Sultanate of Amexem" width={80} height={80} className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-3">Application Received</h1>
        <p className="text-[var(--gray-500)] mb-2 leading-relaxed">
          Your membership application has been submitted to the Supreme Grand
          Council for review. You will be notified of your application status.
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-2">
          Estimated review time: 2–4 weeks
        </p>
        <p className="text-sm text-[var(--gray-500)] mb-8">
          You will receive confirmation at <span className="font-medium text-[var(--gray-700)]">{email}</span> when a decision is made.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link href="/auth/signup" className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
            Create a portal account
          </Link>
          <Link href="/portal" className="text-sm text-[var(--gold)] font-medium hover:underline">
            Return to Dashboard &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent";
  const labelClass = "block text-sm font-medium text-[var(--gray-700)] mb-1.5";

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
          Membership Application
        </h1>
        <p className="text-sm text-[var(--gray-500)]">
          Sultanate of Amexem — Custodian of the Nation of Moab
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= s ? "bg-[var(--dark-bg)] text-[var(--gold)]" : "bg-[var(--gray-200)] text-[var(--gray-500)]"
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-px transition-colors ${step > s ? "bg-[var(--gold)]" : "bg-[var(--gray-200)]"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Personal Information</span>
              <div className="flex-1 h-px bg-[var(--gold)]/20" />
            </div>

            <div>
              <label htmlFor="fullName" className={labelClass}>Full Legal Name *</label>
              <input type="text" id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="As it will appear on official documents" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className={labelClass}>Date of Birth</label>
                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(000) 000-0000" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address *</label>
              <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="address" className={labelClass}>Street Address</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State</label>
                <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="zip" className={labelClass}>ZIP</label>
                <input type="text" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" onClick={() => { if (fullName && email) setStep(2); }} className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Employment & Intent */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Employment &amp; Intent</span>
              <div className="flex-1 h-px bg-[var(--gold)]/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="occupation" className={labelClass}>Occupation</label>
                <input type="text" id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="employer" className={labelClass}>Employer</label>
                <input type="text" id="employer" value={employer} onChange={(e) => setEmployer(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="businessName" className={labelClass}>Business Name (if applicable)</label>
              <input type="text" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="surnamePref" className={labelClass}>Surname Preference</label>
              <select id="surnamePref" value={surnamePref} onChange={(e) => setSurnamePref(e.target.value)} className={`${inputClass} bg-white`}>
                <option value="">Select preference...</option>
                <option value="Bey">Bey</option>
                <option value="El">El</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="statement" className={labelClass}>Statement of Intent *</label>
              <textarea id="statement" required rows={4} value={statement} onChange={(e) => setStatement(e.target.value)} placeholder="Why do you wish to join the Sultanate of Amexem?" className={`${inputClass} resize-y`} />
            </div>
            <div>
              <label htmlFor="howHeard" className={labelClass}>How did you hear about the Sultanate?</label>
              <input type="text" id="howHeard" value={howHeard} onChange={(e) => setHowHeard(e.target.value)} className={inputClass} />
            </div>

            <div className="pt-4 flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors">
                Back
              </button>
              <button type="button" onClick={() => { if (statement) setStep(3); }} className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Acknowledgment & Submit */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Review &amp; Submit</span>
              <div className="flex-1 h-px bg-[var(--gold)]/20" />
            </div>

            {/* Summary */}
            <div className="bg-[var(--gray-50)] rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[var(--gray-500)]">Name</span><span className="font-medium text-[var(--gray-900)]">{fullName}</span></div>
              <div className="flex justify-between"><span className="text-[var(--gray-500)]">Email</span><span className="font-medium text-[var(--gray-900)]">{email}</span></div>
              {occupation && <div className="flex justify-between"><span className="text-[var(--gray-500)]">Occupation</span><span className="font-medium text-[var(--gray-900)]">{occupation}</span></div>}
              {surnamePref && <div className="flex justify-between"><span className="text-[var(--gray-500)]">Surname</span><span className="font-medium text-[var(--gray-900)]">{surnamePref}</span></div>}
            </div>

            {/* Constitutional Acknowledgment */}
            <div className="bg-[var(--dark-bg)] rounded-xl p-5 md:p-6">
              <h3 className="text-sm font-semibold text-white mb-3">Constitutional Acknowledgment</h3>
              <p className="text-xs text-white/50 leading-relaxed mb-4">
                By submitting this application, I affirm that I have read and
                accept the Constitution and Bylaws of the Sultanate of Amexem. I
                agree to uphold the principles of Love, Truth, Peace, Freedom,
                and Justice, to conduct myself lawfully and honorably, and to
                contribute to the support and advancement of the Sultanate and
                its members.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
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
              <button type="button" onClick={() => setStep(2)} className="px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors">
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !acknowledged}
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
