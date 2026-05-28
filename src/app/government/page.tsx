import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Constitution",
  description:
    "The Constitution of the Sultanate of Amexem — the supreme governing document for the Moorish American people, descendants and successors in interest to the ancient Nation of Moab.",
};

export default function GovernmentPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial py-12 md:py-20 border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Government &amp; Constitution
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The supreme governing document of the Sultanate of Amexem.
          </p>
        </div>
        <div className="gold-divider" />
      </section>

      {/* ── Preamble ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Preamble
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <div className="reveal rounded-2xl border-2 border-[var(--gold)]/40 bg-[var(--gold)]/5 p-5 md:p-10">
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
            <p className="text-[var(--gray-700)] leading-relaxed text-[15px] mb-10">
              The Sultanate of Amexem, established under the House of Simmons
              Bey and organized in the State of Illinois, is the custodial
              governing authority for the descendants of the Nation of Moab,
              modernly identified as Moorish American.
            </p>

            <ol className="space-y-3">
              {[
                "Operate schools, study programs, and orientation courses that educate members in their history, rights, and heritage",
                "Fund and certify cooperative businesses, maintain a trade network, and circulate wealth within the membership",
                "Administer a mutual aid fund for emergency relief, community infrastructure, and direct support of members",
                "Preserve sacred texts, sponsor cultural events, and maintain the spiritual and historical traditions of the Moorish American people",
                "Establish and maintain formal relations with other organizations and governing bodies",
              ].map((purpose, i) => (
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
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Article II
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-8">
              Declaration of Principles
            </h2>

            <div className="reveal rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-5 md:p-8">
              <ul className="space-y-5">
                {[
                  "Islamism is the spiritual foundation; free exercise of conscience is guaranteed to all members",
                  "All members hold equal dignity — discrimination is prohibited",
                  "Non-violence, lawful conduct, and peaceful resolution govern all disputes",
                  "The dignity of women and children is protected above all",
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

      {/* ── Article III — Governing Structure ── */}
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
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-8">
              Governing Structure
            </h2>

            <div className="reveal rounded-xl border border-[var(--gray-200)] p-6 md:p-8">
              <ol className="space-y-0">
                {[
                  { name: "Allah", authority: "All governing power derives from and operates in submission to the Most High" },
                  { name: "Executive Director", authority: "Holds operational authority over the Sultanate and chairs both Boards" },
                  { name: "Chairman", authority: "Leads the Supreme Grand Council" },
                  { name: "Supreme Grand Council", authority: "Holds constitutional authority over all offices and policies" },
                  { name: "Grand Body", authority: "Ratifies amendments and expresses the collective will of the membership" },
                  { name: "The Sheiks", authority: "Hold authority in matters of faith, heritage, and spiritual continuity" },
                ].map((item, i) => (
                  <li key={item.name} className="flex items-start gap-4 py-4 border-b border-[var(--gray-200)] last:border-0">
                    <span className="w-7 h-7 rounded-full bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className={`font-semibold text-[15px] ${i === 0 ? "text-[var(--gold)]" : "text-[var(--gray-900)]"}`}>
                        {item.name}
                      </h3>
                      <p className="text-[var(--gray-500)] text-sm">
                        {item.authority}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Boards */}
              <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-hover">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-3">
                      Ministerial Board
                    </h4>
                    <ul className="space-y-2">
                      {["Community", "Civics", "Religion", "Education", "Housing and Welfare"].map((dept) => (
                        <li key={dept} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                          <span className="text-[var(--gray-700)] text-sm">{dept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-hover">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-3">
                      Executive Board
                    </h4>
                    <ul className="space-y-2">
                      {["Trade and Commerce", "Reserves", "Security", "Organization-to-Organization Relations"].map((dept) => (
                        <li key={dept} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                          <span className="text-[var(--gray-700)] text-sm">{dept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-hover max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Full Constitution
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              The complete governing document of the Sultanate of Amexem.
            </p>
            <Link
              href="/documents/constitution.pdf"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
