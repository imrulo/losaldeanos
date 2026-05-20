import type { Metadata } from "next";
import type { Locale } from "@/types/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://losaldeanos.com";

export function siteMetadata(locale: Locale): Metadata {
  const isEs = locale === "es";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEs
        ? "Los Aldeanos — Archivo Digital y Museo Virtual"
        : "Los Aldeanos — Digital Archive & Virtual Museum",
      template: "%s | Los Aldeanos Archivo",
    },
    description: isEs
      ? "Archivo digital fan no oficial dedicado al legado de Los Aldeanos: historia, discografía, letras, multimedia e impacto del rap conciencia cubano."
      : "Unofficial fan digital archive dedicated to the legacy of Los Aldeanos: history, discography, lyrics, media, and Cuban conscious rap impact.",
    keywords: [
      "Los Aldeanos",
      "Al2 El Aldeano",
      "El B",
      "rap cubano",
      "archivo digital",
      "legado",
    ],
    authors: [{ name: "imrulo.eth", url: "https://github.com/imrulo" }],
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "Los Aldeanos Archivo",
      title: isEs
        ? "Archivo Digital · Legado Vivo"
        : "Digital Archive · Living Legacy",
      description: isEs
        ? "Museo virtual de fans para la comunidad aldeana."
        : "Fan virtual museum for the aldeana community.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Los Aldeanos Archivo",
      description: isEs
        ? "Legado del rap conciencia cubano."
        : "Legacy of Cuban conscious rap.",
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export function jsonLdMusicGroup(locale: Locale) {
  const isEs = locale === "es";
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Los Aldeanos",
    alternateName: ["Al2 El Aldeano", "El B"],
    description: isEs
      ? "Dúo cubano de rap formado por Al2 El Aldeano y El B."
      : "Cuban rap duo formed by Al2 El Aldeano and El B.",
    genre: ["Hip Hop", "Cuban Rap"],
    url: `${siteUrl}/${locale}`,
    sameAs: [
      "https://www.youtube.com/c/al2elaldeano",
      "https://github.com/imrulo",
    ],
  };
}
