import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Contact Antara for reservations and travel planning.",
};

export default function ContactPage() {
  return <ContactForm />;
}
