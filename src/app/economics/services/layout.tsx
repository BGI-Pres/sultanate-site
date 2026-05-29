import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Services — Sultanate of Amexem Economics",
  description:
    "Discover and offer professional services within the Sultanate of Amexem membership network. Skilled professionals serving a self-determined Moorish American community.",
  alternates: { canonical: "/economics/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
