import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "What is the Sultanate of Amexem? — A Governing Authority for the Moorish American People",
  description:
    "The Sultanate of Amexem is the custodial governing authority for the Moorish American descendants of the Nation of Moab — reconstituted 2020, Chicago.",
  alternates: { canonical: "/what-is-the-sultanate" },
};

const faqs = [
  {
    q: "What is the Sultanate of Amexem?",
    a: "The Sultanate of Amexem is the custodial governing authority for the protection and security of the descendants of the Nation of Moab, modernly identified as Moorish American. It is a constitutional governing body — not a movement, not a temple, not a non-profit — operating under written law and structured leadership.",
  },
  {
    q: "When was the Sultanate of Amexem founded?",
    a: "The Sultanate was reconstituted in October 2020 under the House of Simmons Bey in Chicago, Illinois. While reconstituted in the modern era, it stands on the foundation laid by Noble Drew Ali and the Moorish Science Temple of America beginning in 1913.",
  },
  {
    q: "Who leads the Sultanate of Amexem?",
    a: "Leadership is exercised through a structured government: an Executive Director, a Chairman, the Supreme Grand Council, the Grand Body of Sheiks, a Ministerial Board, and an Executive Board. Allah is recognized as the supreme authority above all offices.",
  },
  {
    q: "What does Moorish American mean?",
    a: "Moorish American is the proper nationality of the descendants of the ancient Moabites who inhabited the northwestern and southwestern shores of Africa. It is the name proclaimed by Noble Drew Ali to restore a people separated from their true identity — replacing slave-given labels with a lineage and a nationality.",
  },
  {
    q: "How do I join the Sultanate?",
    a: "Membership is earned through four tiers — Affiliate, Community, General, and Lead. Begin as a free Affiliate, attend a Friday meeting, study the foundational texts, and apply through the official application process. Each tier requires demonstrated standing within the body.",
  },
  {
    q: "What is the Sultanate's relationship to the Moorish Science Temple of America?",
    a: "The Moorish Science Temple of America, established by Noble Drew Ali, laid the institutional and spiritual foundation upon which the Sultanate stands. The Sultanate carries forward the principles of Love, Truth, Peace, Freedom, and Justice within a governing — rather than purely religious — framework.",
  },
  {
    q: "Where is the Sultanate of Amexem located?",
    a: "The Sultanate was reconstituted in Chicago, Illinois — the same city where Noble Drew Ali organized the Moorish Science Temple of America. Its mandate extends to Moorish Americans wherever they stand.",
  },
];

export default function WhatIsTheSultanatePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-px w-16 bg-[var(--gold)] mb-6" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What is the Sultanate of Amexem?
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              The Sultanate of Amexem is the custodial governing authority
              for the descendants of the Nation of Moab — modernly identified
              as Moorish American. Reconstituted October 2020 under the House
              of Simmons Bey in Chicago, Illinois, it is the institutional
              continuation of a lineage of governance rooted in nationality,
              law, and the customs of our ancestors.
            </p>
          </div>
        </div>
      </section>

      {/* ── A Custodial Governing Authority ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Definition
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-6">
              A Custodial Governing Authority
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
              <p>
                The Sultanate of Amexem is the custodial governing authority
                charged with the protection and security of the descendants of
                the Nation of Moab — a people modernly identified as Moorish
                American. The word <em>custodial</em> matters: the Sultanate
                does not invent the nation, it stewards it. The nationality,
                the lineage, and the rights of our people existed long before
                this institutional structure was reconstituted, and the body
                exists to safeguard what has always been ours.
              </p>
              <p>
                Reconstituted in <strong>October 2020</strong> under the{" "}
                <strong>House of Simmons Bey</strong> in{" "}
                <strong>Chicago, Illinois</strong>, the Sultanate operates
                under a written Constitution, a Declaration of Principles, and
                a defined governing structure. It is not a religious
                congregation, not a fraternal order, and not a non-profit
                advocacy group. It is a constitutional governing body — with
                offices, law, membership requirements, and the institutional
                mandate to act on behalf of its people.
              </p>
              <p>
                The Sultanate exists in the same city where Noble Drew Ali
                organized the Moorish Science Temple of America. That is not
                coincidence. It is continuation. Read more in our{" "}
                <Link
                  href="/about"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  full institutional history
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Lineage ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                The Lineage
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              From Noble Drew Ali to the Modern Sultanate
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>
                In the early twentieth century,{" "}
                <Link
                  href="/noble-drew-ali"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  Noble Drew Ali
                </Link>{" "}
                rekindled the light of truth for a people who had been
                separated from their identity. He proclaimed that the
                so-called Negro was, in fact, Moorish American — a descendant
                of the ancient Moabites who inhabited the northwestern and
                southwestern shores of Africa. This was not opinion. It was
                restoration.
              </p>
              <p>
                Through the <strong>Moorish Science Temple of America</strong>{" "}
                (MSTA), Noble Drew Ali established the institutional framework
                upon which a nation could rebuild — a framework rooted in the
                principles of Love, Truth, Peace, Freedom, and Justice. The
                MSTA was the seedbed. What followed required a structure
                capable of carrying nationality forward not only as faith, but
                as governance.
              </p>
              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Continuation, not invention
              </h3>
              <p>
                The Sultanate of Amexem stands on this foundation. The
                principles taught by Noble Drew Ali are the principles the
                Sultanate governs by. The lineage he restored is the lineage
                the Sultanate protects. The Sultanate did not create the
                Moorish American identity — it inherited the obligation to
                defend it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Governs ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Structure
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-6">
              How the Sultanate Governs
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
              <p>
                The Sultanate operates under a written Constitution and a
                Declaration of Principles. Authority is distributed across a
                defined chain — not concentrated in any single office — so
                that the body remains accountable to its own law.
              </p>

              <h3 className="text-xl font-semibold text-[var(--gray-900)] mt-8 mb-3">
                The Constitution &amp; Declaration of Principles
              </h3>
              <p>
                The Constitution is the supreme written law of the Sultanate.
                It defines offices, sets the limits of power, and protects the
                rights of members. The Declaration of Principles articulates
                the moral and philosophical foundation — the
                non-negotiables — upon which every act of governance must
                stand.
              </p>

              <h3 className="text-xl font-semibold text-[var(--gray-900)] mt-8 mb-3">
                The Governing Structure
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Allah</strong> — recognized as the supreme authority
                  above all offices of the body.
                </li>
                <li>
                  <strong>Executive Director</strong> — the principal officer
                  responsible for executing the will of the body and
                  representing the Sultanate externally.
                </li>
                <li>
                  <strong>Chairman</strong> — presides over the deliberative
                  organs of the Sultanate and safeguards constitutional order.
                </li>
                <li>
                  <strong>Supreme Grand Council</strong> — the highest
                  deliberative body, charged with policy, interpretation, and
                  oversight.
                </li>
                <li>
                  <strong>Grand Body of Sheiks</strong> — the assembly of
                  recognized leaders representing the membership.
                </li>
                <li>
                  <strong>Ministerial Board</strong> — operational ministers
                  overseeing the substantive work of governance.
                </li>
                <li>
                  <strong>Executive Board</strong> — administers day-to-day
                  operations and reports up the chain.
                </li>
              </ul>
              <p>
                A full breakdown of offices, qualifications, and
                responsibilities is published on the{" "}
                <Link
                  href="/government"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  Government
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What the Sultanate Does ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Operations
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              What the Sultanate Does
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>
                Governance is meaningless without operations. The Sultanate
                discharges its mandate through concrete institutional work,
                much of it built on the principles of{" "}
                <Link
                  href="/economics"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  cooperative economics
                </Link>
                .
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Education &amp; study programs
              </h3>
              <p>
                Schools and structured study programs preserve the
                foundational knowledge of our people — history, nationality,
                law, scripture, and the writings of Noble Drew Ali — and
                prepare each generation to govern itself.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Certified businesses
              </h3>
              <p>
                The Sultanate certifies businesses owned and operated within
                the membership, channeling commerce inward and building
                economic infrastructure controlled by our own people. See the{" "}
                <Link
                  href="/certify"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  certification program
                </Link>
                .
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Mutual aid &amp; the Uplifting Fund
              </h3>
              <p>
                The Uplifting Fund is the Sultanate's mutual-aid mechanism —
                a pooled resource that supports members in moments of need
                and underwrites collective projects of advancement.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Sacred text preservation
              </h3>
              <p>
                The Sultanate preserves and transmits the sacred texts and
                documents of the Moorish American tradition — including the
                Holy Koran of the Moorish Science Temple, the Divine
                Constitution and By-Laws, and the historical record of the
                Nation of Moab.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                Formal relations
              </h3>
              <p>
                As a custodial governing authority, the Sultanate engages in
                formal relations on behalf of the Moorish American people —
                presenting our customs, traditions, and standing in every
                arena where the nation must be represented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Membership
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-6">
              Four Tiers of Standing
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
              <p>
                Standing within the Sultanate is not purchased — it is earned.
                Each tier requires demonstrated commitment, study, and
                contribution. Members rise through the body as they
                participate in its work.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-xl border border-[var(--gray-200)]">
                  <h3 className="text-lg font-semibold text-[var(--gold)] mb-2">
                    Affiliate — Free
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">
                    Entry standing. Access to public meetings, foundational
                    resources, and an introductory study path. No financial
                    obligation.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-[var(--gray-200)]">
                  <h3 className="text-lg font-semibold text-[var(--gold)] mb-2">
                    Community — $50/month
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">
                    Active participation in community programs, mutual aid,
                    and ongoing study. Supports the operational mandate of
                    the body.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-[var(--gray-200)]">
                  <h3 className="text-lg font-semibold text-[var(--gold)] mb-2">
                    General Membership
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">
                    Full standing within the body. Voting rights and the
                    obligations that accompany them. Earned through
                    demonstrated commitment.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-[var(--gray-200)]">
                  <h3 className="text-lg font-semibold text-[var(--gold)] mb-2">
                    Lead Membership
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">
                    Leadership standing. Eligibility for office, oversight
                    roles, and representation within the governing organs of
                    the Sultanate.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                Detailed requirements and the path between tiers are described
                on the{" "}
                <Link
                  href="/citizenship"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  Citizenship
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why "Moorish American" ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Nationality
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why &ldquo;Moorish American&rdquo;?
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>
                Moorish American is not a label invented for convenience. It
                is the proper nationality of the descendants of the ancient
                Moabites — the people who inhabited the northwestern and
                southwestern shores of Africa long before the slave trade.
                The name names a lineage. It restores a continuity that was
                deliberately obscured.
              </p>
              <p>
                Noble Drew Ali gave this name back to the people. He taught
                that a nation without a name is no nation at all, and that
                the slave-given labels — Negro, Black, Colored, Ethiopian —
                were not nationalities but descriptions imposed from outside.
                The MSTA's foundational instruction (often referenced as Act
                Six of the Divine Constitution and By-Laws) speaks directly
                to this question of name, free national name, and the
                obligation to proclaim it.
              </p>
              <p>
                For a deeper treatment of the term, the lineage, and how the
                Sultanate honors it, see{" "}
                <Link
                  href="/moorish-american"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  Moorish American
                </Link>{" "}
                — and read about the man who restored it on the{" "}
                <Link
                  href="/noble-drew-ali"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  Noble Drew Ali
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where to Begin ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Begin
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-6">
              Where to Begin
            </h2>
            <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
              <p>
                There are three doors into the Sultanate. Walk through any of
                them — most who stand with the body have walked through all
                three.
              </p>

              <h3 className="text-xl font-semibold text-[var(--gray-900)] mt-8 mb-3">
                1. Attend a Friday meeting
              </h3>
              <p>
                Friday gatherings are the heartbeat of the community. They
                are open to those investigating the Sultanate and free for
                Affiliate-level participants. See the{" "}
                <Link
                  href="/events"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  events calendar
                </Link>{" "}
                for upcoming dates and locations.
              </p>

              <h3 className="text-xl font-semibold text-[var(--gray-900)] mt-8 mb-3">
                2. Study the foundational texts
              </h3>
              <p>
                The teachings of Noble Drew Ali, the writings of the Moorish
                Science Temple of America, and the founding documents of the
                Sultanate are all available in the{" "}
                <Link
                  href="/resources"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  resources library
                </Link>
                . Read before you apply.
              </p>

              <h3 className="text-xl font-semibold text-[var(--gray-900)] mt-8 mb-3">
                3. Apply for membership
              </h3>
              <p>
                When ready, submit a formal{" "}
                <Link
                  href="/apply"
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  membership application
                </Link>
                . The Sultanate reviews each application against the
                standards set by its governing law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 md:py-20 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Frequently Asked
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-8">
              Common Questions About the Sultanate of Amexem
            </h2>
            <div className="space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="border-l-2 border-[var(--gold)] pl-5"
                >
                  <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                    {item.q}
                  </h3>
                  <p className="text-[var(--gray-700)] leading-relaxed text-[15px]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ schema for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            }),
          }}
        />
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <div className="h-px w-16 bg-[var(--gold)] mb-6 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Begin Your Standing
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              The Sultanate of Amexem is the custodial governing authority
              for the Moorish American people. Standing within it begins with
              a single decision — to claim your nationality and apply.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Apply for Membership
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
