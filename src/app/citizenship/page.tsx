import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Citizenship",
  description:
    "Apply for citizenship in the Sultanate of Amexem. Learn about membership tiers, benefits, and the application process.",
};

export default function CitizenshipPage() {
  return (
    <>
      <section className="bg-[var(--gray-50)] py-16 border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--gray-900)] mb-4">
            Citizenship
          </h1>
          <p className="text-lg text-[var(--gray-500)] max-w-3xl">
            Become a citizen of the Sultanate of Amexem and join a community
            dedicated to sovereignty, heritage, and mutual advancement.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-8">
            Membership Tiers
          </h2>

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
                accent: "var(--gray-700)",
              },
              {
                name: "Full Citizen",
                description:
                  "Full citizenship in the Sultanate of Amexem with all rights, privileges, and responsibilities of nationhood.",
                features: [
                  "Official citizenship documents",
                  "Voting rights",
                  "Full event access",
                  "Community support network",
                  "Governance participation",
                ],
                accent: "var(--forest-green)",
                featured: true,
              },
              {
                name: "Diplomatic Member",
                description:
                  "For representatives, ambassadors, and those serving the Sultanate in official or diplomatic capacities.",
                features: [
                  "All citizen benefits",
                  "Diplomatic credentials",
                  "International representation",
                  "Advisory council access",
                  "Priority communications",
                ],
                accent: "var(--cherry-red)",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`p-8 rounded-lg border ${
                  tier.featured
                    ? "border-[var(--forest-green)] ring-2 ring-[var(--forest-green)]/20"
                    : "border-[var(--gray-200)]"
                } relative`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-6 bg-[var(--forest-green)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: tier.accent }}
                >
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
                        className="w-4 h-4 shrink-0"
                        style={{ color: tier.accent }}
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
                      ? "bg-[var(--forest-green)] text-white hover:bg-[var(--forest-green-dark)]"
                      : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                  }`}
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
            Application Process
          </h2>
          <div className="max-w-3xl">
            <ol className="space-y-6">
              {[
                {
                  step: "Submit Application",
                  description:
                    "Contact us to request a citizenship application form. Provide your basic information and statement of intent.",
                },
                {
                  step: "Review Period",
                  description:
                    "Your application will be reviewed by the administrative office. This typically takes 2-4 weeks.",
                },
                {
                  step: "Orientation",
                  description:
                    "Approved applicants participate in an orientation session to learn about the rights, responsibilities, and traditions of citizenship.",
                },
                {
                  step: "Citizenship Granted",
                  description:
                    "Upon completion, you receive your official citizenship documents and membership credentials.",
                },
              ].map((item, i) => (
                <li key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--cherry-red)] text-white flex items-center justify-center text-sm font-bold shrink-0">
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
    </>
  );
}
