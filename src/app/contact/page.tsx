import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Sultanate of Amexem with questions, inquiries, or to begin your citizenship journey.",
};

export default function ContactPage() {
  return <ContactForm />;
}
