"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Music } from "lucide-react";
import { useCallback, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import {
  DUO_HERO_ATTRIBUTION,
  DUO_HERO_IMAGE,
  OFFICIAL_LINKS,
} from "@/lib/official-links";
import type { Locale } from "@/types/content";
import { useMicroSound } from "@/hooks/use-micro-sound";
import { getArchiveCopy } from "@/lib/archive-copy";

export function HeroImmersive({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const archive = getArchiveCopy(locale);
  const [imgOk, setImgOk] = useState(true);
  const sound = useMicroSound();

  const onCtaClick = useCallback(() => {
    sound.thud();
  }, [sound]);

  return (
    <section className="relative min-h-[100svh] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch overflow-hidden">
      {/* Fondo imagen: móvil pantalla completa; escritorio columna derecha */}
      <div className="absolute inset-0 lg:relative lg:order-2 lg:min-h-[100svh]">
        {imgOk ? (
          <Image
            src={DUO_HERO_IMAGE}
            alt="Al2 y El B — Los Aldeanos, el dúo juntos"
            fill
            priority
            className="object-cover object-[center_20%] lg:object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#002F6C] via-[#0a0908] to-[#1a1208]"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 cuban-flag-overlay opacity-40 lg:opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20 lg:bg-gradient-to-l lg:from-background/20 lg:via-transparent lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background from-[42%] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Texto: legible en escritorio con panel sólido */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end lg:justify-center lg:order-1 px-4 pb-16 pt-28 sm:pt-32 lg:px-12 xl:px-16 lg:py-20 lg:bg-background/92 lg:backdrop-blur-md lg:border-r lg:border-border/50">
        <div className="mx-auto w-full max-w-xl text-center lg:text-left lg:mx-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.35em] text-accent"
          >
            {dict.hero.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.6 }}
            className="mt-5 text-[clamp(2.75rem,8vw,4.5rem)] lg:text-[clamp(3rem,4.5vw,4.75rem)] font-black leading-[1.05] text-warm tracking-tight font-display"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-[clamp(1.35rem,4.5vw,2.25rem)] lg:text-3xl font-black anthem-glow font-display"
          >
            {dict.hero.anthem}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-warm leading-relaxed lg:leading-[1.7]"
          >
            {archive.hero.intro}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-3 text-sm font-medium text-muted-foreground"
          >
            {archive.hero.era}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
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
              className="inline-flex h-12 sm:h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#1DB954] bg-[#1DB954]/15 px-6 sm:px-8 text-base font-bold text-warm hover:bg-[#1DB954]/25 transition-all"
            >
              <Music className="h-5 w-5 text-[#1DB954]" />
              Spotify
            </a>
          </motion.div>

          <motion.a
            href="#quienes-fueron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
            className="mt-10 lg:mt-12 inline-flex flex-col items-center lg:items-start gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            {dict.hero.scroll}
            <ChevronDown className="h-5 w-5 animate-bounce text-accent" />
          </motion.a>

          {imgOk && (
            <p className="mt-6 text-[10px] text-muted-foreground/80 lg:max-w-md">
              {DUO_HERO_ATTRIBUTION}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
