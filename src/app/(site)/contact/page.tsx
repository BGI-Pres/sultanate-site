import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact the Sultanate of Amexem — Chicago, Illinois",
  description:
    "Reach the Sultanate of Amexem in Chicago, IL for membership inquiries, general questions, or to connect with the Moorish American community.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
