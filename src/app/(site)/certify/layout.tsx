import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moorish American Business Certification — Sultanate of Amexem",
  description:
    "Certify your business as a Moorish American enterprise through the Sultanate of Amexem. Gain institutional recognition, cooperative referrals, and a place in the Moorish economic network.",
  alternates: { canonical: "/certify" },
};

export default function CertifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
