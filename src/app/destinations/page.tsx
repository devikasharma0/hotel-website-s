import type { Metadata } from "next";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore mountain, forest, and coastal destinations across India with Meridian Collection.",
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <SectionHeading
        eyebrow="Destinations"
        title="Where will you go next?"
        description="Each region offers a distinct rhythm — browse guides, stays, and travel notes for every destination."
      />
      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d, i) => (
          <DestinationCard key={d.slug} destination={d} index={i} />
        ))}
      </div>
    </div>
  );
}
