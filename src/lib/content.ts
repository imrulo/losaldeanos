import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale, SearchDocument } from "@/types/content";
import { localePath } from "./i18n";
import {
  getAlbums,
  getLyrics,
  getTimeline,
} from "./content-data";

export {
  getTimeline,
  getAlbums,
  getAlbumsByArtist,
  getLyrics,
  getLyricBySlug,
  getBios,
} from "./content-data";

const contentRoot = path.join(process.cwd(), "content");

export function getMdxContent(locale: Locale, slug: string): {
  content: string;
  data: Record<string, unknown>;
} {
  const filePath = path.join(contentRoot, locale, "mdx", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  return { content, data };
}

export function buildSearchIndex(locale: Locale): SearchDocument[] {
  const docs: SearchDocument[] = [];
  const base = localePath(locale);

  const pages = [
    {
      title: locale === "es" ? "Inicio" : "Home",
      href: base,
      desc: "Archivo digital Los Aldeanos",
    },
    {
      title: locale === "es" ? "Historia" : "History",
      href: `${base}/historia`,
      desc: "Timeline y biografías",
    },
    {
      title: locale === "es" ? "Discografía" : "Discography",
      href: `${base}/discografia`,
      desc: "Álbumes y releases",
    },
    {
      title: locale === "es" ? "Multimedia" : "Media",
      href: `${base}/multimedia`,
      desc: "Galería fotográfica del dúo",
    },
    {
      title: locale === "es" ? "Letras" : "Lyrics",
      href: `${base}/letras`,
      desc: "Letras icónicas",
    },
    {
      title: locale === "es" ? "Legado" : "Legacy",
      href: `${base}/legado`,
      desc: "Impacto cultural",
    },
    {
      title: locale === "es" ? "Comunidad" : "Community",
      href: `${base}/comunidad`,
      desc: "Foros y testimonios",
    },
  ];

  pages.forEach((p, i) => {
    docs.push({
      id: `page-${i}`,
      type: "page",
      title: p.title,
      description: p.desc,
      href: p.href,
      locale,
    });
  });

  getTimeline(locale).forEach((e, i) => {
    docs.push({
      id: `timeline-${i}`,
      type: "timeline",
      title: `${e.year} — ${e.title}`,
      description: e.description,
      href: `${base}/historia#${e.year}`,
      locale,
    });
  });

  getAlbums(locale).forEach((a) => {
    docs.push({
      id: `album-${a.slug}`,
      type: "album",
      title: a.title,
      description: a.description,
      href: `${base}/discografia#${a.slug}`,
      locale,
    });
  });

  getLyrics(locale).forEach((l) => {
    docs.push({
      id: `lyric-${l.slug}`,
      type: "lyric",
      title: l.title,
      description: l.excerpt,
      href: `${base}/letras/${l.slug}`,
      locale,
    });
  });

  return docs;
}
