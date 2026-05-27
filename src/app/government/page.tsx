import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Constitution",
  description:
    "The governance structure, constitutional framework, and legal principles of the Sultanate of Amexem.",
};

const branches = [
  {
    title: "Executive Authority",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    description:
      "The Sultan serves as head of state and chief custodian, providing executive leadership and representing the nation in all official matters.",
  },
  {
    title: "Legislative Body",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    description:
      "Laws and policies are established through deliberative processes that reflect the values, traditions, and needs of the Nation of Moab.",
  },
  {
    title: "Judicial Framework",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
    description:
      "Justice is administered according to our constitutional principles, ensuring fair and equitable treatment for all citizens.",
  },
  {
    title: "Administrative Offices",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    description:
      "Various offices and departments manage the day-to-day operations, services, and programs of the Sultanate.",
  },
];

const articles = [
  {
    title: "Governing Authority",
    text: "The Sultanate of Amexem is an established governing authority, serving as Custodian of the Nation of Moab.",
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
            The governance structure and constitutional framework of the
            Sultanate of Amexem, established to serve the Nation of Moab.
          </p>
        </div>
      </section>

      {/* ── Governance Structure ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Governance Structure
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
              A Framework for Executive Leadership
            </h2>
            <p className="text-[var(--gray-700)] leading-relaxed mb-10 text-[15px]">
              The Sultanate of Amexem operates under a structured governance
              framework designed to uphold the rights and standing of the
              Nation of Moab. Our government is organized to ensure effective
              leadership, just administration, and faithful custodianship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <div
                  key={branch.title}
                  className="p-6 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center mb-4">
                    {branch.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
                    {branch.title}
                  </h3>
                  <p className="text-[var(--gray-500)] text-sm leading-relaxed">
                    {branch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Constitutional Principles ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Constitutional Principles
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              The Supreme Law of the Nation
            </h2>
            <p className="text-white/60 leading-relaxed mb-10 text-[15px]">
              The Constitution of the Sultanate of Amexem serves as the supreme
              law of the nation. It establishes the framework for governance,
              defines the rights and responsibilities of citizens, and enshrines
              the established standing of the Nation of Moab.
            </p>

            <div className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/5 p-5 md:p-10">
              <h3 className="text-lg font-semibold text-white mb-6">
                Foundational Articles
              </h3>
              <ol className="space-y-6">
                {articles.map((article, i) => (
                  <li key={article.title} className="flex gap-4">
                    <span className="text-2xl font-bold text-[var(--gold)] opacity-80 leading-none mt-0.5 w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="font-semibold text-white">
                        {article.title}:
                      </span>{" "}
                      <span className="text-white/70">
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

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Participate in Our Nation
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Learn more about citizenship and how you can contribute to the
              governance and growth of the Sultanate of Amexem.
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
