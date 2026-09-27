import { siteConfig } from "@/lib/site";
import type { Destination, Hotel } from "@/types/hotel";

/**
 * schema.org builders.
 *
 * Nodes carry stable `@id`s so they can reference each other rather than
 * repeating themselves — the Organization defined once in the root layout is
 * the same entity every hotel page points its `parentOrganization` at.
 */

const BASE = siteConfig.url.replace(/\/$/, "");

export const abs = (path: string) =>
  `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const ORG_ID = `${BASE}/#organization`;
export const SITE_ID = `${BASE}/#website`;

/** "Old Manali, Himachal Pradesh" -> a PostalAddress. */
function postalAddress(location: string) {
  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);
  return {
    "@type": "PostalAddress",
    ...(parts.length > 1
      ? { addressLocality: parts[0], addressRegion: parts.slice(1).join(", ") }
      : { addressLocality: parts[0] ?? location }),
    addressCountry: "IN",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: abs("/"),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: {
      "@type": "ImageObject",
      url: abs("/brand/antara-logo.svg"),
      caption: `${siteConfig.name} logo`,
    },
    image: abs("/brand/og-default.png"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: postalAddress(siteConfig.contact.address),
    areaServed: { "@type": "Country", name: "India" },
    // Only real profiles belong in sameAs — a bare platform homepage tells a
    // search or AI engine nothing about which "Antara" this is, and dilutes
    // the profiles that do resolve. Placeholders drop out until filled in.
    sameAs: Object.values(siteConfig.social).filter(
      (url) => new URL(url).pathname.replace(/\/$/, "").length > 0,
    ),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: siteConfig.name,
    url: abs("/"),
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    // /hotels filters on ?query=, so the site search is a real endpoint.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: abs("/hotels?query={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Trail should start at the item below Home; Home is prepended. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: abs(item.path),
      }),
    ),
  };
}

export function faqSchema(items: { q: string; a: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function hotelSchema(hotel: Hotel) {
  const url = abs(`/hotels/${hotel.slug}`);
  const prices = hotel.rooms.map((r) => r.pricePerNight);

  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${url}#hotel`,
    name: hotel.name,
    description: hotel.description,
    url,
    image: hotel.images.slice(0, 6).map((src) => src),
    address: postalAddress(hotel.location),
    parentOrganization: { "@id": ORG_ID },
    telephone: siteConfig.contact.phone,
    priceRange: prices.length
      ? `₹${Math.min(...prices)}–₹${Math.max(...prices)}`
      : `₹${hotel.priceFrom}+`,
    currenciesAccepted: "INR",
    numberOfRooms: hotel.roomCount,
    petsAllowed: false,
    amenityFeature: hotel.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    containsPlace: hotel.rooms.map((room) => ({
      "@type": "HotelRoom",
      name: room.name,
      bed: { "@type": "BedDetails", typeOfBed: room.bedType },
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: room.occupancy,
        unitCode: "C62",
      },
      amenityFeature: room.amenities.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
    })),
    makesOffer: hotel.rooms.map((room) => ({
      "@type": "Offer",
      name: room.name,
      availability: room.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: room.pricePerNight,
        priceCurrency: "INR",
        unitText: "night",
      },
      url: `${url}#${room.slug}`,
    })),
    // Ratings and reviews are withheld until they come from real guests —
    // see HAS_VERIFIED_REVIEWS in lib/site.ts.
    ...(siteConfig.hasVerifiedReviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: hotel.rating,
            reviewCount: hotel.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
          review: hotel.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.guestName },
            datePublished: r.date,
            reviewBody: r.text,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {}),
  };
}

export function destinationSchema(destination: Destination, hotels: Hotel[]) {
  const url = abs(`/destinations/${destination.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${url}#destination`,
    name: destination.name,
    description: destination.description,
    url,
    image: [destination.heroImage, ...destination.gallery.slice(0, 4)],
    address: postalAddress(`${destination.name}, ${destination.region}`),
    touristType: destination.highlights,
    includesAttraction: destination.highlights.map((name) => ({
      "@type": "TouristAttraction",
      name,
    })),
    containsPlace: hotels.map((h) => ({
      "@type": "Hotel",
      "@id": `${abs(`/hotels/${h.slug}`)}#hotel`,
      name: h.name,
      url: abs(`/hotels/${h.slug}`),
    })),
  };
}
