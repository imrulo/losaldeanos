"use client";

import Link from "next/link";
import { HeroImmersive } from "@/components/home/hero-immersive";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { AlbumMuseumGrid } from "@/components/discography/album-museum-grid";
import { FeaturedVideos } from "@/components/home/featured-videos";
import { GalleryLightbox } from "@/components/multimedia/gallery-lightbox";
import { RapEsGuerraSection } from "@/components/home/rap-es-guerra-section";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function HomeExperience({ locale }: { locale: Locale }) {
  const base = localePath(locale);

  return (
    <>
      <HeroImmersive locale={locale} />
      <TimelineInteractive locale={locale} />

      <section id="discografia" className="py-28 px-4 sm:px-6 bg-card/15">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-4xl font-black sm:text-5xl text-warm">
              {locale === "es" ? "Discografía del dúo" : "Duo discography"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              {locale === "es"
                ? "Censurados, Poesía Esposada, El Atropello — el corazón del archivo."
                : "Censurados, Poesía Esposada, El Atropello — the heart of the archive."}
            </p>
          </ScrollReveal>
          <div className="mt-10">
            <AlbumMuseumGrid locale={locale} />
          </div>
          <Link
            href={`${base}/discografia`}
            className="mt-8 inline-flex text-sm font-bold text-primary hover:text-accent"
          >
            {locale === "es" ? "Ver discografía completa →" : "Full discography →"}
          </Link>
        </div>
      </section>

      <FeaturedVideos locale={locale} />

      <section className="py-28 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-4xl font-black sm:text-5xl text-warm">
              {locale === "es" ? "Galería del dúo" : "Duo gallery"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              {locale === "es"
                ? "Al2 y El B juntos — toca para ampliar."
                : "Al2 and El B together — tap to enlarge."}
            </p>
          </ScrollReveal>
          <div className="mt-10">
            <GalleryLightbox locale={locale} />
          </div>
        </div>
      </section>

      <RapEsGuerraSection locale={locale} />
      <FlipQuotes locale={locale} />
    </>
  );
}
