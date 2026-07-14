"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Music } from "lucide-react";
import { useCallback, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import {
  DUO_HERO_ATTRIBUTION,
  DUO_HERO_IMAGE,
  OFFICIAL_LINKS,
} from "@/lib/official-links";
import { duoIntroEn, duoIntroEs } from "@/lib/artist-names";
import type { Locale } from "@/types/content";
import { useMicroSound } from "@/hooks/use-micro-sound";

export function HeroImmersive({ locale }: { locale: Locale }) {
  const [imgOk, setImgOk] = useState(true);
  const sound = useMicroSound();
  const dict = getDictionary(locale);
  const intro = locale === "es" ? duoIntroEs() : duoIntroEn();

  const onCtaClick = useCallback(() => {
    sound.thud();
  }, [sound]);

  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-background">
      {/* Background layer: cinematic photo + scrims */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {imgOk ? (
          <Image
            src={DUO_HERO_IMAGE}
            alt="Al2 y El B — Los Aldeanos"
            fill
            priority
            className="object-cover object-[center_22%] scale-105"
            sizes="100vw"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b1e1e] via-[#2a0d0d] to-[#09090b]" />
        )}
        <div className="absolute inset-0 cuban-flag-overlay opacity-40" />
        <div className="particle-field absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />
        <div className="film-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-32 sm:pb-20 lg:pb-28">
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-accent">
            {dict.hero.tagline} · Museo Virtual
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight text-foreground">
            {dict.hero.title}
          </h1>

          <p className="mt-2 font-display text-[clamp(2rem,9vw,6rem)] font-bold uppercase leading-[0.92] tracking-tight text-gradient-blood anthem-glow">
            {dict.hero.anthem}
          </p>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg lg:leading-[1.75]">
            {intro}
          </p>

          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-gold">
            {locale === "es"
              ? "Archivo Digital · Era del dúo 2003–2014"
              : "Digital Archive · Duo era 2003–2014"}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#quienes-fueron"
              onClick={onCtaClick}
              className="cta-pulse inline-flex h-13 items-center justify-center rounded-lg bg-accent px-9 py-4 text-base font-bold uppercase tracking-wide text-accent-foreground glow-red transition-transform hover:scale-[1.02] sm:text-lg"
            >
              {dict.hero.cta}
            </Link>
            <a
              href={OFFICIAL_LINKS.spotifyDuo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border-2 border-[#1DB954] bg-[#1DB954]/15 px-7 py-4 text-base font-bold text-foreground transition-all hover:bg-[#1DB954]/25"
            >
              <Music className="h-5 w-5 text-[#1DB954]" />
              Spotify
            </a>
          </div>

          <a
            href="#quienes-fueron"
            className="mt-12 inline-flex flex-col items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {dict.hero.scroll}
            <ChevronDown className="h-5 w-5 animate-bounce text-accent" />
          </a>
        </div>
      </div>

      {imgOk && (
        <p className="pointer-events-none absolute bottom-3 right-3 text-[10px] text-muted-foreground/70">
          {DUO_HERO_ATTRIBUTION}
        </p>
      )}
    </section>
  );
}
