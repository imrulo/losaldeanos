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

function HeroContent({
  locale,
  intro,
  onCtaClick,
}: {
  locale: Locale;
  intro: string;
  onCtaClick: () => void;
}) {
  const dict = getDictionary(locale);

  return (
    <>
      <span className="text-xs font-bold uppercase tracking-[0.35em] text-accent">
        {dict.hero.tagline}
      </span>

      <h1 className="mt-5 text-[clamp(2.75rem,8vw,4.25rem)] font-black leading-[1.05] text-warm tracking-tight font-display">
        {dict.hero.title}
      </h1>

      <p className="mt-4 text-[clamp(1.35rem,4.5vw,2.5rem)] font-black anthem-glow font-display">
        {dict.hero.anthem}
      </p>

      <p className="mt-6 text-base sm:text-lg lg:text-[1.125rem] xl:text-xl text-warm leading-relaxed lg:leading-[1.75] max-w-xl">
        {intro}
      </p>

      <p className="mt-3 text-sm font-medium text-muted-foreground">
        {locale === "es"
          ? "Archivo Digital · Era del dúo 2003–2014"
          : "Digital Archive · Duo era 2003–2014"}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
        <Link
          href="#quienes-fueron"
          onClick={onCtaClick}
          className="cta-pulse inline-flex h-12 sm:h-14 items-center justify-center rounded-lg bg-accent px-8 sm:px-10 text-base sm:text-lg font-black text-accent-foreground glow-warm"
        >
          {dict.hero.cta}
        </Link>
        <a
          href={OFFICIAL_LINKS.spotifyDuo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#1DB954] bg-[#1DB954]/15 px-6 sm:px-8 text-base font-bold text-warm hover:bg-[#1DB954]/25 transition-all"
        >
          <Music className="h-5 w-5 text-[#1DB954]" />
          Spotify
        </a>
      </div>

      <a
        href="#quienes-fueron"
        className="mt-10 lg:mt-12 inline-flex flex-col items-center lg:items-start gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
      >
        {dict.hero.scroll}
        <ChevronDown className="h-5 w-5 animate-bounce text-accent" />
      </a>
    </>
  );
}

export function HeroImmersive({ locale }: { locale: Locale }) {
  const [imgOk, setImgOk] = useState(true);
  const sound = useMicroSound();
  const intro = locale === "es" ? duoIntroEs() : duoIntroEn();

  const onCtaClick = useCallback(() => {
    sound.thud();
  }, [sound]);

  return (
    <>
      {/* Móvil: foto de fondo + texto abajo (como te gusta) */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden lg:hidden">
        <div className="absolute inset-0 -z-10">
          {imgOk ? (
            <Image
              src={DUO_HERO_IMAGE}
              alt="Al2 y El B — Los Aldeanos"
              fill
              priority
              className="object-cover object-[center_25%]"
              sizes="100vw"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#002F6C] to-[#0a0908]"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 cuban-flag-overlay opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background from-[38%] via-background/90 to-background/30" />
        </div>

        <div className="relative z-10 w-full px-4 pb-16 pt-28 text-center">
          <HeroContent locale={locale} intro={intro} onCtaClick={onCtaClick} />
          {imgOk && (
            <p className="mt-6 text-[10px] text-muted-foreground/80">{DUO_HERO_ATTRIBUTION}</p>
          )}
        </div>
      </section>

      {/* Escritorio: panel de texto 100% opaco — siempre visible */}
      <section className="hidden lg:grid lg:grid-cols-[minmax(420px,1fr)_1.15fr] min-h-[calc(100svh-4rem)] bg-background border-b border-border/50">
        <div className="relative z-20 flex flex-col justify-center bg-background px-12 xl:px-20 py-16 text-left">
          <HeroContent locale={locale} intro={intro} onCtaClick={onCtaClick} />
        </div>

        <div className="relative min-h-[520px] bg-[#0a0908]">
          {imgOk ? (
            <Image
              src={DUO_HERO_IMAGE}
              alt="Al2 y El B — Los Aldeanos, el dúo juntos"
              fill
              priority
              className="object-cover object-center"
              sizes="55vw"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#002F6C] to-[#0a0908]" />
          )}
          <div className="absolute inset-0 cuban-flag-overlay opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent pointer-events-none" />
          <p className="absolute bottom-4 right-4 text-[10px] text-muted-foreground/70 max-w-xs text-right">
            {DUO_HERO_ATTRIBUTION}
          </p>
        </div>
      </section>
    </>
  );
}
