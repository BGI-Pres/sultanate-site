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
                description: "Fund governance operations and institutional development initiatives.",
                href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/IPOOO4SCKENFLM362F73WPVJ",
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
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 text-sm bg-[var(--cherry-red)] text-white rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
                >
                  Give Now
                </a>
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
              Official Materials &amp; Documents
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <p className="text-[var(--gray-500)] max-w-3xl mb-8 leading-relaxed">
            Official materials, literature, and items from the Sultanate of
            Amexem. Proceeds support the Sultanate&apos;s operations and programs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Document Folio",
                price: "$75",
                description: "Sealed copies of the Holy Koran, Divine Constitution and Bylaws, Moorish Questionnaire, and Pin.",
                href: "https://square.link/u/EEtwpqbd",
              },
              {
                name: "Holy Koran",
                price: "$30",
                description: "The sacred text — foundational to our spiritual heritage and practice.",
                href: "https://square.link/u/ehzD4oSH",
              },
              {
                name: "Divine Constitution and Bylaws",
                price: "$10",
                description: "The governing principles and bylaws of the Moorish American people.",
                href: "https://square.link/u/ItybNxU0",
              },
              {
                name: "Moorish Questionnaire",
                price: "$15",
                description: "Essential study material for prospective and current members.",
                href: "https://square.link/u/aPsLCmvk",
              },
              {
                name: "Moorish Pin",
                price: "$15",
                description: "Official pin representing your standing and identity.",
                href: "https://square.link/u/rPfSwh6U",
              },
              {
                name: "Membership Card",
                price: "$20",
                description: "Official laminated membership identification card with your name and tier.",
                href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/ZSBH2MH4VRP7OB3NQ5LQHMPZ",
                restriction: "Available to approved members only",
              },
              {
                name: "Business Certification",
                price: "$75",
                description: "Official Sultanate business certification for enterprises operating under the custodianship.",
                href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/KAFT73NFETT66RBDDKLQFJWG",
                restriction: "Available to current members only",
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
                  {"restriction" in item && item.restriction && (
                    <p className="text-xs text-[var(--cherry-red)] mb-2 font-medium">
                      {item.restriction}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--gold)]">
                      {item.price}
                    </span>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--cherry-red)] hover:underline font-medium"
                      >
                        Purchase
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        className="text-sm text-[var(--cherry-red)] hover:underline"
                      >
                        Inquire
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Literature */}
      <section className="py-16 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Literature
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <p className="text-white/60 max-w-3xl mb-8 leading-relaxed">
            Essential reading from the leadership of the Sultanate of Amexem.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "The Last Crown Prince: The Hidden Truth",
                price: "$50",
                description: "A comprehensive work uncovering the hidden history and legacy of our people.",
                href: "https://square.link/u/I6lsh47m",
              },
              {
                title: "The Fulfillment of Prophecy: Volume 1",
                price: "$20",
                description: "The first volume examining the prophetic foundations and their fulfillment in our time.",
                href: "https://square.link/u/3t9SgyQp",
              },
            ].map((book) => (
              <a
                key={book.title}
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 p-5 md:p-6 rounded-xl border border-[var(--gold)]/20 hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <div className="w-20 h-28 rounded-lg bg-[var(--dark-surface)] border border-[var(--gold)]/10 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-[var(--gold)]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-[var(--gold)] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-3 leading-relaxed">
                    {book.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[var(--gold)]">{book.price}</span>
                    <span className="text-xs text-[var(--cherry-red)] font-medium">
                      Purchase &rarr;
                    </span>
                  </div>
                </div>
              </a>
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
