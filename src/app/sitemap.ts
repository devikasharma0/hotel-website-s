import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/lib/destinations";
import { getAllHotels } from "@/lib/hotels";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  // A build timestamp would tell crawlers every page changed on every deploy,
  // which is a false freshness signal. Report when content actually changed.
  const fallback = new Date(siteConfig.contentUpdated);
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
      lastModified: fallback,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getAllHotels().map((h) => ({
      url: `${base}/hotels/${h.slug}`,
      lastModified: h.updatedAt ? new Date(h.updatedAt) : fallback,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllDestinations().map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      lastModified: d.updatedAt ? new Date(d.updatedAt) : fallback,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}
