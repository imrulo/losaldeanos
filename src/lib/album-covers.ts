/** Portadas oficiales del dúo (archivo local, fuente Deezer/MusicBrainz). */
export const ALBUM_COVERS = {
  censurados: "/images/covers/censurados.jpg",
  "poesia-esposada": "/images/covers/poesia-esposada.jpg",
  "el-atropello": "/images/covers/el-atropello.jpg",
} as const;

export type AlbumSlug = keyof typeof ALBUM_COVERS;

/** Año del timeline → álbum del dúo (para portada en modal). */
export const TIMELINE_ALBUM_BY_YEAR: Record<number, AlbumSlug | undefined> = {
  2008: "censurados",
  2010: "poesia-esposada",
  2012: "el-atropello",
};

export function getAlbumCover(slug: string): string | undefined {
  return ALBUM_COVERS[slug as AlbumSlug];
}

export function getTimelineAlbumCover(year: number): string | undefined {
  const slug = TIMELINE_ALBUM_BY_YEAR[year];
  return slug ? ALBUM_COVERS[slug] : undefined;
}
