"use client";

import { HeroImmersive } from "@/components/home/hero-immersive";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { AlbumMuseumGrid } from "@/components/discography/album-museum-grid";
import { GalleryLightbox } from "@/components/multimedia/gallery-lightbox";
import { RapEsGuerraSection } from "@/components/home/rap-es-guerra-section";
import { FlipQuotes } from "@/components/home/flip-quotes";

import type { Locale } from "@/types/content";

export function HomeExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <HeroImmersive locale={locale} />
      <TimelineInteractive locale={locale} />

      <section id="discografia" className="py-24 sm:py-32 px-4 sm:px-6 bg-card/10 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
              {locale === "es" ? "Música del dúo" : "Duo music"}
            </p>
            <h2 className="text-4xl font-black sm:text-5xl text-warm tracking-tight">
              {locale === "es" ? "Discografía" : "Discography"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {locale === "es"
                ? "Tres obras esenciales del dúo. Cada álbum aparece una sola vez — escucha en Spotify oficial."
                : "Three essential duo albums. Each appears once — listen on official Spotify."}
            </p>
          </header>
          <AlbumMuseumGrid locale={locale} showIntro={false} />
        </div>
      </section>

      <section id="multimedia" className="py-24 sm:py-32 px-4 sm:px-6 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
              {locale === "es" ? "Imágenes" : "Images"}
            </p>
            <h2 className="text-4xl font-black sm:text-5xl text-warm tracking-tight">
              {locale === "es" ? "Galería" : "Gallery"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {locale === "es"
                ? "Momentos visuales del legado. Sin repetir portadas ni videos inciertos."
                : "Visual moments from the legacy. No repeated covers or uncertain videos."}
            </p>
          </header>
          <GalleryLightbox locale={locale} />
        </div>
      </section>

      <RapEsGuerraSection locale={locale} />
      <FlipQuotes locale={locale} />
    </>
  );
}
