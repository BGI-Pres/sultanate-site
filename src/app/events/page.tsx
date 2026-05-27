import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Recurring events of the Sultanate of Amexem — weekly Holy Day meetings, new member orientation, and business mastermind sessions.",
};

const recurring = [
  {
    title: "Holy Day Meeting",
    schedule: "Every Friday",
    time: "7:30 PM CST",
    format: "Virtual",
    description:
      "The weekly assembly of the Sultanate. Governance updates, spiritual grounding, and community business are conducted under the authority of the Executive Director. All active members are expected to attend.",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21",
    highlight: true,
  },
  {
    title: "New Members Orientation",
    schedule: "Last Friday of Every Month",
    time: "7:30 PM CST",
    format: "Virtual",
    description:
      "A structured introduction for prospective and newly enrolled members. Covers the history and mission of the Sultanate, the Holy Koran, Divine Constitution & Bylaws, the Moorish Questionnaire, and the pathway to full membership.",
    icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    highlight: false,
  },
  {
    title: "Business Mastermind",
    schedule: "2nd Saturday of Every Month",
    time: "TBA",
    format: "Virtual",
    description:
      "A focused session on cooperative commerce, business development, and economic strategy within the Sultanate framework. Members share ventures, discuss trade network opportunities, and build the collective economic infrastructure.",
    icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    highlight: false,
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
            Events
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            The Sultanate convenes its membership through regular virtual
            gatherings — where governance is conducted, knowledge is
            transmitted, and economic infrastructure is built.
          </p>
        </div>
      </section>

      {/* ── Recurring Schedule ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Recurring Schedule
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Weekly &amp; Monthly Gatherings
          </h2>

          <div className="space-y-6">
            {recurring.map((event) => (
              <div
                key={event.title}
                className={`rounded-xl border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg ${
                  event.highlight
                    ? "border-[var(--gold)] ring-2 ring-[var(--gold)]/10"
                    : "border-[var(--gray-200)] hover:border-[var(--gold)]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] shrink-0">
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
                        d={event.icon}
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[var(--gray-900)]">
                        {event.title}
                      </h3>
                      {event.highlight && (
                        <span className="text-[10px] uppercase tracking-wider bg-[var(--gold)]/10 text-[var(--gold)] px-2 py-0.5 rounded-full font-semibold">
                          Weekly
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span className="flex items-center gap-1.5 text-[var(--gold)] font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        {event.schedule}
                      </span>
                      <span className="flex items-center gap-1.5 text-[var(--gray-500)]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-[var(--gray-500)]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        {event.format}
                      </span>
                    </div>

                    <p className="text-[var(--gray-700)] leading-relaxed text-[15px]">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Access note */}
          <div className="mt-8 p-4 rounded-lg bg-[var(--gray-50)] border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-500)] text-center">
              Meeting links are provided to registered members after sign-in.{" "}
              <Link href="/auth/login" className="text-[var(--gold)] font-medium hover:text-[var(--gold-dark)] transition-colors">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/apply" className="text-[var(--gold)] font-medium hover:text-[var(--gold-dark)] transition-colors">
                apply for membership
              </Link>{" "}
              to receive access.
            </p>
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
              Proclaim your nationality and take your place in the gatherings
              that shape our collective future.
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
