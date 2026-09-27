/**
 * Homepage hero content. Edit copy here, not in the component.
 *
 * image: set to a local path (e.g. "/hero/antara-katra-hero.webp") once the
 * real hero photo is ready. While it is null the hero shows the built-in
 * dusk illustration of the Trikuta hills, which needs no image download.
 * Keep the final photo under ~150 KB (WebP/AVIF) so mobile LCP stays < 2.5 s.
 */
export const homeHero = {
  eyebrow: "Jai Mata Di · Antara Katra",
  title: "Darshan with warmth.",
  subtitle:
    "A calm, clean stay near the Vaishno Devi yatra route, where every pilgrim is looked after like family.",
  primaryCta: { label: "Book your stay", href: "/book" },
  whatsappCta: {
    label: "WhatsApp us",
    note: "We reply like family",
    message: "Jai Mata Di! I'd like to know about a stay at Antara Katra.",
  },
  // Only list promises the Katra team can deliver from day one.
  trustChips: [
    "Senior-friendly rooms",
    "Sattvic meals",
    "Yatra help desk",
    "Family updates on WhatsApp",
  ],
  image: null as null | { src: string; alt: string },
};
