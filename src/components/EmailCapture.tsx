"use client";

import { useState, type FormEvent } from "react";

interface EmailCaptureProps {
  variant?: "inline" | "banner" | "card";
  heading?: string;
  description?: string;
}

export default function EmailCapture({
  variant = "inline",
  heading = "Stay Connected",
  description = "Get updates on citizenship, events, and news from the Sultanate of Amexem.",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  if (variant === "banner") {
    return (
      <section className="bg-[var(--forest-green)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">{heading}</h3>
              <p className="text-green-100 text-sm">{description}</p>
            </div>
            {submitted ? (
              <p className="text-green-100 font-medium">
                Thank you! You&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2.5 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-white/50 w-full md:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[var(--cherry-red)] text-white text-sm font-semibold rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "card") {
    return (
      <div className="p-8 bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg">
        <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
          {heading}
        </h3>
        <p className="text-sm text-[var(--gray-500)] mb-4">{description}</p>
        {submitted ? (
          <p className="text-sm text-[var(--forest-green)] font-medium">
            Thank you! You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-[var(--gray-300)] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[var(--forest-green)] text-white text-sm font-semibold rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
            >
              Join
            </button>
          </form>
        )}
      </div>
    );
  }

  // inline variant
  return submitted ? (
    <p className="text-sm text-green-200 font-medium">
      Thank you! You&apos;re on the list.
    </p>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2.5 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-[var(--cherry-red)] text-white text-sm font-semibold rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
