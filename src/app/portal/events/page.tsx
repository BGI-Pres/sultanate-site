"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";

const events = [
  {
    title: "Holy Day Meeting",
    schedule: "Every Friday",
    time: "7:30 PM CST",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21",
  },
  {
    title: "New Members Orientation",
    schedule: "Last Friday of Every Month",
    time: "7:30 PM CST",
    icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  },
  {
    title: "Business Mastermind",
    schedule: "2nd Saturday of Every Month",
    time: "TBA",
    icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
];

const ticketTypes = ["Early Bird", "General Admission (GA)", "VIP"] as const;

export default function PortalEventsPage() {
  const [rsvpCounts, setRsvpCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRsvpCounts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("event_rsvps")
          .select("event_name");

        if (error) throw error;

        const counts: Record<string, number> = {};
        for (const row of data ?? []) {
          counts[row.event_name] = (counts[row.event_name] || 0) + 1;
        }
        setRsvpCounts(counts);
      } catch {
        setRsvpCounts({});
      } finally {
        setLoading(false);
      }
    }

    fetchRsvpCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Events</h1>
        <p className="text-[var(--gray-500)] mt-1">
          RSVP tracking and ticket management for Sultanate events
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event) => {
          const count = rsvpCounts[event.title];
          const displayCount = loading ? "..." : count != null ? count : "—";

          return (
            <div
              key={event.title}
              className="bg-white rounded-xl border border-[var(--gray-200)] p-6 hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              {/* Top: Event name + schedule */}
              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--dark-bg)] shrink-0">
                  <svg
                    className="w-5 h-5 text-[var(--gold)]"
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

                <div>
                  <h2 className="text-lg font-semibold text-[var(--gray-900)]">
                    {event.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                    <span className="flex items-center gap-1.5 text-[var(--gold)] font-medium">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {event.schedule}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--gray-500)]">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle: Stats row */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2 bg-[var(--gold)]/10 text-[var(--gold)] px-3 py-1.5 rounded-lg text-sm font-semibold">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  RSVPs Confirmed: {displayCount}
                </div>

                <div className="h-5 w-px bg-[var(--gray-200)]" />

                {ticketTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--gray-500)] bg-[var(--gray-100)] px-2.5 py-1 rounded-full"
                  >
                    {type}
                    <span className="text-[var(--gray-400)]">&mdash;</span>
                  </span>
                ))}
              </div>

              {/* Bottom: View RSVPs link */}
              <div className="pt-4 border-t border-[var(--gray-100)]">
                <Link
                  href="/admin/rsvps"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                >
                  View RSVPs
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
