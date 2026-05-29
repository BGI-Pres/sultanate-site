import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Card — Sultanate of Amexem",
  description:
    "Apply for your official Sultanate of Amexem membership card — a physical credential of your Moorish American nationality and standing within the Sultanate.",
  alternates: { canonical: "/apply/membership-card" },
};

export default function MembershipCardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
