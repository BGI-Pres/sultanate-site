import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cooperative Ventures — Sultanate of Amexem Economics",
  description:
    "Join cooperative ventures of the Sultanate of Amexem — collective ownership, shared equity, and cooperative economic development for Moorish Americans building generational wealth.",
  alternates: { canonical: "/economics/cooperative-ventures" },
};

export default function CooperativeVenturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
