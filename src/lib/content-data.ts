import timelineEs from "../../content/es/timeline.json";
import timelineEn from "../../content/en/timeline.json";
import albumsEs from "../../content/es/albums.json";
import albumsEn from "../../content/en/albums.json";
import lyricsEs from "../../content/es/lyrics.json";
import lyricsEn from "../../content/en/lyrics.json";
import biosEs from "../../content/es/bios.json";
import biosEn from "../../content/en/bios.json";
import quotesEs from "../../content/es/quotes.json";
import quotesEn from "../../content/en/quotes.json";
import galleryEs from "../../content/es/gallery.json";
import galleryEn from "../../content/en/gallery.json";
import type {
  Album,
  BioSection,
  GalleryImage,
  Locale,
  LyricEntry,
  QuoteCard,
  TimelineEvent,
} from "@/types/content";

const data = {
  es: {
    timeline: timelineEs as TimelineEvent[],
    albums: albumsEs as Album[],
    lyrics: lyricsEs as LyricEntry[],
    bios: biosEs as BioSection[],
    quotes: quotesEs as QuoteCard[],
    gallery: galleryEs as GalleryImage[],
  },
  en: {
    timeline: timelineEn as TimelineEvent[],
    albums: albumsEn as Album[],
    lyrics: lyricsEn as LyricEntry[],
    bios: biosEn as BioSection[],
    quotes: quotesEn as QuoteCard[],
    gallery: galleryEn as GalleryImage[],
  },
} as const;

export function getTimeline(locale: Locale): TimelineEvent[] {
  return data[locale].timeline;
}

export function getAlbums(locale: Locale): Album[] {
  return data[locale].albums;
}

export function getAlbumsByArtist(
  locale: Locale,
  artist: "los-aldeanos" | "al2" | "el-b" | "all",
): Album[] {
  const albums = getAlbums(locale);
  if (artist === "all") return albums;
  return albums.filter((a) => a.artist === artist);
}

export function getLyrics(locale: Locale): LyricEntry[] {
  return data[locale].lyrics;
}

export function getLyricBySlug(
  locale: Locale,
  slug: string,
): LyricEntry | undefined {
  return getLyrics(locale).find((l) => l.slug === slug);
}

export function getBios(locale: Locale): BioSection[] {
  return data[locale].bios;
}

export function getQuotes(locale: Locale): QuoteCard[] {
  return data[locale].quotes;
}

export function getGallery(locale: Locale): GalleryImage[] {
  return data[locale].gallery;
}

export function getTimelineDuo(locale: Locale): TimelineEvent[] {
  return getTimeline(locale).filter((e) => e.isDuoEra && !e.isAppendix);
}

export function getTimelineAppendix(locale: Locale): TimelineEvent[] {
  return getTimeline(locale).filter((e) => e.isAppendix);
}

export function getAlbumsDuo(locale: Locale): Album[] {
  const seen = new Set<string>();
  return getAlbums(locale).filter((a) => {
    if (a.artist !== "los-aldeanos" || a.isAppendix) return false;
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

export function getAlbumsAppendix(locale: Locale): Album[] {
  return getAlbums(locale).filter((a) => a.isAppendix);
}
