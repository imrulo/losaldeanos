"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Heart, Music } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { getDictionary, localePath } from "@/lib/i18n";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";
import { useMicroSound } from "@/hooks/use-micro-sound";
import { StreamingLinks } from "@/components/layout/streaming-links";

export function HeroImmersive({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = localePath(locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const [glitch, setGlitch] = useState(false);
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
        <Image
          src="/images/duo-hero.svg"
          alt="Los Aldeanos — legado del dúo"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 cuban-flag-overlay opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/5" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full mx-auto max-w-5xl px-4 pb-20 pt-32 sm:pt-40 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-accent"
        >
          <Heart className="h-3.5 w-3.5" />
          {locale === "es" ? "Era del dúo · 2003–2014" : "Duo era · 2003–2014"}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          onMouseEnter={() => setGlitch(true)}
          onMouseLeave={() => setGlitch(false)}
          className={cn(
            "mt-8 text-[clamp(2rem,6vw,3.75rem)] font-black leading-[1.1] text-warm max-w-4xl mx-auto",
            glitch && "glitch-text scratch-hover relative",
          )}
        >
          {dict.hero.quote}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#timeline-museum"
              onClick={onCtaClick}
              className="cta-pulse inline-flex h-14 min-w-[220px] items-center justify-center rounded-lg bg-accent px-10 text-lg font-black text-accent-foreground glow-warm"
            >
              {dict.hero.cta}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href={OFFICIAL_LINKS.spotifyDuo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary/20 px-8 text-base font-bold text-warm hover:bg-primary/30 glow-blue transition-all"
            >
              <Music className="h-5 w-5" />
              Spotify
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <StreamingLinks locale={locale} compact />
        </motion.div>

        <motion.a
          href="#timeline-museum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-accent"
        >
          {dict.hero.scroll}
          <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
        </motion.a>
      </motion.div>
    </section>
  );
}
