import { ALBUM_COVERS } from "@/lib/album-covers";
import { DUO_HERO_IMAGE } from "@/lib/official-links";
import type { GalleryImage } from "@/types/content";

/** Galería sin repetir la misma imagen — dúo + portadas de álbumes. */
export function getDuoGallery(locale: "es" | "en"): GalleryImage[] {
  const es = locale === "es";
  return [
    {
      id: "duo-origin",
      caption: es
        ? "Al2 y El B — 5 Palmas, origen del dúo"
        : "Al2 & El B — 5 Palmas, duo origin",
      color: "#0f1a2e",
      aspect: "tall",
      src: DUO_HERO_IMAGE,
    },
    {
      id: "cover-censurados",
      caption: es ? "Censurados (2008)" : "Censurados (2008)",
      color: "#0f1a2e",
      aspect: "square",
      src: ALBUM_COVERS.censurados,
    },
    {
      id: "cover-poesia",
      caption: es ? "Poesía Esposada (2010)" : "Poesía Esposada (2010)",
      color: "#142a4a",
      aspect: "wide",
      src: ALBUM_COVERS["poesia-esposada"],
    },
    {
      id: "cover-atropello",
      caption: es ? "El Atropello (2012)" : "El Atropello (2012)",
      color: "#1a2040",
      aspect: "square",
      src: ALBUM_COVERS["el-atropello"],
    },
    {
      id: "era-close",
      caption: es
        ? "2003–2014 — el legado del dúo"
        : "2003–2014 — the duo's legacy",
      color: "#141210",
      aspect: "tall",
      src: DUO_HERO_IMAGE,
      crop: "top",
    },
  ];
}
