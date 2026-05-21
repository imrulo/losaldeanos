"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { getAlbumsDuo } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { TiltCard } from "@/components/museum/tilt-card";
import { useMicroSound } from "@/hooks/use-micro-sound";

export function ReleasesCarousel({ locale }: { locale: Locale }) {
  const albums = getAlbumsDuo(locale);
  const slides = [...albums, ...albums];
  const base = localePath(locale);
  const sound = useMicroSound();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true, containScroll: false },
    [Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })],
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    sound.tick();
  }, [emblaApi, sound]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    sound.tick();
  }, [emblaApi, sound]);

  return (
    <section className="py-28 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-0">
        <ScrollReveal>
          <h2 className="text-4xl font-black sm:text-5xl">
            {locale === "es" ? "Lanzamientos destacados" : "Featured releases"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {locale === "es"
              ? "Álbumes del dúo (2003–2014) — pasa el cursor."
              : "Duo albums (2003–2014) — hover to explore."}
          </p>
        </ScrollReveal>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 sm:gap-8 -ml-4">
            {slides.map((album, i) => (
              <div
                key={`${album.slug}-${i}`}
                className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_48%] lg:flex-[0_0_36%] pl-4"
              >
                <TiltCard>
                  <Link
                    href={`${base}/discografia#${album.slug}`}
                    onClick={() => sound.tick()}
                    className="group block relative rounded-2xl overflow-hidden border-2 border-border hover:border-primary/80 transition-colors"
                  >
                    <motion.div
                      className="aspect-[4/5] relative"
                      style={{ backgroundColor: album.coverColor }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_3px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_6px)] opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-primary/20 backdrop-blur-[2px]">
                        <motion.span
                          initial={false}
                          whileHover={{ scale: 1.1 }}
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground glow-warm shadow-2xl"
                        >
                          <Play className="h-10 w-10 ml-1" fill="currentColor" />
                        </motion.span>
                      </div>
                      <div className="absolute bottom-0 p-6 sm:p-8 w-full">
                        <span className="text-xs font-black uppercase tracking-widest text-accent">
                          {album.year}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black mt-2 group-hover:text-primary transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 opacity-80 group-hover:opacity-100">
                          {album.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="h-12 w-12 rounded-full border-2 border-border font-bold hover:border-primary hover:glow-blue transition-all"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="h-12 w-12 rounded-full border-2 border-border font-bold hover:border-primary hover:glow-blue transition-all"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
