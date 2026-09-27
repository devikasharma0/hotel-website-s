import type { Hotel, Review, Room } from "@/types/hotel";
import { LOREM_FAQS, LOREM_LONG, LOREM_PARAGRAPH } from "@/lib/lorem";

/**
 * Extra licensed photography, pooled so every property has enough frames to
 * fill a gallery. Rotated per hotel rather than shared verbatim, so two
 * properties never open on the same picture.
 */
const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=85",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=85",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=85",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1600&q=85",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1600&q=85",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=85",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=85",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=85",
  "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=1600&q=85",
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=85",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=85",
];

const GALLERY_SIZE = 14;

const defaultReviews = (location: string): Review[] => [
  {
    id: "1",
    guestName: "Ananya Mehta",
    rating: 5,
    text: "Impeccable service without feeling formal. The views at sunrise alone were worth the trip.",
    location: "Mumbai",
    date: "2025-11-12",
  },
  {
    id: "2",
    guestName: "Rahul & Priya",
    rating: 5,
    text: "Thoughtful design in every corner — it felt like a magazine spread we could live in for a week.",
    location: "Delhi",
    date: "2025-10-03",
  },
  {
    id: "3",
    guestName: "James Porter",
    rating: 4,
    text: "Quiet, warm, and genuinely comfortable. Staff remembered our preferences by day two.",
    location: "London",
    date: "2025-09-18",
  },
];

function rooms(prefix: string, basePrice: number, images: string[]): Room[] {
  return [
    {
      id: `${prefix}-garden`,
      slug: "garden-suite",
      name: "Garden Suite",
      image: images[0],
      images: [images[0], images[1] ?? images[0], images[2] ?? images[0]],
      description: LOREM_PARAGRAPH,
      occupancy: 2,
      bedType: "King",
      amenities: ["Rain shower", "Workspace", "Tea station", "Wi‑Fi"],
      pricePerNight: basePrice,
      available: true,
    },
    {
      id: `${prefix}-valley`,
      slug: "valley-room",
      name: "Valley View Room",
      image: images[1] ?? images[0],
      images: [images[1] ?? images[0], images[2] ?? images[0], images[0]],
      description: LOREM_PARAGRAPH,
      occupancy: 3,
      bedType: "Queen + single",
      amenities: ["Balcony", "Heater", "Wi‑Fi", "In-room dining"],
      pricePerNight: basePrice + 2200,
      available: true,
    },
    {
      id: `${prefix}-family`,
      slug: "family-retreat",
      name: "Family Retreat",
      image: images[2] ?? images[0],
      images: [images[2] ?? images[0], images[0], images[1] ?? images[0]],
      description: LOREM_PARAGRAPH,
      occupancy: 4,
      bedType: "Two queens",
      amenities: ["Living nook", "Bathtub", "Wi‑Fi", "Kids welcome kit"],
      pricePerNight: basePrice + 4500,
      available: true,
    },
  ];
}

const baseHotels: BaseHotel[] = [
  {
    id: "h1",
    slug: "cedar-ridge-manali",
    name: "Cedar Ridge Retreat",
    location: "Old Manali, Himachal Pradesh",
    destination: "Manali",
    destinationSlug: "manali",
    description:
      "Set among deodar trees with glimpses of the Beas, Cedar Ridge is a low-slung retreat built from local stone and warm timber. Days begin with valley light in the restaurant; evenings end by the hearth with Himalayan herbs and slow music.",
    shortDescription:
      "A forest-edge retreat with valley views and unhurried hospitality.",
    images: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85",
    ],
    rating: 4.9,
    reviewCount: 128,
    amenities: [
      "Spa",
      "Restaurant",
      "Wi‑Fi",
      "Mountain view",
      "Bonfire",
      "Workspace",
    ],
    rooms: rooms("cedar", 8500, [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ]),
    priceFrom: 8500,
    propertyType: "Boutique retreat",
    maxGuests: 12,
    roomCount: 18,
    experiences: ["Guided forest walk", "Local cuisine tasting", "Stargazing session"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.17%2C32.22%2C77.21%2C32.26&layer=mapnik",
    reviews: defaultReviews("Manali"),
  },
  {
    id: "h2",
    slug: "parvati-house-kasol",
    name: "Parvati House",
    location: "Kasol, Parvati Valley",
    destination: "Kasol",
    destinationSlug: "kasol",
    description:
      "Parvati House sits above the river — glass walls frame moving water and pine. Interiors are minimal and tactile: wool throws, hand-thrown ceramics, and a library of valley maps for spontaneous hikes.",
    shortDescription:
      "River-facing rooms and calm interiors in the heart of the valley.",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=85",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=85",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=85",
    ],
    rating: 4.8,
    reviewCount: 96,
    amenities: [
      "Restaurant",
      "Wi‑Fi",
      "Mountain view",
      "Workspace",
      "Pet friendly",
    ],
    rooms: rooms("parvati", 7200, [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    ]),
    priceFrom: 7200,
    propertyType: "Riverfront lodge",
    maxGuests: 10,
    roomCount: 14,
    experiences: ["Riverside yoga", "Village market visit", "Photography walk"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.30%2C32.00%2C77.34%2C32.04&layer=mapnik",
    reviews: defaultReviews("Kasol"),
  },
  {
    id: "h3",
    slug: "dhauladhar-villa-dharamshala",
    name: "Dhauladhar Villa",
    location: "Dharamkot, Dharamshala",
    destination: "Dharamshala",
    destinationSlug: "dharamshala",
    description:
      "Perched where the ridge opens to the range, Dhauladhar Villa pairs Tibetan craft with contemporary lines. Mornings are for monastery bells in the distance; afternoons for tea on the terrace.",
    shortDescription: "Ridge-top villa with monastery views and refined calm.",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=85",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=85",
    ],
    rating: 4.9,
    reviewCount: 112,
    amenities: ["Spa", "Restaurant", "Wi‑Fi", "Mountain view", "Workspace"],
    rooms: rooms("dhauladhar", 9800, [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    ]),
    priceFrom: 9800,
    propertyType: "Hillside villa",
    maxGuests: 8,
    roomCount: 12,
    experiences: ["Monastery visit", "Tibetan cooking class", "Sunrise meditation"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=76.31%2C32.21%2C76.35%2C32.25&layer=mapnik",
    reviews: defaultReviews("Dharamshala"),
  },
  {
    id: "h4",
    slug: "meadow-lodge-dalhousie",
    name: "Meadow Lodge",
    location: "Khajjiar Road, Dalhousie",
    destination: "Dalhousie",
    destinationSlug: "dalhousie",
    description:
      "Meadow Lodge looks over rolling grassland — rooms are dressed in linen and oak, with windows meant for long reading sessions. The kitchen celebrates Himachali produce with a light, modern touch.",
    shortDescription: "Meadow views, fireside dining, and unhurried days.",
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=85",
    ],
    rating: 4.7,
    reviewCount: 84,
    amenities: ["Restaurant", "Wi‑Fi", "Mountain view", "Bonfire"],
    rooms: rooms("meadow", 7900, [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ]),
    priceFrom: 7900,
    propertyType: "Heritage lodge",
    maxGuests: 14,
    roomCount: 16,
    experiences: ["Meadow picnic", "Heritage walk", "Local folk evening"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=75.95%2C32.52%2C75.99%2C32.56&layer=mapnik",
    reviews: defaultReviews("Dalhousie"),
  },
  {
    id: "h5",
    slug: "kosi-safari-lodge-corbett",
    name: "Kosi Safari Lodge",
    location: "Ramnagar, Jim Corbett",
    destination: "Jim Corbett",
    destinationSlug: "jim-corbett",
    description:
      "Framed by sal trees at the forest edge, Kosi Safari Lodge is designed for early mornings and firelit nights. Naturalists on staff help plan drives; the pool stays shaded for afternoon respite.",
    shortDescription:
      "Forest-edge lodge with pool and expert safari planning.",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85",
    ],
    rating: 4.8,
    reviewCount: 143,
    amenities: ["Pool", "Restaurant", "Spa", "Wi‑Fi", "Bonfire"],
    rooms: rooms("kosi", 11200, [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ]),
    priceFrom: 11200,
    propertyType: "Safari lodge",
    maxGuests: 20,
    roomCount: 22,
    experiences: ["Jeep safari", "River walk", "Birding with naturalist"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=78.75%2C29.38%2C78.79%2C29.42&layer=mapnik",
    reviews: defaultReviews("Corbett"),
  },
  {
    id: "h6",
    slug: "orchard-retreat-ranikhet",
    name: "Orchard Retreat",
    location: "Ranikhet, Uttarakhand",
    destination: "Ranikhet",
    destinationSlug: "ranikhet",
    description:
      "Orchard Retreat is surrounded by apple trees and wide Himalayan views. Rooms are bright and airy; the spa uses local oils. Evenings invite slow conversations on the lawn.",
    shortDescription: "Orchard setting with spa rituals and snow-line views.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=85",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=85",
    ],
    rating: 4.9,
    reviewCount: 77,
    amenities: ["Spa", "Restaurant", "Wi‑Fi", "Mountain view", "Workspace"],
    rooms: rooms("orchard", 9100, [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
    ]),
    priceFrom: 9100,
    propertyType: "Hill retreat",
    maxGuests: 16,
    roomCount: 20,
    experiences: ["Orchard harvest walk", "Spa ritual", "Sunset viewpoint drive"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=79.43%2C29.62%2C79.47%2C29.66&layer=mapnik",
    reviews: defaultReviews("Ranikhet"),
  },
  {
    id: "h7",
    slug: "laterite-shores-goa",
    name: "Laterite Shores",
    location: "South Goa",
    destination: "Goa",
    destinationSlug: "goa",
    description:
      "Laterite Shores hides behind palms — a short path leads to a quiet stretch of sand. Interiors use laterite, teak, and cotton; the restaurant focuses on coastal produce and Goan spice without heaviness.",
    shortDescription:
      "Private coastal escape with shaded gardens and calm beach access.",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=85",
    ],
    rating: 4.8,
    reviewCount: 156,
    amenities: ["Pool", "Restaurant", "Spa", "Wi‑Fi", "Pet friendly"],
    rooms: rooms("laterite", 12500, [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    ]),
    priceFrom: 12500,
    propertyType: "Coastal resort",
    maxGuests: 24,
    roomCount: 28,
    experiences: ["Sunset sail", "Spice plantation visit", "Coastal cycling"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=73.90%2C15.25%2C73.94%2C15.29&layer=mapnik",
    reviews: defaultReviews("Goa"),
  },
  {
    id: "h8",
    slug: "skyline-cabins-manali",
    name: "Skyline Cabins",
    location: "Sethan, Manali",
    destination: "Manali",
    destinationSlug: "manali",
    description:
      "Above the valley floor, Skyline Cabins offer glass-fronted suites and crisp alpine air. Designed for couples and small groups, each cabin has a private deck for morning coffee above the clouds.",
    shortDescription: "Elevated glass-front cabins with private decks.",
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=85",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    ],
    rating: 4.9,
    reviewCount: 91,
    amenities: ["Restaurant", "Wi‑Fi", "Mountain view", "Bonfire", "Workspace"],
    rooms: rooms("skyline", 10200, [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
    ]),
    priceFrom: 10200,
    propertyType: "Alpine cabins",
    maxGuests: 8,
    roomCount: 10,
    experiences: ["Snowline hike", "Private deck breakfast", "Valley stargazing"],
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.15%2C32.25%2C77.19%2C32.29&layer=mapnik",
    reviews: defaultReviews("Sethan"),
  },
];

/**
 * Placeholder content layer.
 *
 * The long-form copy, FAQs and video below are stand-ins. Keeping them in one
 * decorator rather than copied into every record means real content replaces
 * them in a single place — and it is obvious at a glance what is still fake.
 */
type BaseHotel = Omit<Hotel, "about" | "checkIn" | "checkOut" | "video" | "faqs">;

function decorate(hotel: BaseHotel, i: number): Hotel {
  const extra = [
    ...GALLERY_POOL.slice(i % GALLERY_POOL.length),
    ...GALLERY_POOL.slice(0, i % GALLERY_POOL.length),
  ];
  const images = [...hotel.images];
  for (const src of extra) {
    if (images.length >= GALLERY_SIZE) break;
    if (!images.includes(src)) images.push(src);
  }

  return {
    ...hotel,
    images,
    about: LOREM_LONG,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    video: {
      src: "/video/placeholder-ambient.mp4",
      poster: hotel.images[1] ?? hotel.images[0],
    },
    faqs: LOREM_FAQS,
  };
}

export const hotels: Hotel[] = baseHotels.map(decorate);
