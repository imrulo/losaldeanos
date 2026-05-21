"use client";

import { HeroImmersive } from "@/components/home/hero-immersive";
import { QuienesFueronSection } from "@/components/home/quienes-fueron-section";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { DuoHistoriaSection } from "@/components/home/duo-historia-section";
import { AlbumEditorialGrid } from "@/components/discography/album-editorial-grid";
import { RapEsGuerraSection } from "@/components/home/rap-es-guerra-section";
import { LegadoVivoSection } from "@/components/home/legado-vivo-section";
import { getArchiveCopy } from "@/lib/archive-copy";
import type { Locale } from "@/types/content";

export function HomeExperience({ locale }: { locale: Locale }) {
  const copy = getArchiveCopy(locale);

  return (
    <article itemScope itemType="https://schema.org/Article">
      <HeroImmersive locale={locale} />
      <QuienesFueronSection locale={locale} />
      <TimelineInteractive locale={locale} />
      <DuoHistoriaSection locale={locale} />

      <section id="discografia" className="py-24 sm:py-32 px-4 sm:px-6 bg-card/10 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <header className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
              {locale === "es" ? "Música del dúo" : "Duo music"}
            </p>
            <h2 className="text-4xl font-black sm:text-5xl text-warm tracking-tight font-display">
              {copy.discography.title}
            </h2>
          </header>
          <AlbumEditorialGrid locale={locale} />
        </div>
      </section>

      <RapEsGuerraSection locale={locale} />
      <LegadoVivoSection locale={locale} />
    </article>
  );
}
