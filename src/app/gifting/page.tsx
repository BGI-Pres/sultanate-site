import type { Metadata } from "next";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support the Sultanate of Amexem — contribute to the mission.",
};

const gifts = [
  {
    amount: "$25",
    label: "Supporter",
    description: "Fund community programs and educational resources.",
    href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/H5HGNBPL2C3VCSRA5WJ42LZ6",
  },
  {
    amount: "$50",
    label: "Patron",
    description: "Support cultural preservation projects and events.",
    href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/FJ6ZWSY7G5AYDTOXTT3IRJHZ",
  },
  {
    amount: "$100",
    label: "Benefactor",
    description: "Fund governance operations and institutional development.",
    href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/IPOOO4SCKENFLM362F73WPVJ",
  },
];

export default function GiftingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-1 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support the Sultanate
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Every contribution advances the mission. Give directly to fund
            community programs, cultural preservation, and institutional
            development.
          </p>
        </div>
      </section>

      {/* Gift Tiers */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Contribute
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gifts.map((tier) => (
              <a
                key={tier.label}
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300 text-center"
              >
                <p className="text-4xl font-bold text-[var(--gold)] mb-1 group-hover:scale-105 transition-transform duration-300">
                  {tier.amount}
                </p>
                <p className="font-semibold text-[var(--gray-900)] mb-2">
                  {tier.label}
                </p>
                <p className="text-sm text-[var(--gray-500)] mb-5">
                  {tier.description}
                </p>
                <span className="inline-block px-6 py-2.5 text-sm bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg group-hover:bg-[var(--gold-light)] transition-colors">
                  Give Now
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <EmailCapture
              variant="card"
              heading="Stay Updated"
              description="Get notified about new literature, events, and ways to support the Sultanate."
            />
          </div>
        </div>
      </section>
    </>
  );
}
