"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mic2, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";
import { useMicroSound } from "@/hooks/use-micro-sound";

export function HeroImmersive({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = localePath(locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const [glitch, setGlitch] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const sound = useMicroSound();

  const onCtaClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      sound.thud();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((r) => [...r, { x, y, id }]);
      setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 700);
    },
    [sound],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#2a0810_0%,#0a0a0a_65%)]" />
        <div className="vinyl-disc-hero absolute -right-20 top-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] opacity-[0.14]" />
        <div className="vinyl-disc-hero absolute -left-32 bottom-0 h-[min(70vw,400px)] w-[min(70vw,400px)] opacity-[0.08] [animation-duration:28s]" />
        <div className="absolute inset-0 particle-field opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto max-w-5xl px-4 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Museo Virtual
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
          onMouseEnter={() => setGlitch(true)}
          onMouseLeave={() => setGlitch(false)}
          className={cn(
            "mt-8 text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.02] tracking-tight",
            glitch && "glitch-text scratch-hover",
          )}
        >
          <span className="block text-gradient-gold text-sm sm:text-base font-bold tracking-[0.2em] mb-4 uppercase">
            Los Aldeanos
          </span>
          &ldquo;{dict.hero.quote}&rdquo;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`${base}/comunidad`}
              onClick={onCtaClick}
              className="cta-pulse relative overflow-hidden inline-flex h-16 min-w-[240px] items-center justify-center rounded-lg bg-primary px-12 text-lg font-black text-primary-foreground glow-red"
            >
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: 10,
                    height: 10,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              <Mic2 className="mr-2 h-5 w-5" />
              {dict.nav.enterAldea}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#timeline-museum"
              className="inline-flex h-16 items-center justify-center rounded-lg border-2 border-border px-10 text-base font-bold hover:border-primary hover:text-primary hover:glow-red transition-all"
            >
              {dict.hero.cta}
            </Link>
          </motion.div>
        </motion.div>

        <motion.a
          href="#timeline-museum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-24 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-primary group"
        >
          <span className="group-hover:tracking-widest transition-all">
            {dict.hero.scroll}
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
        </motion.a>
      </motion.div>
    </section>
  );
}
