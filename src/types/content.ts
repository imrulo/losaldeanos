export type Locale = "es" | "en";

export type ArtistFilter = "los-aldeanos" | "al2" | "el-b" | "all";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  longDescription?: string;
  highlight?: boolean;
  artist?: ArtistFilter;
  coverColor?: string;
  youtubeId?: string;
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
  previewYoutubeId?: string;
}

export interface LyricEntry {
  slug: string;
  title: string;
  album: string;
  year: number;
  excerpt: string;
  themes: string[];
  listenUrl?: string;
  context?: string;
}

export interface BioSection {
  name: string;
  aka: string;
  born?: string;
  summary: string;
  highlights: string[];
}

export interface QuoteCard {
  id: string;
  lyric: string;
  context: string;
  theme: string;
}

export interface GalleryImage {
  id: string;
  caption: string;
  color: string;
  aspect?: "square" | "tall" | "wide";
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
