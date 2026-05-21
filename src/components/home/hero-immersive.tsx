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
  align = "center",
}: {
  locale: Locale;
  intro: string;
  onCtaClick: () => void;
  align?: "center" | "left";
}) {
  const dict = getDictionary(locale);
  const isLeft = align === "left";

  return (
    <div className={isLeft ? "text-left" : "text-center lg:text-left"}>
      <span className="text-xs font-bold uppercase tracking-[0.35em] text-accent">
        {dict.hero.tagline}
      </span>

      <h1 className="mt-5 text-[clamp(2.25rem,7vw,4.25rem)] font-black leading-[1.05] text-foreground tracking-tight font-display">
        {dict.hero.title}
      </h1>

      <p className="mt-4 text-[clamp(1.25rem,4vw,2.5rem)] font-black anthem-glow font-display">
        {dict.hero.anthem}
      </p>

      <p className="mt-6 text-base sm:text-lg lg:text-[1.125rem] xl:text-xl text-foreground leading-relaxed lg:leading-[1.75] max-w-xl mx-auto lg:mx-0">
        {intro}
      </p>

      <p className="mt-3 text-sm font-medium text-muted-foreground">
        {locale === "es"
          ? "Archivo Digital · Era del dúo 2003–2014"
          : "Digital Archive · Duo era 2003–2014"}
      </p>

      <div
        className={`mt-8 flex flex-col sm:flex-row gap-3 ${
          isLeft ? "justify-start" : "justify-center lg:justify-start"
        }`}
      >
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
          className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#1DB954] bg-[#1DB954]/15 px-6 sm:px-8 text-base font-bold text-foreground hover:bg-[#1DB954]/25 transition-all"
        >
          <Music className="h-5 w-5 text-[#1DB954]" />
          Spotify
        </a>
      </div>

      <a
        href="#quienes-fueron"
        className={`mt-10 lg:mt-12 inline-flex flex-col gap-2 text-sm text-muted-foreground hover:text-accent transition-colors ${
          isLeft ? "items-start" : "items-center lg:items-start"
        }`}
      >
        {dict.hero.scroll}
        <ChevronDown className="h-5 w-5 animate-bounce text-accent" />
      </a>
    </div>
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
    <section className="border-b border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10 lg:pt-28 lg:pb-14">
        <HeroContent locale={locale} intro={intro} onCtaClick={onCtaClick} align="left" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[min(52vh,520px)] w-full overflow-hidden rounded-xl border border-border/60 bg-[#0a0908]">
          {imgOk ? (
            <Image
              src={DUO_HERO_IMAGE}
              alt="Al2 y El B — Los Aldeanos"
              fill
              priority
              className="object-cover object-[center_25%]"
              sizes="(max-width: 1024px) 100vw, 1280px"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#002F6C] to-[#0a0908]"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 cuban-flag-overlay opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          {imgOk && (
            <p className="absolute bottom-3 right-3 left-3 sm:left-auto text-[10px] text-muted-foreground text-right">
              {DUO_HERO_ATTRIBUTION}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
