import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Constitution",
  description:
    "The Constitution of the Sultanate of Amexem — the supreme governing document for the Moorish American people, descendants and successors in interest to the ancient Nation of Moab.",
};

const institutions = [
  {
    title: "Supreme Grand Council",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    description:
      "The senior governing authority of the Sultanate. Holds final authority over the Constitution, offices, and policies. Composed of senior Sheiks and principal officers.",
  },
  {
    title: "Grand Body",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    description:
      "The general assembly of all members — the voice of the membership. Ratifies amendments to the Constitution and expresses the collective will of the people.",
  },
  {
    title: "Executive Director",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    description:
      "The chief administrative officer of the Sultanate. Carries out Council policies, chairs the Ministerial and Executive Boards, and oversees day-to-day operations. Serves under and is accountable to the Supreme Grand Council.",
  },
  {
    title: "The Sheiks",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    description:
      "Recognized leaders and elders of the Sultanate. They provide guidance in matters of faith, heritage, and community, serving as pillars of wisdom and continuity.",
  },
];

const ministerialDepartments = [
  "Community",
  "Civics",
  "Religion",
  "Education",
  "Housing and Welfare",
];

const executiveDepartments = [
  "Trade and Commerce",
  "Reserves",
  "Security",
  "Organization-to-Organization Relations",
];

const purposes = [
  "Preserve the history, culture, and spiritual traditions of the Moorish American people",
  "Advance education, mutual aid, and community development",
  "Advocate for the civil and human rights of members",
  "Organize commerce, trade, and economic cooperation",
  "Build constructive relations with other organizations and governments",
];

const memberRights = [
  "Participate in assemblies",
  "Access programs and services",
  "Seek advocacy on their behalf",
  "Hold office within the Sultanate",
];

const memberDuties = [
  "Uphold the Constitution",
  "Conduct themselves lawfully",
  "Contribute support to the body",
  "Act in good faith toward fellow members",
];

export default function GovernmentPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Government &amp; Constitution
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The supreme governing document of the Sultanate of Amexem —
            established to serve and protect the Moorish American people,
            descendants and successors in interest to the ancient Nation of
            Moab.
          </p>
        </div>
      </section>

      {/* ── Preamble ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Preamble
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <div className="rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-5 md:p-10">
              <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center italic">
                &ldquo;We, the Moorish American people of the Sultanate of
                Amexem — descendants and successors in interest to the ancient
                Nation of Moab — gather in fidelity to the principles of Love,
                Truth, Peace, Freedom, and Justice, and in reverence to Allah,
                the Most High.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article I — Name, Nature, and Purpose ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Article I
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
              Name, Nature, and Purpose
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px] mb-10">
              <p>
                The Sultanate of Amexem, established under the House of Simmons
                Bey and organized in the State of Illinois, serves as Custodian
                of the descendants of the Nation of Moab who modernly identify
                as Moorish American. The Sultanate operates as a self-governing
                membership body.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
              Purposes of the Sultanate
            </h3>
            <ol className="space-y-3">
              {purposes.map((purpose, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-sm font-bold text-[var(--gold)] mt-0.5 w-6 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  <span className="text-[var(--gray-700)] text-[15px] leading-relaxed">
                    {purpose}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Article II — Declaration of Principles ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Article II
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Declaration of Principles
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 text-[15px]">
              The Sultanate of Amexem is guided by the foundational values of
              Love, Truth, Peace, Freedom, and Justice in all its affairs.
            </p>

            <div className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-5 md:p-8">
              <ul className="space-y-5">
                {[
                  "Honors Islam as its spiritual foundation while guaranteeing the free exercise of conscience for all members",
                  "Upholds the equal dignity of all members — no discrimination shall be tolerated",
                  "Committed to non-violence, peaceful resolution of disputes, and lawful conduct",
                  "Extends particular care for the most vulnerable members, including the dignity of women and children",
                ].map((principle, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 shrink-0" />
                    <span className="text-white/80 text-[15px] leading-relaxed">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article III — Membership ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Article III
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
              Membership
            </h2>
            <p className="text-[var(--gray-700)] leading-relaxed mb-10 text-[15px]">
              Membership in the Sultanate of Amexem is open to birthright
              members and applicants who meet the criteria established by the
              Supreme Grand Council.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 md:p-8 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
                  Rights of Members
                </h3>
                <ul className="space-y-3">
                  {memberRights.map((right, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <svg className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className="text-[var(--gray-700)] text-[15px] leading-relaxed">
                        {right}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 md:p-8 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
                <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
                  Duties of Members
                </h3>
                <ul className="space-y-3">
                  {memberDuties.map((duty, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <svg className="w-5 h-5 text-[var(--gold)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      <span className="text-[var(--gray-700)] text-[15px] leading-relaxed">
                        {duty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article IV — Governing Institutions ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Article IV
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Governing Institutions
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 text-[15px]">
              The governance of the Sultanate of Amexem is carried out by four
              principal institutions, each with distinct authority and
              responsibility.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institutions.map((inst) => (
                <div
                  key={inst.title}
                  className="p-5 md:p-8 border border-[var(--gold)]/20 rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300 bg-[var(--gold)]/5 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--dark-bg)] border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center mb-4">
                    {inst.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {inst.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {inst.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles V & VI — The Boards ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ministerial Board */}
              <div className="p-5 md:p-8 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[var(--gold)]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                    Article V
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                  The Ministerial Board
                </h3>
                <p className="text-[var(--gray-500)] text-sm mb-5 leading-relaxed">
                  Domestic affairs — serving the internal needs of the membership
                  and community.
                </p>
                <ul className="space-y-3">
                  {ministerialDepartments.map((dept) => (
                    <li key={dept} className="flex gap-3 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-[var(--gray-700)] text-[15px]">
                        {dept}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Executive Board */}
              <div className="p-5 md:p-8 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[var(--gold)]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                    Article VI
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                  The Executive Board
                </h3>
                <p className="text-[var(--gray-500)] text-sm mb-5 leading-relaxed">
                  External affairs — managing trade, security, and relations
                  beyond the Sultanate.
                </p>
                <ul className="space-y-3">
                  {executiveDepartments.map((dept) => (
                    <li key={dept} className="flex gap-3 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-[var(--gray-700)] text-[15px]">
                        {dept}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Download the Full Constitution
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Access the complete Constitution of the Sultanate of Amexem.
              Review the founding document that governs and guides our
              Moorish American body.
            </p>
            <Link
              href="/documents/constitution.pdf"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download the Constitution
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Participate in Our Nation
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Learn more about membership and how you can contribute to the
              governance and growth of the Sultanate of Amexem as a
              Moorish American.
            </p>
            <Link
              href="/apply"
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
