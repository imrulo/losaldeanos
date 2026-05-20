import timelineEs from "../../content/es/timeline.json";
import timelineEn from "../../content/en/timeline.json";
import albumsEs from "../../content/es/albums.json";
import albumsEn from "../../content/en/albums.json";
import lyricsEs from "../../content/es/lyrics.json";
import lyricsEn from "../../content/en/lyrics.json";
import biosEs from "../../content/es/bios.json";
import biosEn from "../../content/en/bios.json";
import type {
  Album,
  BioSection,
  Locale,
  LyricEntry,
  TimelineEvent,
} from "@/types/content";

const data = {
  es: {
    timeline: timelineEs as TimelineEvent[],
    albums: albumsEs as Album[],
    lyrics: lyricsEs as LyricEntry[],
    bios: biosEs as BioSection[],
  },
  en: {
    timeline: timelineEn as TimelineEvent[],
    albums: albumsEn as Album[],
    lyrics: lyricsEn as LyricEntry[],
    bios: biosEn as BioSection[],
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
  artist: import("@/types/content").ArtistFilter | "all",
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
