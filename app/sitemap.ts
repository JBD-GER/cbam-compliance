import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/leistungen", priority: 0.95, changeFrequency: "monthly" },
  { path: "/leistungen/cbam-betroffenheitsanalyse", priority: 0.9, changeFrequency: "monthly" },
  { path: "/leistungen/cbam-readiness", priority: 0.9, changeFrequency: "monthly" },
  { path: "/leistungen/lieferanten-datenpaket", priority: 0.86, changeFrequency: "monthly" },
  { path: "/leistungen/cbam-registrierungsvorbereitung", priority: 0.86, changeFrequency: "monthly" },
  { path: "/leistungen/laufende-begleitung", priority: 0.85, changeFrequency: "monthly" },
  { path: "/cbam-kostenrechner", priority: 0.9, changeFrequency: "weekly" },
  { path: "/beratung", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fallstudien", priority: 0.75, changeFrequency: "monthly" },
  { path: "/ratgeber", priority: 0.85, changeFrequency: "weekly" },
  { path: "/ueber-uns", priority: 0.55, changeFrequency: "yearly" },
  { path: "/philosophie", priority: 0.5, changeFrequency: "yearly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteUrl).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...articles.map((article) => ({
      url: new URL(`/ratgeber/${article.slug}`, siteUrl).toString(),
      lastModified: new Date(`${article.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.72
    }))
  ];
}
