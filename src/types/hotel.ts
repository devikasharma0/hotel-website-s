export type Room = {
  id: string;
  slug: string;
  name: string;
  image: string;
  occupancy: number;
  bedType: string;
  amenities: string[];
  pricePerNight: number;
  available: boolean;
};

export type Review = {
  id: string;
  guestName: string;
  rating: number;
  text: string;
  location?: string;
  date: string;
};

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  location: string;
  destination: string;
  destinationSlug: string;
  description: string;
  shortDescription: string;
  images: string[];
  rating: number;
  reviewCount: number;
  amenities: string[];
  rooms: Room[];
  priceFrom: number;
  propertyType: string;
  maxGuests: number;
  roomCount: number;
  experiences: string[];
  mapEmbedUrl: string;
  reviews: Review[];
  /** ISO date; falls back to siteConfig.contentUpdated in the sitemap. */
  updatedAt?: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  travelTips: string[];
  highlights: string[];
  /** ISO date; falls back to siteConfig.contentUpdated in the sitemap. */
  updatedAt?: string;
};

export type ExperienceCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  id: string;
  guestName: string;
  rating: number;
  text: string;
  stayLocation: string;
};
