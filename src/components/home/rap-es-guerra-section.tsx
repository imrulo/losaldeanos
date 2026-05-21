"use client";

import Image from "next/image";
import Link from "next/link";
import { Music } from "lucide-react";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { SpotifyEmbed } from "@/components/shared/spotify-embed";
import { OFFICIAL_LINKS, DUO_HERO_IMAGE } from "@/lib/official-links";
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
  const excerpt = locale === "es" ? ANTHEM_EXCERPT_ES : ANTHEM_EXCERPT_EN;

  return (
    <section
      id="rap-es-guerra"
      className="py-28 px-4 sm:px-6 border-y border-primary/15 bg-gradient-to-b from-primary/8 via-background to-background"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
            {locale === "es" ? "Himno del legado" : "Legacy anthem"}
          </p>
          <h2 className="text-4xl sm:text-6xl font-black text-warm anthem-glow inline-block">
            El rap es guerra
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {locale === "es"
              ? "La frase que definió a una generación. Manifiesto del dúo Los Aldeanos (2003–2014)."
              : "The line that defined a generation. Manifesto of Los Aldeanos (2003–2014)."}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary/30 glow-blue">
              <Image
                src={DUO_HERO_IMAGE}
                alt="Los Aldeanos — Al2 y El B"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>
            <blockquote className="mt-6 rounded-xl border border-accent/30 bg-card/60 p-6">
              <p className="text-lg sm:text-xl font-medium italic text-warm leading-relaxed whitespace-pre-line">
                {excerpt}
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">
                — Los Aldeanos ·{" "}
                <cite className="not-italic text-accent">Censurados / El Atropello</cite>
              </footer>
            </blockquote>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link href={`${base}/letras/rap-es-guerra`}>
                  {locale === "es" ? "Leer extracto" : "Read excerpt"}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/40">
                <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
                  <Music className="h-4 w-4 mr-1" />
                  Spotify
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-sm font-semibold text-muted-foreground mb-3">
              {locale === "es" ? "Escuchar al dúo" : "Listen to the duo"}
            </p>
            <SpotifyEmbed />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
