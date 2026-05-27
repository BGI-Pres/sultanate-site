import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: {
    default: "Sultanate of Amexem — Custodian of the Nation of Moab",
    template: "%s | Sultanate of Amexem",
  },
  description:
    "Official website of the Sultanate of Amexem, Custodian of the Nation of Moab. Preserving heritage, upholding authority, and building community.",
  keywords: [
    "Sultanate of Amexem",
    "Nation of Moab",
    "authority",
    "heritage",
    "membership",
    "Moorish",
  ],
  openGraph: {
    title: "Sultanate of Amexem — Custodian of the Nation of Moab",
    description:
      "Preserving heritage, upholding authority, and building community for future generations.",
    type: "website",
    locale: "en_US",
    siteName: "Sultanate of Amexem",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sultanate of Amexem",
    description:
      "Custodian of the Nation of Moab. Preserving heritage, upholding authority, and building community.",
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
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
