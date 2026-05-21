"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Music } from "lucide-react";
import { useCallback, useRef, useState } from "react";
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const sound = useMicroSound();

  const onCtaClick = useCallback(() => {
    sound.thud();
  }, [sound]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        {imgOk ? (
          <Image
            src={DUO_HERO_IMAGE}
            alt="Al2 y El B — Los Aldeanos, el dúo juntos"
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #002F6C 0%, #0a0908 45%, #1a1208 100%)",
            }}
            aria-hidden
          />
        )}
        <div className="absolute inset-0 cuban-flag-overlay opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/10" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full mx-auto max-w-4xl px-4 pb-20 pt-28 sm:pt-36 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[0.35em] text-accent"
        >
          {dict.hero.tagline}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="mt-6 text-[clamp(3rem,10vw,5.5rem)] font-black leading-none text-warm tracking-tight font-display"
        >
          {dict.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-[clamp(1.5rem,5vw,2.75rem)] font-black anthem-glow relative inline-block font-display"
        >
          {dict.hero.anthem}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 mx-auto max-w-2xl text-base sm:text-xl text-warm/90 leading-relaxed"
        >
          {archive.hero.intro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36 }}
          className="mt-4 text-sm font-medium text-muted-foreground"
        >
          {archive.hero.era}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#quienes-fueron"
              onClick={onCtaClick}
              className="cta-pulse inline-flex h-14 min-w-[240px] items-center justify-center rounded-lg bg-accent px-10 text-lg font-black text-accent-foreground glow-warm"
            >
              {dict.hero.cta}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href={OFFICIAL_LINKS.spotifyDuo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#1DB954] bg-[#1DB954]/20 px-8 text-base font-bold text-warm hover:bg-[#1DB954]/30 transition-all"
            >
              <Music className="h-5 w-5 text-[#1DB954]" />
              Spotify
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#quienes-fueron"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-accent"
        >
          {dict.hero.scroll}
          <ChevronDown className="h-6 w-6 animate-bounce text-accent" />
        </motion.a>

        {imgOk && (
          <p className="mt-8 text-[10px] text-muted-foreground/70 max-w-md mx-auto">
            {DUO_HERO_ATTRIBUTION}
          </p>
        )}
      </motion.div>
    </section>
  );
}
