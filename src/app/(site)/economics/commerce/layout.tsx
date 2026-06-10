import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moorish American Commerce — Sultanate of Amexem",
  description:
    "List your business in the Sultanate of Amexem's cooperative commerce network. Connect with Moorish American consumers and enterprises committed to economic self-determination.",
  alternates: { canonical: "/economics/commerce" },
};

export default function CommerceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
