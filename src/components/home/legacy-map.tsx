"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { ScrollReveal } from "@/components/museum/scroll-reveal";

const nodes = [
  {
    id: "pensamiento",
    es: "Pensamiento revolucionario",
    en: "Revolutionary thought",
    x: "50%",
    y: "15%",
    href: "letras",
  },
  {
    id: "libertad",
    es: "Libertad",
    en: "Freedom",
    x: "18%",
    y: "45%",
    href: "letras",
  },
  {
    id: "juventud",
    es: "Empoderamiento juvenil",
    en: "Youth empowerment",
    x: "82%",
    y: "45%",
    href: "legado",
  },
  {
    id: "diaspora",
    es: "Diáspora",
    en: "Diaspora",
    x: "50%",
    y: "78%",
    href: "comunidad",
  },
  {
    id: "centro",
    es: "Los Aldeanos",
    en: "Los Aldeanos",
    x: "50%",
    y: "50%",
    href: "historia",
    center: true,
  },
];

export function LegacyMap({ locale }: { locale: Locale }) {
  const base = localePath(locale);

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl font-black text-center sm:text-4xl text-gradient-gold">
            {locale === "es" ? "Mapa del Legado" : "Legacy Map"}
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            {locale === "es"
              ? "Hover sobre cada nodo para iluminar el camino."
              : "Hover each node to light the path."}
          </p>
        </ScrollReveal>

        <div className="relative mt-12 aspect-square max-h-[480px] mx-auto rounded-2xl border border-border bg-card/30 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="#C8102E" strokeWidth="1" />
            <line x1="18%" y1="45%" x2="50%" y2="50%" stroke="#C8102E" strokeWidth="1" />
            <line x1="82%" y1="45%" x2="50%" y2="50%" stroke="#C8102E" strokeWidth="1" />
            <line x1="50%" y1="78%" x2="50%" y2="50%" stroke="#F4A261" strokeWidth="1" />
          </svg>

          {nodes.map((node) => (
            <Link
              key={node.id}
              href={`${base}/${node.href}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: node.x, top: node.y }}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`rounded-full border-2 flex items-center justify-center text-center transition-all ${
                  node.center
                    ? "h-24 w-24 border-primary bg-primary/20 font-black text-sm glow-red"
                    : "h-16 w-16 border-border bg-card group-hover:border-primary group-hover:glow-red px-1"
                }`}
              >
                <span className="text-[10px] sm:text-xs font-bold leading-tight px-1">
                  {locale === "es" ? node.es : node.en}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
