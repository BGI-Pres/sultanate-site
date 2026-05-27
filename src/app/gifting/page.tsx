import type { Metadata } from "next";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support the Sultanate of Amexem — contribute, purchase official literature, and obtain credentials.",
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

const literature = [
  {
    title: "Document Folio",
    price: "$75",
    description: "Sealed collection — Holy Koran, Divine Constitution and Bylaws, Moorish Questionnaire, and Pin.",
    href: "https://square.link/u/EEtwpqbd",
    featured: true,
  },
  {
    title: "Holy Koran",
    price: "$30",
    description: "The sacred text — foundational to our spiritual heritage and practice.",
    href: "https://square.link/u/ehzD4oSH",
  },
  {
    title: "Divine Constitution and Bylaws",
    price: "$10",
    description: "The governing principles and bylaws of the Moorish American people.",
    href: "https://square.link/u/ItybNxU0",
  },
  {
    title: "Moorish Questionnaire",
    price: "$15",
    description: "Essential study material for prospective and current members.",
    href: "https://square.link/u/aPsLCmvk",
  },
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
];

const credentials = [
  {
    name: "Moorish Pin",
    price: "$15",
    description: "Official pin representing your standing and identity.",
    href: "https://square.link/u/rPfSwh6U",
  },
  {
    name: "Membership Card",
    price: "$20",
    description: "Official laminated identification card with your name and tier.",
    href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/ZSBH2MH4VRP7OB3NQ5LQHMPZ",
    restriction: "Approved members only",
  },
  {
    name: "Business Certification",
    price: "$75",
    description: "Official business certification for enterprises operating under the custodianship.",
    href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/KAFT73NFETT66RBDDKLQFJWG",
    restriction: "Current members only",
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
            Every contribution advances the mission. Give directly, acquire
            official literature and documents, or obtain your credentials.
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

          <p className="text-center text-sm text-[var(--gray-500)] mt-6">
            CashApp:{" "}
            <a
              href="https://cash.app/$unitedroyalmonarchs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:underline font-medium"
            >
              $unitedroyalmonarchs
            </a>
            {" "}&bull;{" "}Zelle and other methods available via{" "}
            <a href="/contact" className="text-[var(--gold)] hover:underline font-medium">
              contact
            </a>
          </p>
        </div>
      </section>

      {/* Literature */}
      <section className="py-12 md:py-16 bg-[var(--dark-bg)]">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Literature &amp; Sacred Texts
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>
          <p className="text-white/50 mb-8 text-sm">
            Essential reading and foundational documents of the Sultanate of Amexem.
          </p>

          {/* Featured: Document Folio */}
          <a
            href={literature[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block mb-6 p-5 md:p-8 rounded-2xl border-2 border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/5 to-transparent hover:border-[var(--gold)] transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="w-16 h-16 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors">
                    {literature[0].title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-0.5 rounded-full font-semibold">
                    Complete Set
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {literature[0].description}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-2xl font-bold text-[var(--gold)]">{literature[0].price}</span>
                <span className="px-5 py-2 bg-[var(--gold)] text-[var(--dark-bg)] text-sm font-semibold rounded-lg group-hover:bg-[var(--gold-light)] transition-colors">
                  Purchase
                </span>
              </div>
            </div>
          </a>

          {/* Individual Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {literature.slice(1).map((book) => (
              <a
                key={book.title}
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-xl border border-[var(--gold)]/15 hover:border-[var(--gold)]/50 transition-all duration-300"
              >
                <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-white/40 mb-3 leading-relaxed">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--gold)]">{book.price}</span>
                  <span className="text-xs text-[var(--gold)]/60 group-hover:text-[var(--gold)] transition-colors">
                    Purchase &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[var(--gold)]" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Official Credentials
            </h2>
            <div className="flex-1 h-px bg-[var(--gold)]/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {credentials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-[var(--gold)]">{item.price}</span>
                </div>
                <h3 className="font-semibold text-[var(--gray-900)] mb-1 group-hover:text-[var(--gold-dark)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-[var(--gray-500)] mb-3 leading-relaxed">
                  {item.description}
                </p>
                {item.restriction && (
                  <span className="inline-block text-[11px] text-[var(--cherry-red)] bg-red-50 px-2.5 py-1 rounded-full font-medium">
                    {item.restriction}
                  </span>
                )}
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
