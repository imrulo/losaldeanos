"use client";

import { getArchiveCopy } from "@/lib/archive-copy";
import { SpotifyPlayerBlock } from "@/components/shared/spotify-player-block";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

/** Bloque SEO + educativo para quien no conoce al dúo. */
export function QuienesFueronSection({ locale }: { locale: Locale }) {
  const copy = getArchiveCopy(locale).quienesFueron;

  return (
    <section
      id="quienes-fueron"
      className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-20 border-b border-primary/10"
      aria-labelledby="quienes-fueron-heading"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-4">
            {copy.eyebrow}
          </p>
          <h2
            id="quienes-fueron-heading"
            className="text-3xl sm:text-4xl font-black text-warm tracking-tight font-display"
          >
            {copy.title}
          </h2>
          <p className="mt-6 text-xl text-primary-bright font-semibold leading-snug">
            {copy.subtitle}
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {copy.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <p className="text-base sm:text-lg text-muted-foreground leading-[1.85]">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10">
          <SpotifyPlayerBlock locale={locale} compact className="mb-10" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {copy.highlights.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-accent/15 bg-accent/5 px-4 py-3 text-sm text-warm/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
