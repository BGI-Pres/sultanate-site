import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Sultanate of Amexem, Custodian of the Nation of Moab — our history, mission, and vision.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About the Sultanate
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The Sultanate of Amexem serves as the Custodian of the Nation of
            Moab, dedicated to preserving our heritage, upholding sovereignty,
            and building a strong community.
          </p>
        </div>
      </section>

      {/* ── History & Vision ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                A Legacy of Resilience
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
                <p>
                  The Sultanate of Amexem is rooted in a deep and abiding
                  commitment to the Nation of Moab. As Custodian, the Sultanate
                  carries forward the traditions, laws, and cultural identity of
                  our people.
                </p>
                <p>
                  Our history is one of resilience, self-determination, and an
                  unwavering dedication to sovereignty. The Sultanate was
                  established to serve as the governing body and custodial
                  authority for the Nation of Moab.
                </p>
                <p>
                  Through generations of commitment, we continue to honor the
                  legacy of our ancestors while building a future grounded in
                  justice, community, and national pride.
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
                Building a Sovereign Future
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed text-[15px]">
                <p>
                  We envision a nation where every citizen is empowered, every
                  tradition is honored, and every right is protected. The
                  Sultanate of Amexem works to create the conditions for our
                  people to thrive.
                </p>
                <p>
                  Our vision encompasses strong governance, cultural
                  preservation, economic development, and international
                  recognition of our sovereign status.
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
                    "Sovereignty and Self-Determination",
                    "Cultural Preservation and Heritage",
                    "Justice and Rule of Law",
                    "Unity and Community Building",
                    "Education and Empowerment",
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
      <section className="py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Leadership
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            Guided by Tradition, Driven by Purpose
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[var(--dark-bg)] border border-[var(--gold)]/30 mb-6">
              <Image
                src="/images/emblem.svg"
                alt="Sultanate of Amexem Emblem"
                width={96}
                height={96}
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              The Sultan
            </h3>
            <p className="text-white/60 leading-relaxed">
              As head of state and Custodian of the Nation of Moab, the Sultan
              provides leadership and direction for the Sultanate of Amexem,
              ensuring the preservation of our heritage and the advancement of
              our sovereign mission.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Join the Nation of Moab
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Become a citizen of the Sultanate of Amexem and take your place in
              a community dedicated to sovereignty, heritage, and collective
              advancement.
            </p>
            <Link
              href="/citizenship"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Explore Citizenship
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
