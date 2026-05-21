"use client";

import Image from "next/image";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { RapEsGuerraSection } from "@/components/home/rap-es-guerra-section";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { StreamingLinks } from "@/components/layout/streaming-links";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { DUO_HERO_IMAGE, DUO_HERO_ATTRIBUTION } from "@/lib/official-links";
import type { Locale } from "@/types/content";

export function HistoriaExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden min-h-[70vh] flex items-end">
        <Image
          src={DUO_HERO_IMAGE}
          alt="Los Aldeanos — el dúo"
          fill
          priority
          className="object-cover object-center scale-105 -z-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 cuban-flag-overlay opacity-40 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30 -z-10" />
        <div className="mx-auto max-w-7xl relative pb-8 w-full">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">
              {locale === "es" ? "2003–2014 · Era del dúo" : "2003–2014 · Duo era"}
            </p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight max-w-4xl text-warm">
              Los Aldeanos
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl font-black anthem-glow">El rap es guerra</p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {locale === "es"
                ? "Historia del dúo. Las carreras en solitario son solo una nota breve al final del recorrido."
                : "Duo history. Solo careers are only a brief note at the end."}
            </p>
            <div className="mt-8">
              <StreamingLinks locale={locale} compact />
            </div>
            <p className="mt-6 text-[10px] text-muted-foreground/80">{DUO_HERO_ATTRIBUTION}</p>
          </ScrollReveal>
        </div>
      </section>

      <TimelineInteractive locale={locale} fullPage />
      <RapEsGuerraSection locale={locale} />
      <FlipQuotes locale={locale} />

      <section className="py-16 px-4 sm:px-6 border-t border-border/40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            {locale === "es" ? "Apéndice" : "Appendix"}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "es"
              ? "Después de 2014, Al2 y El B siguieron por caminos individuales. Este archivo honra sobre todo los años en que fueron uno — el dúo Los Aldeanos."
              : "After 2014, Al2 and El B continued on individual paths. This archive honors above all the years they were one — the Los Aldeanos duo."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <StreamingLinks locale={locale} compact />
          </div>
        </div>
      </section>
    </>
  );
}
