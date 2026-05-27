import Link from "next/link";
import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";

export default function HomePage() {
  return (
    <>
      {/* Hero — animated dark sovereign */}
      <section className="relative bg-[var(--dark-bg)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--forest-green) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--cherry-red) 0%, transparent 50%)`,
          }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-[var(--gold)]" />
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
                  Custodian of the Nation of Moab
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Sultanate of{" "}
                <span className="gold-shimmer">Amexem</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
                Preserving heritage, upholding sovereignty, and building community
                for future generations. Join us in honoring the legacy and advancing
                the mission of our nation.
              </p>
              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up animate-delay-2">
                <Link
                  href="/citizenship"
                  className="px-7 py-3.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors gold-glow"
                >
                  Apply for Citizenship
                </Link>
                <Link
                  href="/gifting"
                  className="px-7 py-3.5 border border-[var(--gold)]/40 text-[var(--gold)] font-semibold rounded-md hover:bg-[var(--gold)]/10 transition-colors"
                >
                  Support the Mission
                </Link>
              </div>
              <div className="animate-fade-in-up animate-delay-3">
                <p className="text-sm text-gray-400 mb-2">
                  Join our mailing list for official communications:
                </p>
                <EmailCapture variant="inline" />
              </div>
            </div>

            <div className="animate-fade-in animate-delay-2 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[var(--gold)]/5 blur-2xl" />
                <Image
                  src="/images/emblem.svg"
                  alt="Sultanate of Amexem Emblem"
                  width={280}
                  height={280}
                  className="relative drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--cherry-red)] via-[var(--gold)] to-[var(--forest-green)]" />
      </section>

      {/* Mission Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">Our Foundation</span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              Our Mission
            </h2>
            <p className="text-[var(--gray-500)] max-w-2xl mx-auto text-lg">
              The Sultanate of Amexem stands as Custodian of the Nation of Moab,
              dedicated to the preservation and advancement of our people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Heritage",
                description: "Preserving and honoring the rich cultural legacy and history of the Nation of Moab for current and future generations.",
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                delay: "animate-delay-1",
              },
              {
                title: "Sovereignty",
                description: "Upholding and exercising the sovereign rights of our nation through governance, law, and international recognition.",
                icon: "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10",
                delay: "animate-delay-2",
              },
              {
                title: "Community",
                description: "Building a strong, unified community through citizenship, education, and mutual support among our members.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                delay: "animate-delay-3",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="group p-8 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pillar.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[var(--gray-500)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="relative bg-[var(--dark-bg)] text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[var(--cherry-red)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--cherry-red)]">Join the Nation</span>
            <div className="h-px w-12 bg-[var(--cherry-red)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Citizen of the Sultanate
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Join the growing community of citizens committed to the mission and
            vision of the Sultanate of Amexem, Custodian of the Nation of Moab.
          </p>
          <Link
            href="/citizenship"
            className="inline-block px-8 py-3.5 bg-[var(--cherry-red)] text-white font-semibold rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
          >
            Apply for Citizenship
          </Link>
        </div>
      </section>

      {/* Email Capture Banner */}
      <EmailCapture
        variant="banner"
        heading="Official Communications"
        description="Subscribe to receive news, proclamations, and updates from the Sultanate of Amexem."
      />

      {/* Quick Links */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/government"
              className="group p-8 bg-white rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--forest-green)] transition-colors">
                Government &amp; Constitution &rarr;
              </h3>
              <p className="text-[var(--gray-500)]">
                Learn about our governance structure, constitutional framework,
                and the principles that guide our nation.
              </p>
            </Link>
            <Link
              href="/gifting"
              className="group p-8 bg-white rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--cherry-red)] transition-colors">
                Support Our Mission &rarr;
              </h3>
              <p className="text-[var(--gray-500)]">
                Contribute through donations and support, or browse our collection
                of official merchandise.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
