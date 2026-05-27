import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, documents, and resources from the Sultanate of Amexem — everything members and prospective members need to engage with the nation.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Resources
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Guides, documents, and essential information for members and
            prospective members of the Sultanate of Amexem. Everything you need
            to engage with the nation, all in one place.
          </p>
        </div>
      </section>

      {/* ── Documents & Guides ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Documents &amp; Guides
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Official Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/documents/constitution.pdf"
              className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Constitution
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                The founding document of the Sultanate of Amexem. Read the full
                constitution in PDF format.
              </p>
            </Link>

            <div className="rounded-xl border border-[var(--gray-200)] bg-white p-6 opacity-75">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                Executive Guide
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed mb-3">
                A comprehensive guide to the executive structure and governance
                of the Sultanate.
              </p>
              <span className="inline-block text-xs font-medium text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-1 rounded-full">
                Coming Soon
              </span>
            </div>

            <Link
              href="/citizenship"
              className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Membership Information
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Learn about membership tiers, requirements, and the process for
                joining the Sultanate of Amexem.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Literature & Sacred Texts ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Literature &amp; Sacred Texts
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Sacred Texts &amp; Literature
          </h2>
          <p className="text-white/50 mb-10 text-sm">
            Essential reading and foundational documents of the Sultanate of Amexem.
          </p>

          {/* Featured: Document Folio */}
          <a
            href="https://square.link/u/EEtwpqbd"
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
                    Document Folio
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider bg-[var(--gold)]/20 text-[var(--gold)] px-2 py-0.5 rounded-full font-semibold">
                    Complete Set
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Sealed collection — Holy Koran, Divine Constitution and Bylaws, Moorish Questionnaire, and Pin.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-2xl font-bold text-[var(--gold)]">$75</span>
                <span className="px-5 py-2 bg-[var(--gold)] text-[var(--dark-bg)] text-sm font-semibold rounded-lg group-hover:bg-[var(--gold-light)] transition-colors">
                  Purchase
                </span>
              </div>
            </div>
          </a>

          {/* Individual Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Holy Koran", price: "$30", description: "The sacred text — foundational to our spiritual heritage and practice.", href: "https://square.link/u/ehzD4oSH" },
              { title: "Divine Constitution and Bylaws", price: "$10", description: "The governing principles and bylaws of the Moorish American people.", href: "https://square.link/u/ItybNxU0" },
              { title: "Moorish Questionnaire", price: "$15", description: "Essential study material for prospective and current members.", href: "https://square.link/u/aPsLCmvk" },
              { title: "The Last Crown Prince: The Hidden Truth", price: "$50", description: "A comprehensive work uncovering the hidden history and legacy of our people.", href: "https://square.link/u/I6lsh47m" },
              { title: "The Fulfillment of Prophecy: Volume 1", price: "$20", description: "The first volume examining the prophetic foundations and their fulfillment in our time.", href: "https://square.link/u/3t9SgyQp" },
            ].map((book) => (
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

      {/* ── Official Credentials ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Official Credentials
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Credentials &amp; Identification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Moorish Pin", price: "$15", description: "Official pin representing your standing and identity.", href: "https://square.link/u/rPfSwh6U" },
              { name: "Membership Card", price: "$20", description: "Official laminated identification card with your name and tier.", href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/ZSBH2MH4VRP7OB3NQ5LQHMPZ", restriction: "Approved members only" },
              { name: "Business Certification", price: "$75", description: "Official business certification for enterprises operating under the custodianship.", href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/KAFT73NFETT66RBDDKLQFJWG", restriction: "Current members only" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-[var(--gray-200)] bg-white hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
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

      {/* ── For Prospective Members ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              For Prospective Members
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Start Your Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/portal/apply"
              className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Apply for Membership
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Begin your application to join the Sultanate of Amexem. The
                process starts with a formal application through our portal.
              </p>
            </Link>

            <Link
              href="/citizenship"
              className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Membership Information
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Learn about membership tiers, benefits, and what it means to be
                part of the Sultanate of Amexem.
              </p>
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-[var(--gray-200)] bg-white p-6 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] mb-4">
                <svg
                  className="w-6 h-6 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                Contact Us
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                Have questions about joining? Reach out through our official
                contact page for guidance.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── For Current Members ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              For Current Members
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-10">
            Member Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/portal"
              className="rounded-xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                Member Portal
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Access your membership dashboard, profile, and account settings.
              </p>
            </Link>

            <Link
              href="/portal/documents"
              className="rounded-xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                Documents
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                View and download your official documents and credentials.
              </p>
            </Link>

            <Link
              href="/portal/resources"
              className="rounded-xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                Portal Resources
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Access member-exclusive resources, guides, and materials.
              </p>
            </Link>

            <Link
              href="/press"
              className="rounded-xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-[var(--gold)] transition-colors">
                Press &amp; Updates
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Stay informed with the latest news and official statements.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
