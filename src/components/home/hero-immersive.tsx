"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Volume2 } from "lucide-react";
import { useCallback, useState } from "react";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";

const HeroParticles = dynamic(
  () => import("@/components/home/hero-particles").then((m) => m.HeroParticles),
  { ssr: false },
);

export function HeroImmersive({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = localePath(locale);
  const [glitch, setGlitch] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const onCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 600);
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 120;
      gain.gain.value = 0.03;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      /* optional sound */
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0508_0%,_#0a0a0a_70%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-20 vinyl-noise"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, rgba(200,16,46,0.03) 2px, rgba(200,16,46,0.03) 4px)`,
        }}
        aria-hidden
      />
      <HeroParticles />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          className="text-xs font-bold uppercase text-primary"
        >
          Museo Virtual
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onMouseEnter={() => setGlitch(true)}
          onMouseLeave={() => setGlitch(false)}
          className={cn(
            "mt-6 text-5xl font-black leading-[1.05] sm:text-7xl cursor-default",
            glitch && "glitch-text",
          )}
        >
          &ldquo;{dict.hero.quote}&rdquo;
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-muted-foreground sm:text-xl"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href={`${base}/comunidad`}
            onClick={onCtaClick}
            className="relative overflow-hidden inline-flex h-14 items-center justify-center rounded-md bg-primary px-10 text-base font-bold text-primary-foreground glow-red hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {ripples.map((r) => (
              <span
                key={r.id}
                className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                style={{
                  left: r.x,
                  top: r.y,
                  width: 8,
                  height: 8,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
            <Volume2 className="mr-2 h-4 w-4 opacity-80" />
            {dict.nav.enterAldea}
          </Link>
          <Link
            href="#timeline-museum"
            className="inline-flex h-14 items-center justify-center rounded-md border border-border px-8 text-base font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            {dict.hero.cta}
          </Link>
        </motion.div>

        <motion.a
          href="#timeline-museum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          {dict.hero.scroll}
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
