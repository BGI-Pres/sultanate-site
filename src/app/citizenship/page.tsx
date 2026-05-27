import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Apply for membership in the Sultanate of Amexem. Learn about membership tiers, benefits, and the application process.",
};

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
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Membership Tiers
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Associate Member",
                description:
                  "For those beginning their journey with the Sultanate. Gain access to community events, newsletters, and educational resources.",
                features: [
                  "Community newsletter",
                  "Public event access",
                  "Educational resources",
                  "Digital membership card",
                ],
                featured: false,
              },
              {
                name: "Full Member",
                description:
                  "Full membership in the Sultanate of Amexem with all rights, privileges, and responsibilities of nationhood.",
                features: [
                  "Official membership documents",
                  "Voting rights",
                  "Full event access",
                  "Community support network",
                  "Governance participation",
                ],
                featured: true,
              },
              {
                name: "Diplomatic Member",
                description:
                  "For representatives, ambassadors, and those serving the Sultanate in official or diplomatic capacities.",
                features: [
                  "All member benefits",
                  "Diplomatic credentials",
                  "International representation",
                  "Advisory council access",
                  "Priority communications",
                ],
                featured: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`p-8 rounded-xl border transition-all duration-300 relative ${
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
                <h3 className="text-xl font-semibold mb-2 text-[var(--gray-900)]">
                  {tier.name}
                </h3>
                <p className="text-sm text-[var(--gray-500)] mb-6 leading-relaxed">
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[var(--gray-700)]"
                    >
                      <svg
                        className="w-4 h-4 shrink-0 text-[var(--gold)]"
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    tier.featured
                      ? "bg-[var(--gold)] text-[var(--dark-bg)] hover:bg-[var(--gold-light)]"
                      : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                  }`}
                >
                  Apply Now
                </Link>
              </div>
            ))}
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
                  step: "Submit Application",
                  description:
                    "Contact us to request a membership application form. Provide your basic information and statement of intent.",
                },
                {
                  step: "Review Period",
                  description:
                    "Your application will be reviewed by the administrative office. This typically takes 2-4 weeks.",
                },
                {
                  step: "Orientation",
                  description:
                    "Approved applicants participate in an orientation session to learn about the rights, responsibilities, and traditions of membership.",
                },
                {
                  step: "Membership Granted",
                  description:
                    "Upon completion, you receive your official membership documents and membership credentials.",
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
      <section className="bg-[var(--dark-bg)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-1 bg-[var(--gold)] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Take the first step toward membership in the Sultanate of Amexem.
            Reach out to learn more about the process and find the tier that fits
            your path.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors"
          >
            Contact Us to Apply
          </Link>
        </div>
      </section>
    </>
  );
}
