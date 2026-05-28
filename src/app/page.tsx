import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import EmailCapture from "@/components/EmailCapture";

const services = [
  {
    title: "Membership",
    description: "Apply for membership — three tiers of standing",
    href: "/citizenship",
    icon: "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10",
  },
  {
    title: "Economics",
    description: "Collective ventures, cooperative commerce, shared wealth",
    href: "/economics",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Government",
    description: "Constitutional framework and governance structure",
    href: "/government",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Support",
    description: "Contribute to the Sultanate's mission — donations and merchandise",
    href: "/gifting",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "News",
    description: "Official proclamations, updates, and developments",
    href: "/news",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    title: "Portal",
    description: "Access your member dashboard, documents, and resources",
    href: "/portal",
    icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Services &amp; Resources
            </span>
            <div className="h-px flex-1 bg-[var(--gold)]/20" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 reveal">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col items-center text-center p-5 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[var(--gray-900)] mb-1">
                  {service.title}
                </h3>
                <p className="text-[11px] text-[var(--gray-500)] leading-snug hidden md:block">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Preamble */}
      <section className="relative bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 italic leading-relaxed font-serif">
            &ldquo;We, the Moorish American people of the Sultanate of Amexem
            &mdash; descendants and successors in interest to the ancient Nation
            of Moab &mdash; gather in fidelity to the principles of Love, Truth,
            Peace, Freedom, and Justice, and in reverence to Allah, the Most
            High.&rdquo;
          </p>

          {/* Gold divider */}
          <div className="mx-auto mt-10 mb-6 w-16 h-px bg-[var(--gold)]" />

          <p className="text-sm text-[var(--gold)]/80 tracking-wide">
            From the Constitution of the Sultanate of Amexem &mdash; Adopted May
            27, 2026, Chicago, Illinois
          </p>

          <Link
            href="/documents/constitution.pdf"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[var(--gold)] border border-[var(--gold)]/30 px-6 py-2.5 rounded-lg hover:bg-[var(--gold)]/10 transition-colors duration-300"
          >
            Read the Constitution
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </section>

      {/* Three Pillars */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">The Executive Mandate</span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              Nationality Is the Order of the Day
            </h2>
            <p className="text-[var(--gray-500)] max-w-2xl mx-auto text-lg">
              Without nationality, there is no standing, no protection, no
              commerce. The Sultanate secures all three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
            {[
              {
                title: "Nationality & Standing",
                desc: "Formal identity under the custodianship of the Sultanate. Documentation, constitutional protections, and proclaimed standing.",
                items: ["Official identification", "Constitutional protections", "Proclaimed nationality status"],
                icon: "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10",
              },
              {
                title: "Economic Security",
                desc: "A nation that does not control its economics controls nothing. Cooperative commerce, institutional development, and ventures born from our own membership.",
                items: ["Cooperative commercial ventures", "Collective business network", "Institutional development"],
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Culture & Global Presence",
                desc: "Our customs and culture presented to the world on our terms. A comprehensive global presence ensuring our heritage is recognized internationally.",
                items: ["Global cultural presentation", "Heritage preservation", "Community network"],
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="group p-5 md:p-8 rounded-xl bg-white border border-[var(--gray-200)] hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--gold)]/5 card-hover">
                <div className="w-14 h-14 rounded-xl bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pillar.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">{pillar.title}</h3>
                <p className="text-[var(--gray-500)] leading-relaxed mb-4 text-sm">{pillar.desc}</p>
                <ul className="space-y-2 text-sm text-[var(--gray-500)]">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="guide" className="relative bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-[var(--cherry-red)]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--cherry-red)]">Free Download</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Executive Guide
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The fundamentals of membership — etiquette, commercial acumen,
                confidence, and conviction. How to carry yourself as a member
                of the Sultanate of Amexem.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "What nationality means and why it precedes everything",
                  "Etiquette and conduct befitting a member",
                  "Commercial acumen and economic participation",
                  "Rights, responsibilities, and the collective compact",
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
            <div className="bg-[var(--dark-surface)] border border-[var(--gold)]/20 rounded-xl p-5 md:p-8 card-hover">
              <h3 className="text-xl font-bold mb-2">Get Your Free Copy</h3>
              <p className="text-sm text-gray-400 mb-6">
                Enter your email to receive the guide and join official communications.
              </p>
              <EmailCapture variant="inline" />
              <p className="text-xs text-gray-500 mt-4">
                You will also receive official news and proclamations. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
            {[
              { value: "Est. 2020", label: "Reconstituted Authority" },
              { value: "3 Tiers", label: "Of Membership" },
              { value: "Active", label: "Governance & Commerce" },
              { value: "Global", label: "Cultural Presence" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-[var(--gray-900)]">{stat.value}</p>
                <p className="text-sm text-[var(--gold)] font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economics Newsletter */}
      <section className="py-12 md:py-20 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--forest-green)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--forest-green)] font-semibold">Collective Economics</span>
              <div className="h-px w-12 bg-[var(--forest-green)]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              The Economics of a Nation
            </h2>
            <p className="text-[var(--gray-500)] text-lg leading-relaxed mb-4">
              Economic security is the engine that powers every collective objective.
              Cooperative ventures, commercial infrastructure, and institutional
              wealth — built from within our own membership.
            </p>
            <p className="text-[var(--gray-700)] font-medium mb-8">
              This is a collective economic engine. Participate or observe.
            </p>
            <div className="max-w-md mx-auto">
              <EmailCapture
                variant="card"
                heading="Economics Newsletter"
                description="Investment opportunities, cooperative ventures, and collective economic development."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="relative bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proclaim Your Nationality
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            The Sultanate of Amexem exists for the protection and advancement
            of the descendants of the Nation of Moab. Proclaim your nationality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/citizenship"
              className="px-8 py-3.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors gold-glow"
            >
              Apply for Membership
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
    </>
  );
}
