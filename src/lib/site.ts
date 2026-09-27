export const siteConfig = {
  name: "Antara",
  tagline: "Curated stays in extraordinary destinations",
  description:
    "Antara offers thoughtfully designed boutique hotels and retreats across India's most inspiring landscapes — warm hospitality, editorial design, and seamless booking.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "hello@antara.in",
    phone: "+91 98765 43210",
    address: "12 Ridge Lane, Shimla, Himachal Pradesh 171001",
  },
  /**
   * The reviews in src/data/hotels.ts are placeholder copy, identical across
   * every property. Marking placeholder ratings up as real guest reviews
   * breaks Google's structured-data policy and risks a manual action, so the
   * Review and AggregateRating nodes stay out of the JSON-LD while this is
   * false. Flip it to true once real reviews are wired — the schema for both
   * is already written in lib/schema.ts.
   */
  hasVerifiedReviews: false,
  /**
   * Last content review, ISO date. The sitemap reports this instead of the
   * build time, so <lastmod> stops claiming every page changed on every
   * deploy. Bump it when content actually changes; individual hotels and
   * destinations can override with their own `updatedAt`.
   */
  contentUpdated: "2026-09-27",
  social: {
    instagram: "https://www.instagram.com/antarahotels",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};
