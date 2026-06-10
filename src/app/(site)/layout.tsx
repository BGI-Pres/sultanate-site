import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MicrosoftClarity from "@/components/MicrosoftClarity";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MicrosoftClarity />
      <Analytics />
    </>
  );
}
