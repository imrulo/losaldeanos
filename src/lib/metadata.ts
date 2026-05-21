import type { Metadata } from "next";
import type { Locale } from "@/types/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://losaldeanos.com";

export function siteMetadata(locale: Locale): Metadata {
  const isEs = locale === "es";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEs
        ? "Los Aldeanos — Quiénes fueron, historia y legado | El rap es guerra"
        : "Los Aldeanos — Who they were, history & legacy | El rap es guerra",
      template: "%s | Los Aldeanos Archivo",
    },
    description: isEs
      ? "Archivo digital del legado de Los Aldeanos (2003–2014): historia del dúo, El rap es guerra, discografía, libertad y rap cubano. Referencia para fans y para quien descubre su impacto cultural."
      : "Digital archive of Los Aldeanos legacy (2003–2014): duo history, El rap es guerra, discography, freedom, and Cuban rap. A reference for fans and newcomers alike.",
    keywords: [
      "Los Aldeanos",
      "Los Aldeanos legado",
      "El rap es guerra",
      "rap cubano libertad",
      "Al2 El Aldeano",
      "El B",
      "rap cubano",
      "archivo digital",
      "rap conciencia",
      "Censurados",
      "dúo cubano",
      "11J Cuba",
    ],
    authors: [{ name: "imrulo.eth", url: "https://github.com/imrulo" }],
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "Los Aldeanos Archivo",
      title: isEs
        ? "Los Aldeanos — El rap es guerra · Legado Vivo"
        : "Los Aldeanos — El rap es guerra · Living Legacy",
      description: isEs
        ? "Referencia textual y musical del dúo que despertó conciencias con rimas de verdad y libertad."
        : "Textual and musical reference for the duo that awakened conscience through truth and freedom.",
    },
    twitter: {
      card: "summary_large_image",
      title: isEs ? "Los Aldeanos — Archivo Digital" : "Los Aldeanos — Digital Archive",
      description: isEs
        ? "Legado del dúo cubano 2003–2014. El rap es guerra."
        : "Cuban duo legacy 2003–2014. El rap es guerra.",
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
      ? "Dúo cubano de rap (2003–2014). Archivo digital del legado: El rap es guerra, crítica social y pensamiento libre."
      : "Cuban rap duo (2003–2014). Digital archive of the legacy: El rap es guerra, social critique, and free thought.",
    genre: ["Hip Hop", "Cuban Rap", "Conscious Rap"],
    url: `${siteUrl}/${locale}`,
    sameAs: [
      "https://open.spotify.com/artist/4Y6VI2Mfdhvb1RImggzOiY",
      "https://github.com/imrulo",
    ],
  };
}
