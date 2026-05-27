import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Sultanate of Amexem — reestablished October 2020 as the custodial governing authority for the descendants of the Nation of Moab. Nationality, economic security, and global cultural presentation are the order of the day.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About the Sultanate
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The Sultanate of Amexem is the custodial governing authority for
            the protection and security of the descendants of the Nation of
            Moab. Nationality is the order of the day — and from that
            foundation, we build economic power, institutional strength, and a
            global presence worthy of our heritage.
          </p>
        </div>
      </section>

      {/* ── History & Vision ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* History */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                  Our History
                </span>
                <div className="h-px w-12 bg-[var(--gold)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
                A Governing Authority Restored
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
                <p>
                  In October 2020, the Sultanate of Amexem was reestablished as
                  the custodial authority charged with the protection, security,
                  and advancement of the descendants of the Nation of Moab. This
                  was not the founding of something new — it was the restoration
                  of a governing body that had always existed in principle and in
                  the hearts of our people.
                </p>
                <p>
                  The Sultanate carries forward the unbroken line of governance
                  rooted in nationality, law, and the customs of our ancestors.
                  Our people — known by the surnames Bey and El — represent a
                  nation with its own identity, its own institutions, and its own
                  mandate for self-determination.
                </p>
                <p>
                  This is not a movement. This is the continuation of governance.
                  The Sultanate exists to ensure that the rights, traditions, and
                  economic interests of our people are secured for this
                  generation and every generation to come.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                  Our Vision
                </span>
                <div className="h-px w-12 bg-[var(--gold)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
                Economic Power, Global Presence
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
                <p>
                  The Sultanate operates with a singular clarity: economic
                  security is the foundation of governance. We are building an economic
                  infrastructure from within our own membership — collective
                  economics in practice, not theory. Bey Group International
                  stands as proof that when our people organize around shared
                  purpose, institutions of real power emerge.
                </p>
                <p>
                  Equally vital is the comprehensive presentation of our customs,
                  traditions, and culture on the global stage. The world will
                  know us as we are — not as we have been described. Through
                  institutional development and disciplined governance, we
                  position our nation to operate with authority in every arena
                  that matters.
                </p>
              </div>

              {/* Core Values */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-[var(--gold)]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                    Core Values
                  </span>
                  <div className="h-px w-12 bg-[var(--gold)]" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Nationality Above All Else",
                    "Economic Security and Collective Economics",
                    "Global Cultural Presentation",
                    "Institutional Development from Within",
                    "Self-Determination and Executive Governance",
                  ].map((value) => (
                    <li key={value} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-[var(--gray-700)]">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Leadership
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            The Authority of Governance
          </h2>

          <div className="max-w-3xl mx-auto space-y-10">
            {/* Supreme Authority */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[var(--dark-bg)] border border-[var(--gold)]/30 mb-6">
                <Image
                  src="/images/emblem.svg"
                  alt="Sultanate of Amexem Emblem"
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--gold)] mb-2">
                Allah — Supreme Head &amp; Sultan
              </h3>
              <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
                All authority within the Sultanate of Amexem derives from
                Allah, the Supreme Head and Sultan. Every act of governance,
                every institution, and every decision operates under this
                supreme authority.
              </p>
            </div>

            {/* Executive Leadership */}
            <div className="border-t border-[var(--gold)]/10 pt-10 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Executive Director &amp; Supreme Grand Counsel
              </h3>
              <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
                The Executive Director serves as the head of state and
                custodial authority alongside the Supreme Grand Counsel.
                Together, they administer the affairs of the descendants of
                the Nation of Moab — directing the economic, cultural, and
                diplomatic agenda of the nation under the authority of Allah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Proclaim Your Nationality
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Nationality is the order of the day. Take your rightful place
              among the descendants of the Nation of Moab and stand within a
              governing body dedicated to economic security, cultural authority,
              and the collective advancement of our people.
            </p>
            <Link
              href="/citizenship"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Explore Membership
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
