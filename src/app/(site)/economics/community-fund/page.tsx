import type { Metadata } from "next";
import Link from "next/link";
import TrackedSquareLink from "@/components/TrackedSquareLink";

export const metadata: Metadata = {
  title: "Uplifting Fund",
  description:
    "The Uplifting Fund — a collective pool of resources directed toward community priorities including infrastructure, education, and business grants within the Sultanate of Amexem.",
};

const priorityAreas = [
  {
    title: "Infrastructure",
    description:
      "Buildings, facilities, and equipment for Sultanate operations — the physical foundation that supports every initiative and institution we build.",
    icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4",
  },
  {
    title: "Education & Scholarships",
    description:
      "Educational programs, study materials, and scholarships for members — investing in knowledge and development that strengthens the entire community.",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-3-3l3 3 3-3M9 8v1m6-1v1",
  },
  {
    title: "Business Grants",
    description:
      "Startup grants for member-owned enterprises and cooperatives — seed capital that empowers our people to build economic institutions from within.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const steps = [
  {
    number: 1,
    title: "Contribute",
    description:
      "Anyone can contribute to the Uplifting Fund. Choose a contribution tier or give at any level — every amount strengthens the collective.",
  },
  {
    number: 2,
    title: "Allocate",
    description:
      "Leadership directs funds to priority areas based on community needs — infrastructure, education, and business development where impact is greatest.",
  },
  {
    number: 3,
    title: "Impact",
    description:
      "Funded projects report back to the community on outcomes. Transparency and accountability ensure every dollar advances the mission.",
  },
];

const FUND_LINK = "https://square.link/u/FOM5gkkH";

export default function CommunityFundPage() {
  return (
    <>
      {/* ── Dark Hero Header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            The Uplifting Fund
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            A collective pool of resources directed toward community priorities
            — infrastructure, education, and economic opportunity that benefits
            every member of the Sultanate of Amexem.
          </p>
        </div>
      </section>

      {/* ── Priority Areas (light) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Priority Areas
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Where the Fund Is Directed
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            The Uplifting Fund supports three critical areas of community
            development. Every contribution is directed toward priorities that
            build lasting infrastructure and opportunity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {priorityAreas.map((area) => (
              <div
                key={area.title}
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
                      d={area.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works (dark) ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              The Process
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            How It Works
          </h2>
          <p className="text-white/60 leading-relaxed max-w-3xl mx-auto text-center mb-12">
            The Uplifting Fund operates on a simple, transparent cycle —
            contributions flow in, leadership allocates based on community
            priorities, and funded projects report back on their impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-[var(--gold)] text-[var(--gold)] flex items-center justify-center mx-auto mb-5 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contribute (light) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Contribute
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Support the Uplifting Fund
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            Invest what you are able to. Every dollar goes directly toward
            community priorities — infrastructure, education, and economic
            empowerment. No amount is too small.
          </p>

          <div className="max-w-md mx-auto">
            <TrackedSquareLink
              href={FUND_LINK}
              label="Uplifting Fund"
              className="group block rounded-2xl border-2 border-[var(--gold)]/30 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-8 hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/10 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--dark-bg)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Contribute to the Uplifting Fund
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed mb-5">
                Give what you can — every contribution strengthens the
                collective. Your investment goes directly to infrastructure,
                education, and business development for the community.
              </p>
              <span className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg group-hover:bg-[var(--gold-light)] transition-colors">
                Invest Now
                <span aria-hidden="true">&rarr;</span>
              </span>
            </TrackedSquareLink>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA (dark) ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Every Contribution Advances the Mission
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              The Uplifting Fund is how we build together — pooling resources,
              directing them with purpose, and creating lasting impact for every
              member of the Sultanate.
            </p>
            <Link
              href="/economics"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--gold)]/30 text-[var(--gold)] font-semibold rounded-lg hover:bg-[var(--gold)]/10 transition-colors duration-300"
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
