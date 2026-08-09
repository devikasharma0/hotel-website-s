import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/lib/destinations";
import { getAllHotels } from "@/lib/hotels";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/hotels",
    "/destinations",
    "/book",
    "/contact",
    "/about",
    "/faqs",
    "/privacy",
    "/terms",
    "/cancellation-policy",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getAllHotels().map((h) => ({
      url: `${base}/hotels/${h.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllDestinations().map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}
