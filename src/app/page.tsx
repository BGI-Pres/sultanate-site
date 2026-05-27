import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--forest-green)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-green-200 mb-4">
              Custodian of the Nation of Moab
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Sultanate of Amexem
            </h1>
            <p className="text-lg md:text-xl text-green-100 leading-relaxed mb-8">
              Preserving heritage, upholding sovereignty, and building community
              for future generations. Join us in honoring the legacy and advancing
              the mission of our nation.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/citizenship"
                className="px-6 py-3 bg-white text-[var(--forest-green)] font-semibold rounded-md hover:bg-green-50 transition-colors"
              >
                Apply for Citizenship
              </Link>
              <Link
                href="/gifting"
                className="px-6 py-3 bg-[var(--cherry-red)] text-white font-semibold rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
              >
                Support the Mission
              </Link>
            </div>
            <div>
              <p className="text-sm text-green-200 mb-2">
                Join our mailing list for updates:
              </p>
              <EmailCapture variant="inline" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--cherry-red)]" />
      </section>

      {/* Mission Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--gray-900)] mb-4">
              Our Mission
            </h2>
            <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
              The Sultanate of Amexem stands as Custodian of the Nation of Moab,
              dedicated to the preservation and advancement of our people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-[var(--gray-200)] hover:border-[var(--forest-green)] transition-colors">
              <div className="w-14 h-14 rounded-lg bg-green-50 text-[var(--forest-green)] flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-3">Heritage</h3>
              <p className="text-[var(--gray-500)] leading-relaxed">
                Preserving and honoring the rich cultural legacy and history of the
                Nation of Moab for current and future generations.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-[var(--gray-200)] hover:border-[var(--forest-green)] transition-colors">
              <div className="w-14 h-14 rounded-lg bg-green-50 text-[var(--forest-green)] flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-3">Sovereignty</h3>
              <p className="text-[var(--gray-500)] leading-relaxed">
                Upholding and exercising the sovereign rights of our nation through
                governance, law, and international recognition.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-[var(--gray-200)] hover:border-[var(--forest-green)] transition-colors">
              <div className="w-14 h-14 rounded-lg bg-green-50 text-[var(--forest-green)] flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-3">Community</h3>
              <p className="text-[var(--gray-500)] leading-relaxed">
                Building a strong, unified community through citizenship, education,
                and mutual support among our members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--cherry-red)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Become a Citizen of the Sultanate
          </h2>
          <p className="text-red-100 max-w-2xl mx-auto mb-8">
            Join the growing community of citizens committed to the mission and
            vision of the Sultanate of Amexem.
          </p>
          <Link
            href="/citizenship"
            className="inline-block px-8 py-3 bg-white text-[var(--cherry-red)] font-semibold rounded-md hover:bg-red-50 transition-colors"
          >
            Apply for Citizenship
          </Link>
        </div>
      </section>

      {/* Email Capture Banner */}
      <EmailCapture
        variant="banner"
        heading="Don't Miss a Thing"
        description="Subscribe to receive news, event invitations, and updates from the Sultanate."
      />

      {/* Quick Links */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/government"
              className="group p-8 bg-white rounded-lg border border-[var(--gray-200)] hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--forest-green)] transition-colors">
                Government &amp; Constitution &rarr;
              </h3>
              <p className="text-[var(--gray-500)]">
                Learn about our governance structure, constitutional framework,
                and the principles that guide our nation.
              </p>
            </Link>
            <Link
              href="/gifting"
              className="group p-8 bg-white rounded-lg border border-[var(--gray-200)] hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2 group-hover:text-[var(--cherry-red)] transition-colors">
                Support Our Mission &rarr;
              </h3>
              <p className="text-[var(--gray-500)]">
                Contribute through gifting and donations, or browse our collection
                of official merchandise.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
