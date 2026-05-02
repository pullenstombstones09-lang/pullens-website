import type { MetadataRoute } from "next";

const BASE = "https://pullenstombstones.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: "/", priority: 1.0 },
    { url: "/ranges", priority: 0.9 },
    { url: "/ranges/more-for-less", priority: 0.8 },
    { url: "/ranges/prestige", priority: 0.8 },
    { url: "/ranges/signature", priority: 0.8 },
    { url: "/ranges/exclusive", priority: 0.8 },
    { url: "/ranges/baby", priority: 0.8 },
    { url: "/about", priority: 0.7 },
    { url: "/contact", priority: 0.8 },
    { url: "/faq", priority: 0.7 },
    { url: "/specials", priority: 0.8 },
    { url: "/pinetown", priority: 0.7 },
    { url: "/blog", priority: 0.7 },
    { url: "/blog/how-to-choose-a-tombstone", priority: 0.6 },
    { url: "/blog/inscription-ideas", priority: 0.6 },
    { url: "/blog/covering-types-explained", priority: 0.6 },
  ];

  return pages.map((page) => ({
    url: `${BASE}${page.url}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: page.priority >= 0.8 ? "weekly" : "monthly",
    priority: page.priority,
  }));
}
