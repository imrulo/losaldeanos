"use client";

import { motion } from "framer-motion";
import { getQuotes } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/museum/scroll-reveal";
import { Badge } from "@/components/ui/badge";

export function FlipQuotes({ locale }: { locale: Locale }) {
  const quotes = getQuotes(locale).filter((q) => q.id !== "rap-guerra");

  return (
    <section
      id="frases"
      className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-card/20 to-background scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
            {locale === "es" ? "Voces del legado" : "Voices of the legacy"}
          </p>
          <h2 className="text-4xl font-black sm:text-5xl text-warm tracking-tight">
            {locale === "es" ? "Frases icónicas" : "Iconic lines"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            {locale === "es"
              ? "Pasa el cursor o toca para descubrir el contexto."
              : "Hover or tap to reveal the context."}
          </p>
        </ScrollReveal>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <StaggerItem key={q.id}>
              <div className="flip-card h-56 sm:h-64 w-full cursor-pointer group">
                <motion.div
                  className="flip-card-inner relative w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <div className="flip-card-front absolute inset-0 rounded-2xl border border-primary/25 bg-gradient-to-br from-card/90 to-primary/5 p-6 flex flex-col justify-between group-hover:border-accent/40 group-hover:glow-warm transition-all">
                    <Badge variant="outline" className="w-fit border-accent/40 text-accent text-xs">
                      {q.theme}
                    </Badge>
                    <p className="text-lg font-bold italic leading-snug text-warm">
                      &ldquo;{q.lyric}&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {locale === "es" ? "Voltear" : "Flip"}
                    </p>
                  </div>
                  <div className="flip-card-back absolute inset-0 rounded-2xl border border-accent/30 bg-primary/15 p-6 flex items-center backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {q.context}
                    </p>
                  </div>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
