"use client";

import Link from "next/link";
import { Music } from "lucide-react";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { getArchiveCopy } from "@/lib/archive-copy";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { Button } from "@/components/ui/button";

const ANTHEM_EXCERPT_ES = `El rap es guerra, el rap es cultura,
el rap es la voz de mi generación.
No es revolución de armas, es revolución de ideas —
conciencia despierta, verdad en el micrófono.`;

const ANTHEM_EXCERPT_EN = `Rap is war, rap is culture,
rap is the voice of my generation.
Not a revolution of weapons, but of ideas —
awakened conscience, truth on the microphone.`;

export function RapEsGuerraSection({ locale }: { locale: Locale }) {
  const base = localePath(locale);
  const copy = getArchiveCopy(locale);
  const excerpt = locale === "es" ? ANTHEM_EXCERPT_ES : ANTHEM_EXCERPT_EN;

  return (
    <section
      id="rap-es-guerra"
      className="py-28 px-4 sm:px-6 border-y border-primary/15 bg-gradient-to-b from-primary/8 via-background to-background scroll-mt-20"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
            {locale === "es" ? "Himno del legado" : "Legacy anthem"}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-warm anthem-glow">
            {copy.rapEsGuerra.title}
          </h2>
          <p className="mt-5 text-lg text-warm/90 leading-relaxed">{copy.rapEsGuerra.lead}</p>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <blockquote className="rounded-2xl border border-accent/30 bg-card/50 px-6 py-8 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground mb-4">
              {copy.rapEsGuerra.excerptLabel}
            </p>
            <p className="text-xl sm:text-2xl font-medium italic text-warm leading-relaxed whitespace-pre-line">
              {excerpt}
            </p>
            <footer className="mt-5 text-sm text-muted-foreground">
              — Los Aldeanos ·{" "}
              <cite className="not-italic text-accent">Censurados</cite>
            </footer>
          </blockquote>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {copy.rapEsGuerra.context.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg" className="font-black glow-warm">
            <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
              <Music className="h-4 w-4 mr-2" />
              {locale === "es" ? "Escuchar en Spotify" : "Listen on Spotify"}
            </a>
          </Button>
          <Button asChild variant="outline" className="border-primary/40">
            <Link href={`${base}/letras/rap-es-guerra`}>
              {locale === "es" ? "Leer en letras" : "Read in lyrics"}
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
