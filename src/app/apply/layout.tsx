import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Membership — Sultanate of Amexem",
  description:
    "Submit your membership application to the Sultanate of Amexem. Open to descendants of the Nation of Moab seeking to reclaim Moorish American nationality and join a self-determined community.",
  alternates: { canonical: "/apply" },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
