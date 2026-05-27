import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government & Constitution",
  description:
    "The governance structure, constitutional framework, and legal principles of the Sultanate of Amexem.",
};

export default function GovernmentPage() {
  return (
    <>
      <section className="bg-[var(--gray-50)] py-16 border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--gray-900)] mb-4">
            Government &amp; Constitution
          </h1>
          <p className="text-lg text-[var(--gray-500)] max-w-3xl">
            The governance structure and constitutional framework of the
            Sultanate of Amexem, established to serve the Nation of Moab.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
              Governance Structure
            </h2>
            <p className="text-[var(--gray-700)] leading-relaxed mb-8">
              The Sultanate of Amexem operates under a structured governance
              framework designed to uphold the rights and sovereignty of the
              Nation of Moab. Our government is organized to ensure effective
              leadership, just administration, and faithful custodianship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {[
                {
                  title: "Executive Authority",
                  description:
                    "The Sultan serves as head of state and chief custodian, providing executive leadership and representing the nation in all sovereign matters.",
                },
                {
                  title: "Legislative Body",
                  description:
                    "Laws and policies are established through deliberative processes that reflect the values, traditions, and needs of the Nation of Moab.",
                },
                {
                  title: "Judicial Framework",
                  description:
                    "Justice is administered according to our constitutional principles, ensuring fair and equitable treatment for all citizens.",
                },
                {
                  title: "Administrative Offices",
                  description:
                    "Various offices and departments manage the day-to-day operations, services, and programs of the Sultanate.",
                },
              ].map((branch) => (
                <div
                  key={branch.title}
                  className="p-6 border border-[var(--gray-200)] rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                    {branch.title}
                  </h3>
                  <p className="text-[var(--gray-500)] text-sm leading-relaxed">
                    {branch.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
              Constitutional Principles
            </h2>
            <p className="text-[var(--gray-700)] leading-relaxed mb-8">
              The Constitution of the Sultanate of Amexem serves as the supreme
              law of the nation. It establishes the framework for governance,
              defines the rights and responsibilities of citizens, and enshrines
              the sovereign status of the Nation of Moab.
            </p>

            <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-8">
              <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">
                Foundational Articles
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    title: "Sovereignty",
                    text: "The Sultanate of Amexem is a sovereign entity, serving as Custodian of the Nation of Moab.",
                  },
                  {
                    title: "Rights of Citizens",
                    text: "All citizens are entitled to the protections, services, and recognition afforded by the Sultanate.",
                  },
                  {
                    title: "Cultural Preservation",
                    text: "The heritage, traditions, and history of the Nation of Moab shall be preserved and promoted.",
                  },
                  {
                    title: "Justice",
                    text: "All matters of law shall be administered fairly and in accordance with constitutional principles.",
                  },
                  {
                    title: "Community",
                    text: "The Sultanate shall foster unity, mutual support, and collective advancement among its citizens.",
                  },
                ].map((article, i) => (
                  <li key={article.title} className="flex gap-4">
                    <span className="text-sm font-bold text-[var(--forest-green)] mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="font-semibold text-[var(--gray-900)]">
                        {article.title}:
                      </span>{" "}
                      <span className="text-[var(--gray-700)]">
                        {article.text}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
