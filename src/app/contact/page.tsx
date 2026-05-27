import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Sultanate of Amexem with questions, inquiries, or to begin your membership journey.",
};

export default function ContactPage() {
  return <ContactForm />;
}
