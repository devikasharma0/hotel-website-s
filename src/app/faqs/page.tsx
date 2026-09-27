import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/faqs" },
  title: "FAQs",
  description: "Booking policies and frequently asked questions.",
};

const faqs = [
  {
    q: "How do I modify or cancel a reservation?",
    a: "Contact our reservations desk with your confirmation reference. Cancellation terms depend on the rate you selected — see our cancellation policy for details.",
  },
  {
    q: "Are prices inclusive of taxes?",
    a: "Displayed prices are starting rates per night. Applicable taxes and service charges are shown before you confirm a booking.",
  },
  {
    q: "Do you accommodate dietary preferences?",
    a: "Yes. Share requirements when booking or at check-in — our kitchens are experienced with vegetarian, vegan, and allergy-aware menus.",
  },
  {
    q: "Is payment collected on this website?",
    a: "This demo site confirms bookings without payment. Production deployments connect to your preferred payment gateway.",
  },
];

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <JsonLd
        schema={[
          faqSchema(faqs, "/faqs"),
          breadcrumbSchema([{ name: "FAQs", path: "/faqs" }]),
        ]}
      />
      <SectionHeading
        as="h1"
        eyebrow="Support"
        title="Frequently asked questions"
        description="Quick answers about booking, stays, and policies."
      />
      <dl className="mt-12 space-y-8">
        {faqs.map((item) => (
          <div key={item.q} className="border-b border-line pb-8">
            <dt className="font-display text-xl text-ink">{item.q}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-ink-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
