import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Development — Sultanate of Amexem Economics",
  description:
    "Build generational wealth through the Sultanate of Amexem's asset development programs — real estate, intellectual property, and collective ownership structured for long-term prosperity.",
  alternates: { canonical: "/economics/asset-development" },
};

export default function AssetDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
