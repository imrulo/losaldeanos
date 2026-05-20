"use client";

import { motion } from "framer-motion";
import { getQuotes } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/museum/scroll-reveal";
import { Badge } from "@/components/ui/badge";

export function FlipQuotes({ locale }: { locale: Locale }) {
  const quotes = getQuotes(locale);

  return (
    <section className="py-24 px-4 sm:px-6 bg-card/20">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-3xl font-black sm:text-4xl">
            {locale === "es"
              ? "Frases que despertaron"
              : "Lines that awakened"}
          </h2>
        </ScrollReveal>

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q) => (
            <StaggerItem key={q.id}>
              <div className="flip-card h-56 w-full cursor-pointer group">
                <div className="flip-card-inner relative w-full h-full">
                  <div className="flip-card-front absolute inset-0 rounded-xl border border-border bg-card p-6 flex flex-col justify-center">
                    <Badge variant="accent" className="w-fit mb-3">
                      {q.theme}
                    </Badge>
                    <p className="text-lg font-bold italic leading-snug">
                      &ldquo;{q.lyric}&rdquo;
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {locale === "es" ? "Toca para contexto" : "Tap for context"}
                    </p>
                  </div>
                  <div className="flip-card-back absolute inset-0 rounded-xl border border-primary/50 bg-primary/10 p-6 flex items-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {q.context}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
