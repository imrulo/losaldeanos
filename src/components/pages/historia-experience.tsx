"use client";

import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { BioCards } from "@/components/historia/bio-cards";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { StreamingLinks } from "@/components/layout/streaming-links";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function HistoriaExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#002F6C33,transparent_55%)]" />
        <div className="absolute inset-0 cuban-flag-overlay opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">
              {locale === "es" ? "Archivo del legado" : "Legacy archive"}
            </p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight max-w-4xl text-warm">
              {locale === "es"
                ? "Los Aldeanos — Historia del dúo"
                : "Los Aldeanos — Duo history"}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {locale === "es"
                ? "2003–2014: el corazón de este museo. Las carreras en solitario aparecen solo como un apéndice breve al final."
                : "2003–2014: the heart of this museum. Solo careers appear only as a brief appendix at the end."}
            </p>
            <div className="mt-8">
              <StreamingLinks locale={locale} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TimelineInteractive locale={locale} fullPage />

      <section className="py-20 px-4 sm:px-6 bg-card/20 border-t border-primary/10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {locale === "es" ? "Apéndice" : "Appendix"}
            </p>
            <h2 className="text-2xl font-black text-muted-foreground">
              {locale === "es" ? "Quiénes formaron el dúo" : "Who formed the duo"}
            </h2>
          </ScrollReveal>
          <BioCards locale={locale} />
        </div>
      </section>

      <FlipQuotes locale={locale} />
    </>
  );
}
