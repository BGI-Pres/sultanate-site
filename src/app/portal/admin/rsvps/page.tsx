"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  created_at: string;
}

const EVENT_FILTERS = [
  "All",
  "Holy Day Meeting",
  "New Members Orientation",
  "Business Mastermind",
];

export default function RSVPsPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadRSVPs() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("event_rsvps")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          setError(true);
        } else if (data) {
          setRsvps(data as RSVP[]);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    loadRSVPs();
  }, []);

  const filteredRsvps =
    activeFilter === "All"
      ? rsvps
      : rsvps.filter((r) => r.event === activeFilter);

  const eventCounts = EVENT_FILTERS.reduce<Record<string, number>>(
    (acc, event) => {
      if (event === "All") {
        acc[event] = rsvps.length;
      } else {
        acc[event] = rsvps.filter((r) => r.event === event).length;
      }
      return acc;
    },
    {}
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Event RSVPs
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            View and manage event registrations
          </p>
        </div>
        <div className="text-sm text-[var(--gray-500)]">
          {rsvps.length} total RSVP{rsvps.length !== 1 ? "s" : ""}
        </div>
      </div>

      {error ? (
        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)] mb-2">
            Connect Supabase to see RSVP data
          </p>
          <p className="text-sm text-[var(--gray-500)]">
            Set{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in your Vercel environment variables.
          </p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <svg
            className="animate-spin h-6 w-6 text-[var(--gold)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {EVENT_FILTERS.map((event) => (
              <div
                key={event}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-4"
              >
                <p className="text-xs text-[var(--gray-500)] mb-1">{event}</p>
                <p className="text-xl font-bold text-[var(--gray-900)]">
                  {eventCounts[event]}
                </p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {EVENT_FILTERS.map((event) => (
              <button
                key={event}
                onClick={() => setActiveFilter(event)}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                  activeFilter === event
                    ? "bg-[var(--gold)] text-[var(--dark-bg)]"
                    : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                }`}
              >
                {event}
              </button>
            ))}
          </div>

          {/* Table */}
          {filteredRsvps.length === 0 ? (
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center">
              <p className="text-[var(--gray-500)]">No RSVPs yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--gray-200)]">
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Phone
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Event
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRsvps.map((rsvp) => (
                      <tr
                        key={rsvp.id}
                        className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]"
                      >
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)] font-medium">
                          {rsvp.name || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {rsvp.email || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {rsvp.phone || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {rsvp.event || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {new Date(rsvp.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
