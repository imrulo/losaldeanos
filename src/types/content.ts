export type Locale = "es" | "en";

export type ArtistFilter = "los-aldeanos" | "al2" | "el-b";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface Album {
  slug: string;
  title: string;
  artist: ArtistFilter;
  year: number;
  coverColor: string;
  description: string;
  tracks: string[];
  spotify?: string;
  youtube?: string;
  apple?: string;
}

export interface LyricEntry {
  slug: string;
  title: string;
  album: string;
  year: number;
  excerpt: string;
  themes: string[];
  listenUrl?: string;
}

export interface BioSection {
  name: string;
  aka: string;
  born?: string;
  summary: string;
  highlights: string[];
}

export interface SearchDocument {
  id: string;
  type: "album" | "lyric" | "page" | "timeline";
  title: string;
  description: string;
  href: string;
  locale: Locale;
}

export interface FanStory {
  id: string;
  name: string;
  location?: string;
  story: string;
  createdAt: string;
  approved: boolean;
}
