import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Sultanate of Amexem, Custodian of the Nation of Moab — our history, mission, and vision.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--gray-50)] py-16 border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--gray-900)] mb-4">
            About the Sultanate
          </h1>
          <p className="text-lg text-[var(--gray-500)] max-w-3xl">
            The Sultanate of Amexem serves as the Custodian of the Nation of
            Moab, dedicated to preserving our heritage, upholding sovereignty,
            and building a strong community.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
                Our History
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed">
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

            <div>
              <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
                Our Vision
              </h2>
              <div className="space-y-4 text-[var(--gray-700)] leading-relaxed">
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

              <h2 className="text-2xl font-bold text-[var(--gray-900)] mt-10 mb-6">
                Core Values
              </h2>
              <ul className="space-y-3">
                {[
                  "Sovereignty and Self-Determination",
                  "Cultural Preservation and Heritage",
                  "Justice and Rule of Law",
                  "Unity and Community Building",
                  "Education and Empowerment",
                ].map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--forest-green)] shrink-0" />
                    <span className="text-[var(--gray-700)]">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-8 text-center">
            Leadership
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <Image
              src="/images/emblem.svg"
              alt="Sultanate of Amexem Emblem"
              width={96}
              height={96}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
              The Sultan
            </h3>
            <p className="text-[var(--gray-500)] leading-relaxed">
              As head of state and Custodian of the Nation of Moab, the Sultan
              provides leadership and direction for the Sultanate of Amexem,
              ensuring the preservation of our heritage and the advancement of
              our sovereign mission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
