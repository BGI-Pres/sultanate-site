import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Sultanate of Amexem — Moorish American Heritage & History",
  description:
    "Discover the Sultanate of Amexem, reconstituted in 2020 to preserve Moorish American heritage rooted in Noble Drew Ali and the MSTA. Learn about the Nation of Moab legacy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial py-12 md:py-20 border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            About the Sultanate
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The Sultanate of Amexem is the custodial governing authority for
            the protection and security of the descendants of the Nation of
            Moab, modernly identified as Moorish American. Nationality is the
            order of the day.
          </p>
        </div>
      </section>
      <div className="gold-divider" />

      {/* ── The Light Rekindled ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                The Light Rekindled
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
              Noble Drew Ali &amp; the Moorish Science Temple of America
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
              <p>
                In the early twentieth century, Noble Drew Ali rekindled the
                light of truth for a people who had been separated from their
                identity. He proclaimed that the so-called Negro was in fact
                Moorish American — a descendant of the ancient Moabites, with a
                nationality, a lineage, and a right to self-governance. This
                declaration was not opinion. It was restoration.
              </p>
              <p>
                Through the Moorish Science Temple of America, Noble Drew Ali
                established the framework for developmental growth — a
                structure of faith, nationality, and organized community that
                would carry the principles of Love, Truth, Peace, Freedom, and
                Justice forward through generations. The MSTA was not merely a
                religious organization. It was the institutional foundation
                upon which a nation could rebuild.
              </p>
              <p>
                The Sultanate of Amexem stands on this foundation. The
                principles taught by Noble Drew Ali are the principles we
                govern by. The lineage he restored is the lineage we protect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reconstruction & Reformation ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Our History
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Restoration &amp; Modern Reformation
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>
                In October 2020, the Sultanate of Amexem was reconstituted
                under the House of Simmons Bey — not as the founding of
                something new, but as the restoration of a governing authority
                that had always existed in principle and in the hearts of our
                people. What was disrupted has been reconstructed. What was
                inherited has been reformed for the modern era.
              </p>
              <p>
                The Sultanate carries forward the unbroken line of governance
                rooted in nationality, law, and the customs of our ancestors.
                Our people — known by the surnames Bey and El — represent a
                nation with its own identity, its own institutions, and its own
                mandate for self-determination. This is not a movement. This is
                the continuation of governance.
              </p>
              <p>
                From the framework laid by the Moorish Science Temple of
                America, through the principles restored by Noble Drew Ali, to
                the institutional structure standing today — the Sultanate
                exists to ensure that the rights, traditions, and economic
                interests of our people are secured for this generation and
                every generation to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl reveal">
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
                Economic security is the foundation of governance. The
                Sultanate builds economic infrastructure from within its own
                membership — cooperative commerce, certified enterprises, and
                collective investment directed by our own people. Bey Group
                International stands as proof that when our people organize
                around shared purpose, institutions of real power emerge.
              </p>
              <p>
                Equally vital is the presentation of our customs, traditions,
                and culture on the global stage. The world will know us as we
                are — not as we have been described. Through institutional
                development and disciplined governance, we position our nation
                to operate with authority in every arena that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto reveal">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Milestones
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-10 text-center">
              Key Moments
            </h2>

            <div className="space-y-0">
              {[
                { year: "1913", event: "Noble Drew Ali establishes the Moorish Science Temple of America, rekindling the light of truth and laying the framework for Moorish American nationality" },
                { year: "1929", event: "Noble Drew Ali transitions — the principles of Love, Truth, Peace, Freedom, and Justice endure through his teachings and the MSTA" },
                { year: "2020", event: "The Sultanate of Amexem is reconstituted under the House of Simmons Bey as the custodial governing authority for the descendants of the Nation of Moab" },
                { year: "2021", event: "Founding of Bey Group of Companies — economic infrastructure built from within the membership" },
                { year: "2024", event: "Formal organization of the Supreme Grand Council, Ministerial Board, and Executive Board under the Constitution" },
                { year: "2026", event: "Bey Group of Companies rebrands as Bey Group International — expanding the economic mission to the global stage" },
              ].map((milestone, i) => (
                <div key={milestone.year} className={`flex gap-6 reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[var(--gold)]">
                        {milestone.year}
                      </span>
                    </div>
                    {i < 5 && (
                      <div className="w-px flex-1 bg-[var(--gold)]/20 my-1" />
                    )}
                  </div>
                  <div className="pb-8 last:pb-0 pt-2">
                    <p className="text-white/70 text-sm leading-relaxed">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto reveal">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Core Values
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10 text-center">
              The Principles We Govern By
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { value: "Love", meaning: "The bond that holds the body together" },
                { value: "Truth", meaning: "The standard by which all claims are measured" },
                { value: "Peace", meaning: "The condition we create and defend" },
                { value: "Freedom", meaning: "The right of self-determination for our people" },
                { value: "Justice", meaning: "The guarantee that every member is treated fairly" },
              ].map((item, i) => (
                <div
                  key={item.value}
                  className={`text-center p-5 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300 card-hover reveal reveal-delay-${i + 1}`}
                >
                  <h3 className="text-lg font-bold text-[var(--gold)] mb-2">
                    {item.value}
                  </h3>
                  <p className="text-xs text-[var(--gray-500)] leading-relaxed">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12 reveal">
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
