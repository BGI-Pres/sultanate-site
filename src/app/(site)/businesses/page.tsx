import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Directory — Sultanate-Certified Enterprises",
  description:
    "Discover Sultanate-certified Moorish American businesses operating within the trade network of the Sultanate of Amexem — a directory dedicated to cooperative economics and collective enterprise.",
  alternates: { canonical: "/businesses" },
};

const categories = [
  "Retail & Commerce",
  "Food & Beverage",
  "Professional Services",
  "Technology",
  "Construction & Trades",
  "Media & Publishing",
];

const howItWorks = [
  {
    title: "Apply for Certification",
    body: "Members submit a certification application through our intake portal to begin the review process.",
    href: "/certify",
    linkLabel: "Begin Application",
  },
  {
    title: "Review by Council",
    body: "Each application is reviewed by the Supreme Grand Council to ensure alignment with the standards of the trade network.",
  },
  {
    title: "Listed Publicly",
    body: "Approved enterprises are added to this directory and appear publicly as Sultanate-certified businesses.",
  },
];

export default function BusinessesPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Sultanate-Certified Businesses
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The trade network of Moorish American enterprises operating under
            the custodianship of the Sultanate of Amexem.
          </p>
        </div>
      </section>

      {/* ── How the Directory Works ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              How the Directory Works
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10 max-w-3xl">
            From Application to Public Listing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <div
                key={step.title}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6 flex flex-col"
              >
                <div className="text-xs font-semibold text-[var(--gold)] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--gray-700)] leading-relaxed flex-1">
                  {step.body}
                </p>
                {step.href && (
                  <Link
                    href={step.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold)] hover:underline"
                  >
                    {step.linkLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Categories ── */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Featured Categories
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10 max-w-3xl">
            The Sectors of the Trade Network
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6"
              >
                <h3 className="text-base font-bold text-[var(--gray-900)] mb-2">
                  {category}
                </h3>
                <p className="text-xs text-[var(--gray-500)] uppercase tracking-[0.15em]">
                  Listings forthcoming
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon Notice ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-xl border border-[var(--gray-200)] bg-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Now Building
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-4">
              The First Certified Businesses Are Being Onboarded
            </h2>
            <p className="text-[var(--gray-700)] leading-relaxed mb-8">
              We are reviewing the first wave of certification applications.
              Approved businesses will appear here as they are added to the
              trade network. Apply for your business certification today.
            </p>
            <Link
              href="/certify"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Apply for Certification
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Build Your Business Within the Sultanate
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Cooperative commerce is the foundation of self-determination.
              Bring your enterprise into the trade network and contribute to
              the economic infrastructure of the Sultanate of Amexem.
            </p>
            <Link
              href="/economics/commerce"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Explore Commerce
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
