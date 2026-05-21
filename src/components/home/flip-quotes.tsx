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
import { cn } from "@/lib/utils";

export function FlipQuotes({ locale }: { locale: Locale }) {
  const quotes = getQuotes(locale);

  return (
    <section className="py-28 px-4 sm:px-6 bg-gradient-to-b from-card/30 to-background">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl font-black sm:text-5xl text-warm">
            {locale === "es"
              ? "Frases del legado"
              : "Legacy lines"}
          </h2>
          <p className="mt-2 text-accent font-bold anthem-glow text-lg">
            El rap es guerra
          </p>
          <p className="mt-2 text-muted-foreground">
            {locale === "es"
              ? "Toca o pasa el cursor para voltear."
              : "Tap or hover to flip."}
          </p>
        </ScrollReveal>

        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q) => (
            <StaggerItem key={q.id}>
              <div
                className={cn(
                  "flip-card h-64 w-full cursor-pointer group",
                  q.id === "rap-guerra" && "lg:col-span-2",
                )}
              >
                <motion.div
                  className="flip-card-inner relative w-full h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flip-card-front absolute inset-0 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6 flex flex-col justify-between shadow-lg group-hover:border-accent/50 group-hover:glow-warm transition-colors">
                    <Badge
                      variant="accent"
                      className={cn("w-fit", q.id === "rap-guerra" && "bg-accent")}
                    >
                      {q.id === "rap-guerra"
                        ? locale === "es"
                          ? "Himno"
                          : "Anthem"
                        : q.theme}
                    </Badge>
                    <p
                      className={cn(
                        "font-bold italic leading-snug text-foreground",
                        q.id === "rap-guerra" ? "text-xl sm:text-2xl" : "text-lg",
                      )}
                    >
                      &ldquo;{q.lyric}&rdquo;
                    </p>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {locale === "es" ? "Voltear →" : "Flip →"}
                    </p>
                  </div>
                  <div className="flip-card-back absolute inset-0 rounded-2xl border-2 border-accent/40 bg-primary/20 p-6 flex items-center backdrop-blur-sm">
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
