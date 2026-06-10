import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Ventures — Sultanate of Amexem Economics",
  description:
    "Propose and develop institutional ventures under the Sultanate of Amexem framework. Build enterprises that generate wealth and serve the Moorish American community.",
  alternates: { canonical: "/economics/ventures" },
};

export default function VenturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
