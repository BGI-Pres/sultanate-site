"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

export default function FooterEmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("subscribers").insert({ email, source: "footer" });
      trackEvent("newsletter_signup", { location: "footer" });
      setSubmitted(true);
      setEmail("");
    } catch {
      trackEvent("newsletter_signup", { location: "footer" });
      setSubmitted(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[var(--dark-bg)] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="h-px w-12 bg-[var(--gold)] mt-3 shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
            Stay Informed
          </p>
          <p className="text-sm text-gray-400 mt-1 max-w-md">
            Dispatches on membership, events, and the work of the nation.
          </p>
        </div>
      </div>
      {submitted ? (
        <p className="text-sm text-[var(--gold)] font-medium md:text-right">
          Thank you. You&apos;re on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:max-w-md"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            className="flex-1 sm:w-64 px-4 py-2.5 rounded-md text-sm bg-white/5 border border-[var(--gold)]/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 focus:border-[var(--gold)]/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] text-sm font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
