import type { Metadata } from "next";
import Link from "next/link";
import PaymentMethods from "@/components/PaymentMethods";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support the Sultanate of Amexem through donations and gifts, or browse official merchandise.",
};

export default function GiftingPage() {
  return (
    <>
      {/* Dark Hero Header */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-1 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Support the mission of the Sultanate through contributions and gifts,
            or browse our official merchandise collection.
          </p>
        </div>
      </section>

      {/* Donations Section */}
      <section className="py-16 border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Donations &amp; Contributions
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <p className="text-[var(--gray-500)] max-w-3xl mb-8 leading-relaxed">
            Your gifts and donations directly support the operations,
            programs, and mission of the Sultanate of Amexem. Every
            contribution helps us preserve heritage, serve members, and
            advance our governing objectives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                amount: "$25",
                label: "Supporter",
                description: "Help fund community programs and educational resources.",
              },
              {
                amount: "$50",
                label: "Patron",
                description: "Support cultural preservation projects and events.",
              },
              {
                amount: "$100",
                label: "Benefactor",
                description: "Fund governance operations and institutional development initiatives.",
              },
            ].map((tier) => (
              <div
                key={tier.label}
                className="p-6 border border-[var(--gray-200)] rounded-xl text-center hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-[var(--gold)] mb-1">
                  {tier.amount}
                </p>
                <p className="font-semibold text-[var(--gray-900)] mb-2">
                  {tier.label}
                </p>
                <p className="text-sm text-[var(--gray-500)] mb-4">
                  {tier.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2 text-sm bg-[var(--cherry-red)] text-white rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
                >
                  Give Now
                </Link>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4 mb-4 mt-10">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Send Your Gift
            </h3>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <PaymentMethods />

          <div className="bg-[var(--dark-surface)] border border-[var(--gold)]/20 rounded-xl p-6 mt-8">
            <p className="text-sm text-white/70">
              <strong className="text-[var(--gold)]">Custom Amount:</strong>{" "}
              To make a custom gift or discuss larger contributions, please{" "}
              <Link href="/contact" className="text-[var(--cherry-red)] hover:underline">
                contact us directly
              </Link>
              . All gifts are received with gratitude and used in service of the
              nation.
            </p>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Official Merchandise
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <p className="text-[var(--gray-500)] max-w-3xl mb-8 leading-relaxed">
            Show your pride and support with official Sultanate of Amexem
            merchandise. Proceeds support the Sultanate's operations and programs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Official Flag",
                price: "$35",
                description: "High-quality printed flag of the Sultanate of Amexem.",
              },
              {
                name: "Heritage T-Shirt",
                price: "$28",
                description: "Premium cotton tee with the Sultanate emblem.",
              },
              {
                name: "Heritage Pin",
                price: "$12",
                description: "Enamel lapel pin featuring the official insignia.",
              },
              {
                name: "Document Folio",
                price: "$45",
                description: "Leather-bound folio for official membership documents.",
              },
              {
                name: "Membership Card",
                price: "$20",
                description: "Official laminated membership identification card with your name and tier.",
              },
              {
                name: "Business Certification",
                price: "$75",
                description: "Official Sultanate business certification for enterprises operating under the custodianship.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="border border-[var(--gray-200)] rounded-xl overflow-hidden hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <div className="aspect-square bg-[var(--dark-surface)] flex items-center justify-center">
                  <span className="text-white/30 text-sm">
                    Image Coming Soon
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[var(--gray-500)] mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--gold)]">
                      {item.price}
                    </span>
                    <Link
                      href="/contact"
                      className="text-sm text-[var(--cherry-red)] hover:underline"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <EmailCapture
              variant="card"
              heading="Stay Updated"
              description="Get notified about new merchandise, events, and ways to support the Sultanate."
            />
          </div>
        </div>
      </section>
    </>
  );
}
