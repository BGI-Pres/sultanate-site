"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

const events = [
  {
    title: "Holy Day Meeting",
    schedule: "Every Friday",
    time: "7:30 PM CST",
    description:
      "Weekly assembly — governance updates, spiritual grounding, and community business.",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21",
  },
  {
    title: "New Members Orientation",
    schedule: "Last Friday of Every Month",
    time: "7:30 PM CST",
    description:
      "Structured introduction covering the Holy Koran, Divine Constitution & Bylaws, and the Moorish Questionnaire.",
    icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  },
  {
    title: "Business Mastermind",
    schedule: "2nd Saturday of Every Month",
    time: "TBA",
    description:
      "Cooperative commerce, business development, and economic strategy within the Sultanate framework.",
    icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
];

function EventCard({
  event,
  user,
  myRsvps,
  onRsvp,
}: {
  event: (typeof events)[number];
  user: User | null;
  myRsvps: string[];
  onRsvp: (eventName: string) => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const hasRsvpd = myRsvps.includes(event.title);

  async function handleRsvp() {
    setSubmitting(true);
    await onRsvp(event.title);
    setSubmitting(false);
  }

  return (
    <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5 hover:border-[var(--gold)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--dark-bg)] flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={event.icon} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--gray-900)] text-sm">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-[var(--gray-500)]">
            <span className="text-[var(--gold)] font-medium">{event.schedule}</span>
            <span>{event.time}</span>
          </div>
          <p className="text-xs text-[var(--gray-500)] mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
        <div className="shrink-0">
          {hasRsvpd ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              RSVPd
            </span>
          ) : (
            <button
              onClick={handleRsvp}
              disabled={submitting}
              className="px-3 py-1.5 bg-[var(--gold)] text-[var(--dark-bg)] text-xs font-semibold rounded-lg hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50"
            >
              {submitting ? "..." : "RSVP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortalEventsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [myRsvps, setMyRsvps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData.user;
      setUser(currentUser);

      if (currentUser?.email) {
        const { data } = await supabase
          .from("event_rsvps")
          .select("event_name")
          .eq("email", currentUser.email);
        if (data) setMyRsvps(data.map((r) => r.event_name));
      }
      setLoading(false);
    }
    init();
  }, []);

  async function handleRsvp(eventName: string) {
    if (!user) return;
    const supabase = createClient();
    const { error } = await supabase.from("event_rsvps").insert({
      event_name: eventName,
      name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
      email: user.email,
      phone: null,
    });
    if (!error) setMyRsvps((prev) => [...prev, eventName]);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Events</h1>
        <p className="text-[var(--gray-500)] mt-1">
          Upcoming gatherings and your RSVP status
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <EventCard
              key={event.title}
              event={event}
              user={user}
              myRsvps={myRsvps}
              onRsvp={handleRsvp}
            />
          ))}
        </div>
      )}
    </div>
  );
}
