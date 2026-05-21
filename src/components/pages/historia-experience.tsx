"use client";

import Link from "next/link";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { DuoHistoriaSection } from "@/components/home/duo-historia-section";
import { localePath } from "@/lib/i18n";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function HistoriaExperience({ locale }: { locale: Locale }) {
  const base = localePath(locale);

  return (
    <>
      <section className="py-20 px-4 sm:px-6 border-b border-border/40">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">
              2003–2014
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-warm">
              {locale === "es" ? "Historia del dúo" : "Duo history"}
            </h1>
            <p className="mt-4 text-xl font-black anthem-glow">El rap es guerra</p>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {locale === "es"
                ? "Texto completo del legado del dúo. La discografía y la música están en la página de inicio."
                : "Full text of the duo legacy. Discography and music are on the home page."}
            </p>
            <Link
              href={`${base}#discografia`}
              className="mt-6 inline-flex text-sm font-bold text-primary hover:text-accent"
            >
              {locale === "es" ? "Ir a discografía →" : "Go to discography →"}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <DuoHistoriaSection locale={locale} hideHeader />
      <TimelineInteractive locale={locale} fullPage />
    </>
  );
}
