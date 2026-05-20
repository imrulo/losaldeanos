"use client";

import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { BioCards } from "@/components/historia/bio-cards";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function HistoriaExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a0508,transparent_60%)]" />
        <div className="mx-auto max-w-7xl relative">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
              {locale === "es" ? "Sala de historia" : "History hall"}
            </p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight max-w-4xl">
              {locale === "es" ? "Historia y Biografía" : "History & Biography"}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              {locale === "es"
                ? "Un recorrido interactivo por la vida del dúo y sus caminos en solitario."
                : "An interactive journey through the duo and their solo paths."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TimelineInteractive locale={locale} fullPage />

      <section className="py-20 px-4 sm:px-6 bg-card/20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black mb-10">
              {locale === "es" ? "Los protagonistas" : "The protagonists"}
            </h2>
          </ScrollReveal>
          <BioCards locale={locale} />
        </div>
      </section>

      <FlipQuotes locale={locale} />
    </>
  );
}
