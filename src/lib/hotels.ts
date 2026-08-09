import type { Hotel } from "@/types/hotel";
import { hotels } from "@/data/hotels";

export function getAllHotels(): Hotel[] {
  return hotels;
}

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find((h) => h.slug === slug);
}

export function getHotelsByDestination(destinationSlug: string): Hotel[] {
  return hotels.filter((h) => h.destinationSlug === destinationSlug);
}

export function getFeaturedHotels(limit = 6): Hotel[] {
  return [...hotels].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export type HotelFilters = {
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  sort?: "price-asc" | "price-desc" | "rating" | "name";
  query?: string;
};

export function filterHotels(filters: HotelFilters): Hotel[] {
  let result = [...hotels];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.destination.toLowerCase().includes(q),
    );
  }

  if (filters.destination && filters.destination !== "all") {
    result = result.filter((h) => h.destinationSlug === filters.destination);
  }

  if (filters.minPrice != null) {
    result = result.filter((h) => h.priceFrom >= filters.minPrice!);
  }

  if (filters.maxPrice != null) {
    result = result.filter((h) => h.priceFrom <= filters.maxPrice!);
  }

  if (filters.minRating != null) {
    result = result.filter((h) => h.rating >= filters.minRating!);
  }

  if (filters.amenities?.length) {
    result = result.filter((h) =>
      filters.amenities!.every((a) => h.amenities.includes(a)),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "price-desc":
      result.sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

export const amenityOptions = [
  "Spa",
  "Pool",
  "Restaurant",
  "Wi‑Fi",
  "Mountain view",
  "Pet friendly",
  "Workspace",
  "Bonfire",
] as const;
