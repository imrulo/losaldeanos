"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { localePath } from "@/lib/i18n";
import { legacyNodes } from "@/lib/legacy-nodes";
import type { Locale } from "@/types/content";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { useMicroSound } from "@/hooks/use-micro-sound";
import { cn } from "@/lib/utils";

export function LegacyMap({ locale }: { locale: Locale }) {
  const base = localePath(locale);
  const [active, setActive] = useState<string>("centro");
  const sound = useMicroSound();
  const activeNode = legacyNodes.find((n) => n.id === active) ?? legacyNodes[4];

  return (
    <section className="py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-4xl font-black text-center sm:text-5xl text-gradient-gold">
            {locale === "es" ? "Mapa del Legado" : "Legacy Map"}
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-lg mx-auto">
            {locale === "es"
              ? "Red interactiva — clic o hover en cada nodo."
              : "Interactive network — click or hover each node."}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_280px] gap-8 items-center">
          <div className="relative aspect-square max-h-[min(90vw,480px)] mx-auto w-full rounded-2xl border border-border bg-card/20 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {legacyNodes
                .filter((n) => !n.center)
                .map((node) => (
                  <motion.line
                    key={node.id}
                    x1={50}
                    y1={50}
                    x2={node.x}
                    y2={node.y}
                    stroke={active === node.id || active === "centro" ? "#C8102E" : "#333"}
                    strokeWidth={active === node.id ? 0.8 : 0.4}
                    initial={false}
                    animate={{
                      opacity: active === node.id ? 1 : 0.35,
                    }}
                  />
                ))}
            </svg>

            {legacyNodes.map((node) => {
              const isActive = active === node.id;
              const label = locale === "es" ? node.es : node.en;
              return (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => {
                    setActive(node.id);
                    sound.tick();
                  }}
                  onFocus={() => setActive(node.id)}
                  onClick={() => setActive(node.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      boxShadow: isActive
                        ? "0 0 40px rgba(200,16,46,0.5)"
                        : "0 0 0 transparent",
                    }}
                    className={cn(
                      "rounded-full border-2 flex items-center justify-center text-center transition-colors",
                      node.center
                        ? "h-20 w-20 sm:h-24 sm:w-24 border-primary bg-primary/25 font-black text-xs sm:text-sm"
                        : "h-14 w-14 sm:h-16 sm:w-16 border-border bg-card hover:border-primary",
                      isActive && "border-primary bg-primary/15",
                    )}
                  >
                    <span className="text-[9px] sm:text-[10px] font-bold leading-tight px-1">
                      {label}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-xl border border-border bg-card p-6 glow-red"
            >
              <h3 className="text-xl font-black text-primary">
                {locale === "es" ? activeNode.es : activeNode.en}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {locale === "es" ? activeNode.descEs : activeNode.descEn}
              </p>
              <Link
                href={`${base}/${activeNode.href}`}
                className="mt-6 inline-flex text-sm font-bold text-accent hover:text-primary"
              >
                {locale === "es" ? "Explorar →" : "Explore →"}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
