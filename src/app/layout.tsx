import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from "@/components/GoogleTagManager";
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
    canonical: "/",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
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
      <head>
        <GoogleTagManagerScript />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleTagManagerNoscript />
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
              "@type": "WebSite",
              name: "Sultanate of Amexem",
              url: "https://www.sultanateofamexem.info",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.sultanateofamexem.info/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MicrosoftClarity />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
