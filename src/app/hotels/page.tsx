import { Suspense } from "react";
import type { Metadata } from "next";
import { HotelsListing } from "@/components/hotels/HotelsListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Hotels & retreats",
  description:
    "Browse boutique hotels and retreats across India. Filter by destination, price, and amenities.",
  alternates: { canonical: "/hotels" },
};

export default function HotelsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Hotels", path: "/hotels" }])} />
      <Suspense
        fallback={
          <div className="mx-auto max-w-content px-5 py-32 text-center text-ink-soft">
            Loading stays…
          </div>
        }
      >
        <HotelsListing />
      </Suspense>
    </>
  );
}
