import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events and gatherings of the Sultanate of Amexem — assemblies, workshops, education sessions, and orientations for the descendants of the Nation of Moab.",
};

const events = [
  {
    title: "Monthly Assembly",
    frequency: "First Saturday of Every Month",
    description:
      "The Monthly Assembly is the primary gathering of the Sultanate membership. Governance updates, policy announcements, and community discussion take place in a structured format under the authority of the Executive Director and Supreme Grand Counsel. All active members are expected to attend.",
    icon: (
      <svg
        className="w-6 h-6 text-[var(--gold)]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Economic Workshop Series",
    frequency: "Bi-Weekly",
    description:
      "A practical workshop series focused on cooperative commerce and wealth building within the Sultanate framework. Sessions cover collective economics, business development, financial literacy, and the institutional infrastructure of Bey Group International. Open to all members committed to economic security.",
    icon: (
      <svg
        className="w-6 h-6 text-[var(--gold)]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Heritage Education Session",
    frequency: "Monthly",
    description:
      "An educational session dedicated to the history, traditions, customs, and culture of the Nation of Moab. These sessions ensure that our heritage is preserved, understood, and transmitted to every generation. Topics include nationality law, ancestral governance, and the global presentation of our people.",
    icon: (
      <svg
        className="w-6 h-6 text-[var(--gold)]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    title: "New Member Orientation",
    frequency: "As Scheduled",
    description:
      "A structured introduction to the Sultanate of Amexem for prospective members and newly enrolled nationals. Orientation covers the history and mission of the Sultanate, the rights and responsibilities of membership, and the pathway to full participation in our governance and economic institutions.",
    icon: (
      <svg
        className="w-6 h-6 text-[var(--gold)]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
];

export default function EventsPage() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Events &amp; Gatherings
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The Sultanate of Amexem convenes its membership through regular
            assemblies, workshops, and educational sessions. These gatherings
            are the backbone of our governance — where policy is communicated,
            economics are built, and our heritage is preserved.
          </p>
        </div>
      </section>

      {/* ── Events Grid ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Upcoming Events
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Regular Gatherings of the Nation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6 md:p-8 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] shrink-0">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--gray-900)]">
                      {event.title}
                    </h3>
                    <span className="text-sm text-[var(--gold)] font-medium">
                      {event.frequency}
                    </span>
                  </div>
                </div>
                <p className="text-[var(--gray-700)] leading-relaxed text-[15px] mb-6">
                  {event.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] hover:text-[var(--gold)]/80 transition-colors duration-300"
                >
                  Register Interest
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stand with Your Nation
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Full participation in Sultanate events is a right of membership.
              If you are a descendant of the Nation of Moab and have not yet
              proclaimed your nationality, now is the time. Join us and take
              your place in the assemblies that shape our collective future.
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
