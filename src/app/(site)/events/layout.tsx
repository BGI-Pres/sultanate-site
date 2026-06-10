import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — Weekly Meetings & Gatherings of the Sultanate of Amexem",
  description:
    "Attend the Sultanate of Amexem's public virtual events — Friday Holy Day meetings, new member orientation, and business mastermind sessions. RSVP required.",
  alternates: { canonical: "/events" },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
