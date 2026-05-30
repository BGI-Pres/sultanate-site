import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Economics — Cooperative Commerce & Institutional Development",
  description:
    "Learn about cooperative economics at the Sultanate of Amexem — trade networks, business certification, the Uplifting Fund, and Bey Group International ventures.",
  alternates: { canonical: "/economics" },
};

const enterprises = [
  {
    title: "Commerce & Trade",
    description:
      "Cooperative commercial ventures that circulate wealth within the community and establish trade networks under Sultanate custodianship.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    href: "/economics/commerce",
  },
  {
    title: "Institutional Ventures",
    description:
      "Enterprises born from the membership itself — institutions of real power that serve the collective and build lasting economic infrastructure.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    href: "/economics/ventures",
  },
  {
    title: "Professional Services",
    description:
      "Skilled professionals within the membership offering services that strengthen the community and generate cooperative economic returns.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    href: "/economics/services",
  },
];

const frameworks = [
  {
    title: "Uplifting Fund",
    description:
      "A collective pool of resources directed toward community priorities — infrastructure, education, and business grants that benefit all members.",
    href: "/economics/community-fund",
  },
  {
    title: "Cooperative Ventures",
    description:
      "Joint economic enterprises owned and operated by the membership. Shared risk, shared reward, shared purpose.",
    href: "/economics/cooperative-ventures",
  },
  {
    title: "Asset Development",
    description:
      "Strategic acquisition and development of assets — real estate, intellectual property, and commercial holdings — that build generational wealth.",
    href: "/economics/asset-development",
  },
];

const certBenefits = [
  {
    title: "Official Recognition",
    description:
      "Your enterprise is formally recognized as operating under the custodianship of the Sultanate of Amexem.",
  },
  {
    title: "Network Access",
    description:
      "Connect with certified businesses across the membership — preferred partnerships, cooperative referrals, and collective purchasing power.",
  },
  {
    title: "Institutional Backing",
    description:
      "Operate with the institutional authority of the Sultanate behind your enterprise — credibility, structure, and collective support.",
  },
];

export default function EconomicsPage() {
  return (
    <>
      {/* ── Dark Hero Header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Economics
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The economic infrastructure of the Sultanate of Amexem — collective
            commerce, institutional development, and ventures born from within
            our own membership.
          </p>
        </div>
      </section>

      {/* ── Member-Born Enterprises (light) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Institutional Development
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Enterprises Born From the Membership
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            Bey Group International was born from the membership of the
            Sultanate — proof that when our people organize around shared
            economic purpose, institutions of real power emerge. The Sultanate
            does not wait for outside investment or external validation. We build
            from within.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enterprises.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-6 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5"
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
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--gray-500)] leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="text-xs font-semibold text-[var(--gold)]">
                  Learn more &amp; apply &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collective Investment (dark) ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Collective Economics
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Cooperative Wealth From Within
          </h2>
          <p className="text-white/60 leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Economic security is the engine that powers every objective. The
            Sultanate builds cooperative wealth from within — collective
            investment frameworks that ensure our economic power is retained,
            grown, and directed by our own people.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {frameworks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-[var(--gold)]/15 bg-white/[0.02] p-6 hover:border-[var(--gold)]/40 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[var(--gold)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="text-xs font-semibold text-[var(--gold)]">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Economics Newsletter */}
          <div className="max-w-md mx-auto">
            <EmailCapture
              variant="card"
              heading="Economics Newsletter"
              description="Investment opportunities, cooperative ventures, and institutional development updates."
            />
          </div>
        </div>
      </section>

      {/* ── Business Certification Program (light) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Business Certification
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            Sultanate Business Certification
          </h2>
          <p className="text-[var(--gray-700)] leading-relaxed max-w-3xl mb-10 text-[15px]">
            Members of the Sultanate can obtain official business certification
            for enterprises operating under the custodianship. Certified
            businesses carry the formal recognition of the Sultanate of Amexem —
            institutional backing, network access, and the authority of a
            governing body behind every venture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {certBenefits.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5"
              >
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/certify"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Apply for Certification
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA (dark) ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Participate in the Economic Mission
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Economic security is not optional — it is the engine of every
              collective objective. Apply for membership and take your place in
              the economic infrastructure of the Sultanate, or support the
              mission directly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
              >
                Apply for Membership
              </Link>
              <Link
                href="/gifting"
                className="px-8 py-3 border border-[var(--gold)]/30 text-[var(--gold)] font-semibold rounded-lg hover:bg-[var(--gold)]/10 transition-colors duration-300"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
