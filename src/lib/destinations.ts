import { destinations } from "@/data/destinations";
import type { Destination } from "@/types/hotel";

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
