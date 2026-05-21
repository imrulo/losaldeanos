"use client";

import Image from "next/image";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { StreamingLinks } from "@/components/layout/streaming-links";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { DUO_HERO_IMAGE, DUO_HERO_ATTRIBUTION } from "@/lib/official-links";
import type { Locale } from "@/types/content";

export function HistoriaExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden min-h-[60vh] flex items-end">
        <Image
          src={DUO_HERO_IMAGE}
          alt="Los Aldeanos — el dúo"
          fill
          priority
          className="object-cover object-center -z-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 cuban-flag-overlay opacity-35 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent -z-10" />
        <div className="mx-auto max-w-7xl relative pb-10 w-full">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">
              {locale === "es" ? "2003–2014" : "2003–2014"}
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-warm">
              {locale === "es" ? "Historia del dúo" : "Duo history"}
            </h1>
            <p className="mt-4 text-xl font-black anthem-glow">El rap es guerra</p>
            <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">
              {locale === "es"
                ? "Recorrido cronológico del dúo. La discografía completa está en la página de inicio."
                : "Chronological journey of the duo. Full discography is on the home page."}
            </p>
            <div className="mt-6">
              <StreamingLinks locale={locale} compact />
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground/70">{DUO_HERO_ATTRIBUTION}</p>
          </ScrollReveal>
        </div>
      </section>

      <TimelineInteractive locale={locale} fullPage />
    </>
  );
}
