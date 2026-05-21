"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const base = localePath(locale);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden vinyl-noise">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0a0a0a 0%, #1a0508 40%, #0a0a0a 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary"
        >
          Los Aldeanos
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black leading-[1.05] sm:text-7xl"
        >
          <span className="anthem-glow">{dict.hero.anthem}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground sm:text-xl"
        >
          {dict.hero.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg">
            <Link href={`${base}/historia`}>{dict.hero.cta}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`${base}/discografia`}>{dict.nav.discography}</Link>
          </Button>
        </motion.div>
        <motion.a
          href="#timeline-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 inline-flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          {dict.hero.scroll}
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
