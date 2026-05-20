import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAlbums, getLyrics } from "@/lib/content-data";
import type { Locale } from "@/types/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://losaldeanos.com";

const staticPaths = [
  "",
  "/historia",
  "/discografia",
  "/multimedia",
  "/letras",
  "/legado",
  "/comunidad",
  "/sobre",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${siteUrl}/es${path}`,
            en: `${siteUrl}/en${path}`,
          },
        },
      });
    }

    const l = locale as Locale;
    for (const lyric of getLyrics(l)) {
      entries.push({
        url: `${siteUrl}/${locale}/letras/${lyric.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }

    for (const album of getAlbums(l)) {
      entries.push({
        url: `${siteUrl}/${locale}/discografia#${album.slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
