"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { ScrollReveal } from "@/components/museum/scroll-reveal";

const stories = [
  {
    name: "María · La Habana",
    es: "Descubrí Los Aldeanos en la secundaria. Sus letras me enseñaron que pensar diferente no es traición — es responsabilidad.",
    en: "I discovered Los Aldeanos in high school. Their lyrics taught me that thinking differently isn't betrayal — it's responsibility.",
  },
  {
    name: "Carlos · Miami",
    es: "En la diáspora, su música es el puente con la isla.",
    en: "In the diaspora, their music is the bridge to the island.",
  },
  {
    name: "Yeni · Madrid",
    es: "Cada verso es un archivo vivo de lo que fuimos y lo que podemos ser.",
    en: "Every verse is a living archive of who we were and who we can be.",
  },
];

export function TestimonialsCarousel({ locale }: { locale: Locale }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  const base = localePath(locale);

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-3xl font-black">
            {locale === "es" ? "Voces de La Aldea" : "Voices of La Aldea"}
          </h2>
        </ScrollReveal>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {stories.map((s) => (
              <motion.blockquote
                key={s.name}
                className="min-w-[85%] sm:min-w-[60%] lg:min-w-[40%] rounded-xl border border-border bg-card p-8"
                whileHover={{ borderColor: "rgba(200,16,46,0.5)" }}
              >
                <p className="text-lg italic text-muted-foreground leading-relaxed">
                  &ldquo;{locale === "es" ? s.es : s.en}&rdquo;
                </p>
                <footer className="mt-4 font-semibold text-primary">
                  — {s.name}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <Link
          href={`${base}/comunidad`}
          className="mt-8 inline-block text-sm font-semibold text-primary"
        >
          {locale === "es"
            ? "Comparte tu historia →"
            : "Share your story →"}
        </Link>
      </div>
    </section>
  );
}
