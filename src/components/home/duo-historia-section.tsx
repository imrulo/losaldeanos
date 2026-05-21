"use client";

import { getArchiveCopy } from "@/lib/archive-copy";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function DuoHistoriaSection({
  locale,
  hideHeader = false,
}: {
  locale: Locale;
  hideHeader?: boolean;
}) {
  const copy = getArchiveCopy(locale).historia;

  return (
    <section
      id="historia-duo"
      className="py-28 px-4 sm:px-6 scroll-mt-20 bg-gradient-to-b from-card/15 via-background to-background"
    >
      <div className="mx-auto max-w-3xl">
        {!hideHeader && (
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
              {locale === "es" ? "Memoria y verdad" : "Memory and truth"}
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-warm tracking-tight">
              {copy.title}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-warm/90 leading-relaxed font-medium">
              {copy.lead}
            </p>
          </ScrollReveal>
        )}

        <div className={hideHeader ? "space-y-14" : "mt-14 space-y-14"}>
          {copy.blocks.map((block, i) => (
            <ScrollReveal key={block.heading ?? i} delay={i * 0.04}>
              <article className="prose-archive">
                {block.heading && (
                  <h3 className="text-xl sm:text-2xl font-bold text-accent tracking-tight mb-5">
                    {block.heading}
                  </h3>
                )}
                {block.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-base sm:text-lg text-muted-foreground leading-[1.75] mb-5 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
