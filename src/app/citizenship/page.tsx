"use client";

import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Affiliate",
    price: "Free",
    priceNote: null,
    description:
      "Support the mission. Attend meetings and community events — no card, no dues.",
    benefits: [
      "Virtual & physical meeting access",
      "Community event attendance",
      "Public educational content & study groups",
      "On-site news & press updates",
    ],
    requirements: ["Open to all — no application required"],
    rankUp: {
      target: "Community",
      steps: [
        "Attend meetings consistently for at least 3 months",
        "Complete orientation study: Holy Koran, Divine Constitution & Bylaws, and Moorish Questionnaire",
        "Apply for Community membership",
      ],
    },
    cta: "Join as Affiliate",
    featured: false,
  },
  {
    name: "Community",
    price: "$50",
    priceNote: "per month",
    description:
      "A recognized member of the Sultanate. Required to attend meetings, pay monthly dues, and participate in community affairs.",
    benefits: [
      "All Affiliate benefits",
      "Official membership card (purchase required)",
      "Newsletter via mail & SMS",
      "Member-only resources & study materials",
      "Voting rights in community decisions",
      "Required meeting attendance",
      "Involvement in community affairs",
    ],
    requirements: [
      "3 months consistent meeting attendance as Affiliate",
      "Completed orientation study (sacred texts & Constitution)",
      "Approved by leadership",
    ],
    rankUp: {
      target: "General",
      steps: [
        "Active Community member for a minimum period",
        "Demonstrated involvement in community affairs",
        "Complete leadership training",
        "Organize a local chapter/temple body",
        "Pay $100 charter registration fee",
      ],
    },
    cta: "Apply Now",
    featured: true,
  },
  {
    name: "General",
    price: "$50",
    priceNote: "per month + $100 charter registration",
    description:
      "Part of the Grand Body — the chartered chapter-leadership tier of the Sultanate.",
    benefits: [
      "All Community benefits",
      "Organize & lead a local chapter/temple",
      "Chapter leadership authority",
      "Expanded resources & incentive programs",
      "Local representation & member recruiting",
      "Leadership development & mentorship access",
    ],
    requirements: [
      "Active Community member with demonstrated involvement",
      "Leadership training completed",
      "Organized a local chapter/temple body",
    ],
    rankUp: {
      target: "Lead",
      steps: [
        "Maintain an active chapter with regular attendance",
        "Secure a physical location for your body",
        "Receive leadership approval",
        "Pay $100 charter registration fee",
      ],
    },
    cta: "Apply Now",
    featured: false,
  },
  {
    name: "Lead",
    price: "$50",
    priceNote: "per month + $100 charter registration",
    description:
      "Senior operational leadership — established bodies with regional reach and advisory access.",
    benefits: [
      "All General benefits",
      "Established body with a physical location",
      "Lead meetings & mentor members",
      "Regional operational decision-making",
      "Priority communications & direct advisory access",
    ],
    requirements: [
      "Active chapter as General member",
      "Physical location established for your body",
      "Leadership approval",
    ],
    rankUp: null,
    cta: "Apply Now",
    featured: false,
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-[var(--gold)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function TierCard({
  tier,
}: {
  tier: (typeof tiers)[number];
}) {
  const [showReqs, setShowReqs] = useState(false);
  const [showRankUp, setShowRankUp] = useState(false);

  return (
    <div
      className={`p-6 rounded-xl border transition-all duration-300 relative flex flex-col ${
        tier.featured
          ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/20 hover:shadow-lg hover:shadow-[var(--gold)]/5"
          : "border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 bg-[var(--gold)] text-[var(--dark-bg)] text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold mb-1 text-[var(--gray-900)]">
        {tier.name}
      </h3>
      <div className="mb-3">
        <span className="text-2xl font-bold text-[var(--gold)]">
          {tier.price}
        </span>
        {tier.priceNote && (
          <span className="text-xs text-[var(--gray-400)] ml-1">
            {tier.priceNote}
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--gray-500)] mb-5 leading-relaxed">
        {tier.description}
      </p>

      {/* Benefits */}
      <ul className="space-y-2 mb-5 flex-1">
        {tier.benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-[var(--gray-700)]"
          >
            <svg
              className="w-4 h-4 shrink-0 text-[var(--gold)] mt-0.5"
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
            {b}
          </li>
        ))}
      </ul>

      {/* Expandable: Requirements */}
      <button
        type="button"
        onClick={() => setShowReqs((v) => !v)}
        className="flex items-center justify-between w-full py-2 text-left border-t border-[var(--gray-200)]"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">
          Requirements
        </span>
        <ChevronIcon open={showReqs} />
      </button>
      {showReqs && (
        <ul className="space-y-1.5 pb-3 pl-1">
          {tier.requirements.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 text-xs text-[var(--gray-600)]"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      )}

      {/* Expandable: Rank Up */}
      {tier.rankUp && (
        <>
          <button
            type="button"
            onClick={() => setShowRankUp((v) => !v)}
            className="flex items-center justify-between w-full py-2 text-left border-t border-[var(--gray-200)]"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-500)]">
              Rank up to {tier.rankUp.target}
            </span>
            <ChevronIcon open={showRankUp} />
          </button>
          {showRankUp && (
            <ol className="space-y-1.5 pb-3 pl-1">
              {tier.rankUp.steps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-xs text-[var(--gray-600)]"
                >
                  <span className="font-bold text-[var(--gold)] shrink-0">
                    {i + 1}.
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          )}
        </>
      )}

      <Link
        href="/apply"
        className={`block text-center py-2.5 mt-3 rounded-md text-sm font-semibold transition-colors ${
          tier.featured
            ? "bg-[var(--gold)] text-[var(--dark-bg)] hover:bg-[var(--gold-light)]"
            : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

export default function CitizenshipPage() {
  return (
    <>
      {/* Dark Hero Header */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-1 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Membership
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Become a member of the Sultanate of Amexem and join a community
            dedicated to self-determination, heritage, and mutual advancement.
            Each tier is earned through the work you put in.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Membership Tiers
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>

          {/* Progression Path */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Your Path Forward
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 flex-wrap">
              {tiers.map((tier, i) => (
                <div key={tier.name} className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      i === 0
                        ? "bg-[var(--gray-100)] text-[var(--gray-700)]"
                        : "bg-[var(--gold)]/10 text-[var(--gold)]"
                    }`}
                  >
                    {tier.name}
                  </div>
                  {i < tiers.length - 1 && (
                    <svg
                      className="w-5 h-5 text-[var(--gold)]/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--gray-500)] mt-4 leading-relaxed">
              Every member starts at Affiliate and earns their way up. Each rank
              is achieved through consistent participation, study, and service to
              the community. Click <strong>Requirements</strong> and{" "}
              <strong>Rank up</strong> on any tier card above to see what it
              takes.
            </p>
          </div>

          {/* Application Process */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Application Process
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <div className="max-w-3xl">
            <ol className="space-y-6">
              {[
                {
                  step: "Join as Affiliate",
                  description:
                    "Start attending virtual or physical meetings and community events. No application needed — just show up and get involved.",
                },
                {
                  step: "Study & Orientation",
                  description:
                    "After 3 months of consistent attendance, complete the orientation study covering the Holy Koran, Divine Constitution & Bylaws, and the Moorish Questionnaire.",
                },
                {
                  step: "Apply for Community",
                  description:
                    "Submit your membership application for review. Upon leadership approval, begin paying monthly dues and receive your official standing.",
                },
                {
                  step: "Advance Through Service",
                  description:
                    "Earn your way to General and Lead through consistent participation, leadership training, and organizing bodies within the Sultanate.",
                },
              ].map((item, i) => (
                <li key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                      {item.step}
                    </h3>
                    <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-[var(--gold)] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Start as an Affiliate — no cost, no commitment. Show up, get
            involved, and earn your place in the Sultanate of Amexem.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
