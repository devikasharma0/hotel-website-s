import type { ExperienceCategory, Testimonial } from "@/types/hotel";

export const experienceCategories: ExperienceCategory[] = [
  {
    slug: "mountain-escapes",
    title: "Mountain escapes",
    description: "High-altitude stays with crisp air, forest trails, and fireside evenings.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  },
  {
    slug: "romantic-stays",
    title: "Romantic stays",
    description: "Private decks, candlelit dining, and rooms designed for two.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  },
  {
    slug: "adventure",
    title: "Adventure",
    description: "Safaris, hikes, and guided days that start before sunrise.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
  },
  {
    slug: "wellness",
    title: "Wellness",
    description: "Spa rituals, yoga, and nutrition-forward menus for restoration.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
  },
  {
    slug: "family-getaways",
    title: "Family getaways",
    description: "Connecting rooms, gentle activities, and space for everyone to breathe.",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
  },
  {
    slug: "nature-retreats",
    title: "Nature retreats",
    description: "River valleys, orchards, and coastlines where the landscape leads.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    guestName: "Meera Shah",
    rating: 5,
    text: "Every detail felt considered — from the scent in the lobby to the way staff anticipated our schedule without hovering.",
    stayLocation: "Cedar Ridge, Manali",
  },
  {
    id: "t2",
    guestName: "Arjun & Neha",
    rating: 5,
    text: "We wanted quiet, not isolation. Meridian properties strike that balance beautifully.",
    stayLocation: "Laterite Shores, Goa",
  },
  {
    id: "t3",
    guestName: "Sophie Laurent",
    rating: 5,
    text: "The photography does not exaggerate. The light in Ranikhet at dawn is unreal.",
    stayLocation: "Orchard Retreat, Ranikhet",
  },
  {
    id: "t4",
    guestName: "Vikram Desai",
    rating: 4,
    text: "Booking was straightforward, rooms were spotless, and the safari team at Corbett was outstanding.",
    stayLocation: "Kosi Safari Lodge",
  },
];

export const galleryImages: { src: string; alt: string; span?: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    alt: "Luxury hotel pool at dusk",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    alt: "Mountain lodge exterior in snow",
  },
  {
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    alt: "Palm trees framing a coastal resort",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    alt: "Minimal hotel bedroom with linen bedding",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    alt: "Safari lodge deck overlooking forest",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    alt: "Spa treatment room with warm lighting",
  },
];
