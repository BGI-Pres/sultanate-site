"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-1 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Reach out to the Sultanate of Amexem with questions, inquiries,
            or to begin your membership journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                  Send a Message
                </span>
                <div className="h-px flex-1 bg-[var(--gold)]/20" />
              </div>

              {submitted ? (
                <div className="p-8 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-[var(--forest-green)] mb-2">
                    Message Received
                  </h3>
                  <p className="text-[var(--gray-700)]">
                    Thank you for reaching out. We will review your message and
                    respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--gray-700)] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--gray-700)] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[var(--gray-700)] mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent bg-white"
                    >
                      <option value="">Select a subject...</option>
                      <option value="citizenship">Membership Inquiry</option>
                      <option value="donation">Donation / Support</option>
                      <option value="merchandise">Merchandise Order</option>
                      <option value="government">Government / Legal</option>
                      <option value="media">Media / Press</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--gray-700)] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-xl hover:brightness-110 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div>
              {/* Section label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                  Other Ways to Reach Us
                </span>
                <div className="h-px flex-1 bg-[var(--gold)]/20" />
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--gray-900)] mb-1">Email</h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      Contact us via email for official correspondence and
                      inquiries. Response within 48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--gray-900)] mb-1">Office</h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      Visit or write to us at our official administrative
                      office. Contact us for current address details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--gray-900)] mb-1">Hours</h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      Administrative inquiries are processed Monday through
                      Friday. Urgent matters are addressed as they arise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[var(--gray-50)] rounded-xl border border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
                <h3 className="font-semibold text-[var(--gray-900)] mb-2">
                  Membership Applications
                </h3>
                <p className="text-sm text-[var(--gray-500)] mb-3">
                  Ready to apply? Select &quot;Membership Inquiry&quot; in the contact
                  form, or visit our membership page for more details.
                </p>
                <a
                  href="/citizenship"
                  className="text-sm text-[var(--gold)] font-medium hover:underline"
                >
                  View Membership Details &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
