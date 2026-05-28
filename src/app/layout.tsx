import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sultanateofamexem.info"),
  title: {
    default: "Sultanate of Amexem — Moorish American Governing Authority | Chicago, IL",
    template: "%s | Sultanate of Amexem",
  },
  description:
    "The Sultanate of Amexem is the custodial governing authority for the descendants of the Nation of Moab, modernly identified as Moorish American. Reconstituted October 2020 in Chicago, Illinois. Cooperative economics, membership, and cultural preservation.",
  keywords: [
    "Sultanate of Amexem",
    "Moorish American",
    "Nation of Moab",
    "Noble Drew Ali",
    "Moorish Science Temple of America",
    "MSTA",
    "Moorish American membership",
    "cooperative economics",
    "Moorish American business certification",
    "Moorish American history",
    "Bey Group International",
    "Moorish heritage",
    "self-determination",
    "Chicago Illinois",
  ],
  authors: [{ name: "Sultanate of Amexem" }],
  creator: "Sultanate of Amexem",
  publisher: "Sultanate of Amexem",
  alternates: {
    canonical: "https://www.sultanateofamexem.info",
  },
  openGraph: {
    title: "Sultanate of Amexem — Moorish American Governing Authority",
    description:
      "Custodial governing authority for the descendants of the Nation of Moab. Cooperative economics, heritage preservation, and membership — reconstituted October 2020, Chicago, IL.",
    type: "website",
    locale: "en_US",
    url: "https://www.sultanateofamexem.info",
    siteName: "Sultanate of Amexem",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sultanateofamexem",
    creator: "@sultanateofamexem",
    title: "Sultanate of Amexem — Moorish American Governing Authority",
    description:
      "Custodial governing authority for the descendants of the Nation of Moab. Cooperative economics, heritage preservation, and membership.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sultanate of Amexem",
              url: "https://www.sultanateofamexem.info",
              logo: "https://www.sultanateofamexem.info/images/emblem.svg",
              description: "Custodial governing authority for the descendants of the Nation of Moab, modernly identified as Moorish American. Reconstituted October 2020 in Chicago, Illinois.",
              foundingDate: "2020-10",
              areaServed: { "@type": "Place", name: "Chicago, Illinois, United States" },
              sameAs: [
                "https://www.facebook.com/sultanateofamexem",
                "https://www.instagram.com/sultanateofamexem",
                "https://twitter.com/sultanateofamexem",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Event",
                name: "Holy Day Meeting",
                description: "Weekly assembly of the Sultanate of Amexem — governance updates, spiritual grounding, and community business.",
                eventSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "Friday", startTime: "19:30:00", scheduleTimezone: "America/Chicago" },
                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                organizer: { "@type": "Organization", name: "Sultanate of Amexem", url: "https://www.sultanateofamexem.info" },
                location: { "@type": "VirtualLocation", url: "https://www.sultanateofamexem.info/events" },
              },
              {
                "@context": "https://schema.org",
                "@type": "Event",
                name: "New Members Orientation",
                description: "Monthly orientation for prospective and newly enrolled members of the Sultanate of Amexem covering sacred texts and the Constitution.",
                eventSchedule: { "@type": "Schedule", repeatFrequency: "P1M", byDay: "Friday", startTime: "19:30:00", scheduleTimezone: "America/Chicago" },
                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                organizer: { "@type": "Organization", name: "Sultanate of Amexem", url: "https://www.sultanateofamexem.info" },
                location: { "@type": "VirtualLocation", url: "https://www.sultanateofamexem.info/events" },
              },
              {
                "@context": "https://schema.org",
                "@type": "Event",
                name: "Business Mastermind",
                description: "Monthly session on cooperative commerce, business development, and economic strategy within the Sultanate of Amexem framework.",
                eventSchedule: { "@type": "Schedule", repeatFrequency: "P1M", byDay: "Saturday", scheduleTimezone: "America/Chicago" },
                eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                organizer: { "@type": "Organization", name: "Sultanate of Amexem", url: "https://www.sultanateofamexem.info" },
                location: { "@type": "VirtualLocation", url: "https://www.sultanateofamexem.info/events" },
              },
            ]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the Sultanate of Amexem?",
                  acceptedAnswer: { "@type": "Answer", text: "The Sultanate of Amexem is the custodial governing authority for the descendants of the Nation of Moab, modernly identified as Moorish American. Reconstituted in October 2020 under the House of Simmons Bey in Chicago, Illinois." },
                },
                {
                  "@type": "Question",
                  name: "How do I become a member of the Sultanate of Amexem?",
                  acceptedAnswer: { "@type": "Answer", text: "Membership starts at the Affiliate tier, which is free and open to all. Attend meetings consistently for 3 months, complete the orientation study covering sacred texts and the Constitution, then apply for Community membership." },
                },
                {
                  "@type": "Question",
                  name: "What is the connection to Noble Drew Ali and the Moorish Science Temple of America?",
                  acceptedAnswer: { "@type": "Answer", text: "Noble Drew Ali rekindled the light of truth for Moorish Americans in the early twentieth century. The Moorish Science Temple of America established the framework for developmental growth. The Sultanate of Amexem stands on this foundation and governs by the same principles." },
                },
                {
                  "@type": "Question",
                  name: "How does the Sultanate's cooperative economics work?",
                  acceptedAnswer: { "@type": "Answer", text: "The Sultanate builds economic infrastructure from within its membership through cooperative commerce, business certification, a trade network, the Uplifting Fund for community investment, and institutional ventures like Bey Group International." },
                },
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
