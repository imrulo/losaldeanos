import { DUO_HERO_IMAGE } from "@/lib/official-links";
import type { GalleryImage } from "@/types/content";

/** Galería: una sola foto del dúo + paneles visuales (sin repetir portadas de álbumes). */
export function getDuoGallery(locale: "es" | "en"): GalleryImage[] {
  const es = locale === "es";
  return [
    {
      id: "duo-main",
      caption: es
        ? "Al2 y El B — el dúo en su esencia"
        : "Al2 & El B — the duo at its core",
      color: "#0f1a2e",
      aspect: "tall",
      src: DUO_HERO_IMAGE,
    },
    {
      id: "vinyl-era",
      caption: es ? "Underground cubano · 2003" : "Cuban underground · 2003",
      color: "#142a4a",
      aspect: "square",
    },
    {
      id: "conciencia",
      caption: es ? "Rap conciencia · verdad en el mic" : "Conscious rap · truth on the mic",
      color: "#1a2040",
      aspect: "wide",
    },
    {
      id: "aldea",
      caption: es ? "La Aldea — comunidad" : "La Aldea — community",
      color: "#1f1208",
      aspect: "square",
    },
    {
      id: "legado",
      caption: es ? "2003–2014 · legado vivo" : "2003–2014 · living legacy",
      color: "#121820",
      aspect: "tall",
    },
  ];
}
