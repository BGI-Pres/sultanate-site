import Link from "next/link";
import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
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
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 max-w-xl">
                Sovereignty. Collective Economics. Cultural Identity.
              </p>
              <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-xl">
                The Sultanate of Amexem provides its citizens with legal standing,
                economic opportunity, and a community rooted in heritage. Your
                nationality, your network, your nation.
              </p>
              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up animate-delay-2">
                <Link
                  href="/citizenship"
                  className="px-7 py-3.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors gold-glow"
                >
                  Apply for Citizenship
                </Link>
                <Link
                  href="#guide"
                  className="px-7 py-3.5 border border-[var(--gold)]/40 text-[var(--gold)] font-semibold rounded-md hover:bg-[var(--gold)]/10 transition-colors"
                >
                  Download Free Guide
                </Link>
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

      {/* Value Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">What You Gain</span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              Three Pillars of Citizenship
            </h2>
            <p className="text-[var(--gray-500)] max-w-2xl mx-auto text-lg">
              Citizenship in the Sultanate is not symbolic. It is a tangible
              framework of rights, resources, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5">
              <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                Sovereign Standing
              </h3>
              <p className="text-[var(--gray-500)] leading-relaxed mb-4">
                Official nationality documentation, constitutional protections,
                and recognized legal standing under the custodianship of the
                Sultanate of Amexem.
              </p>
              <ul className="space-y-2 text-sm text-[var(--gray-500)]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Citizenship certificates</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Constitutional rights</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Official identification</li>
              </ul>
            </div>

            <div className="group p-8 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5">
              <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                Collective Economics
              </h3>
              <p className="text-[var(--gray-500)] leading-relaxed mb-4">
                Access a network of citizens building wealth together. Cooperative
                investment, shared resources, and economic opportunities exclusive
                to the Sultanate.
              </p>
              <ul className="space-y-2 text-sm text-[var(--gray-500)]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Community investment fund</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Business network access</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Economic opportunity alerts</li>
              </ul>
            </div>

            <div className="group p-8 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5">
              <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                Cultural Identity
              </h3>
              <p className="text-[var(--gray-500)] leading-relaxed mb-4">
                Connect with your heritage. Education in the history of the
                Nation of Moab, community events, and a network of citizens who
                share your values and vision.
              </p>
              <ul className="space-y-2 text-sm text-[var(--gray-500)]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Heritage education</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Community events</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />Exclusive resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet — Free Guide */}
      <section id="guide" className="relative bg-[var(--dark-bg)] text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[var(--cherry-red)]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--cherry-red)]">Free Download</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Citizen&apos;s Guide to the Sultanate of Amexem
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                A comprehensive guide for prospective and current citizens.
                Learn the fundamentals of membership, proper etiquette, the
                acumen expected of our nationals, and how to carry yourself
                with the confidence and conviction of a sovereign citizen.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Foundations of citizenship and what it means",
                  "Etiquette and conduct as a Sultanate national",
                  "Building acumen in governance and commerce",
                  "Carrying conviction in your sovereign identity",
                  "Your rights and responsibilities as a citizen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--dark-surface)] border border-[var(--gold)]/20 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-2">Get Your Free Copy</h3>
              <p className="text-sm text-gray-400 mb-6">
                Enter your email to receive the guide and join our official
                communications list.
              </p>
              <EmailCapture variant="inline" />
              <p className="text-xs text-gray-500 mt-4">
                You will also receive official news and proclamations from the
                Sultanate. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "Est. 2024", label: "Sovereign Authority" },
              { value: "3 Tiers", label: "Of Citizenship" },
              { value: "Active", label: "Governance Body" },
              { value: "Growing", label: "National Network" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-[var(--gray-900)]">{stat.value}</p>
                <p className="text-sm text-[var(--gold)] font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economics Newsletter CTA */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--forest-green)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--forest-green)] font-semibold">Collective Economics</span>
              <div className="h-px w-12 bg-[var(--forest-green)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              Build Wealth With Your Nation
            </h2>
            <p className="text-[var(--gray-500)] text-lg leading-relaxed mb-4">
              The Sultanate of Amexem is building a collective economic engine
              for its citizens. Investment opportunities, cooperative ventures,
              and community-funded initiatives — delivered to your inbox.
            </p>
            <p className="text-[var(--gray-700)] font-medium mb-8">
              This is the community fund you cannot afford to ignore.
            </p>
            <div className="max-w-md mx-auto">
              <EmailCapture
                variant="card"
                heading="Economics Newsletter"
                description="Get notified about investment opportunities, cooperative ventures, and ways to build wealth with the Sultanate."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="relative bg-[var(--dark-bg)] text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Nation Awaits
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Sovereignty is not given. It is claimed. Apply for citizenship
            in the Sultanate of Amexem and take your place among a community
            building something that endures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/citizenship"
              className="px-8 py-3.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors gold-glow"
            >
              Apply for Citizenship
            </Link>
            <Link
              href="/gifting"
              className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-md hover:bg-white/5 transition-colors"
            >
              Support the Mission
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/government"
              className="group p-8 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--forest-green)] transition-colors">
                Government &amp; Constitution &rarr;
              </h3>
              <p className="text-sm text-[var(--gray-500)]">
                Our governance structure and constitutional framework.
              </p>
            </Link>
            <Link
              href="/about"
              className="group p-8 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--gold-dark)] transition-colors">
                About the Sultanate &rarr;
              </h3>
              <p className="text-sm text-[var(--gray-500)]">
                Our history, mission, vision, and leadership.
              </p>
            </Link>
            <Link
              href="/gifting"
              className="group p-8 bg-[var(--gray-50)] rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2 group-hover:text-[var(--cherry-red)] transition-colors">
                Support Our Mission &rarr;
              </h3>
              <p className="text-sm text-[var(--gray-500)]">
                Contribute through donations or browse official merchandise.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
