/**
 * Canonical site URL for metadata, sitemap and robots.
 * Order: NEXT_PUBLIC_SITE_URL (set this in Vercel to https://antarahotels.com),
 * then Vercel's production domain, then localhost for local dev only.
 * Without this, a deploy with no env var published localhost URLs.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Antara",
  tagline: "Darshan with warmth",
  description:
    "Antara offers thoughtfully designed boutique hotels and retreats across India's most inspiring landscapes — warm hospitality, editorial design, and seamless booking.",
  url: resolveSiteUrl(),
  contact: {
    email: "hello@antara.in",
    phone: "+91 98765 43210",
    // Digits only, with country code, for wa.me links. Placeholder until the
    // Katra WhatsApp Business number is live.
    whatsapp: "919876543210",
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
