"use client";

import { getArchiveCopy } from "@/lib/archive-copy";
import { getQuotes } from "@/lib/content-data";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function LegadoVivoSection({ locale }: { locale: Locale }) {
  const copy = getArchiveCopy(locale).legado;
  const quotes = getQuotes(locale).filter((q) => q.id !== "rap-guerra").slice(0, 3);

  return (
    <section
      id="legado-vivo"
      className="py-28 px-4 sm:px-6 scroll-mt-20 border-t border-primary/15"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
            {locale === "es" ? "Para la comunidad aldeana" : "For the aldeana community"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-warm tracking-tight">
            {copy.title}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-warm/90 leading-relaxed">
            {copy.lead}
          </p>
        </ScrollReveal>

        <div className="mt-14 space-y-12">
          {copy.sections.map((section, i) => (
            <ScrollReveal key={section.heading} delay={i * 0.05}>
              <article>
                <h3 className="text-xl sm:text-2xl font-bold text-accent tracking-tight">
                  {section.heading}
                </h3>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-[1.75]">
                  {section.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
            {copy.quotesTitle}
          </h3>
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li
                key={q.id}
                className="rounded-xl border border-accent/20 bg-card/40 px-6 py-5"
              >
                <blockquote className="text-lg font-medium italic text-warm leading-relaxed">
                  «{q.lyric}»
                </blockquote>
                <p className="mt-3 text-sm text-muted-foreground">{q.context}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-cuban-red/50 pl-4">
            {copy.appendix}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
