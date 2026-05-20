"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { getAlbums } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { ScrollReveal } from "@/components/museum/scroll-reveal";

export function ReleasesCarousel({ locale }: { locale: Locale }) {
  const albums = getAlbums(locale).filter((a) => a.artist === "los-aldeanos");
  const base = localePath(locale);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 overflow-hidden bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-black sm:text-4xl">
            {locale === "es" ? "Lanzamientos destacados" : "Featured releases"}
          </h2>
        </ScrollReveal>

        <div className="mt-10 relative" ref={emblaRef}>
          <div className="flex gap-6 touch-pan-y">
            {albums.map((album, i) => (
              <motion.div
                key={album.slug}
                className="embla__slide min-w-0 flex-[0_0_75%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
                whileHover={{ scale: 1.03, zIndex: 10 }}
              >
                <Link
                  href={`${base}/discografia#${album.slug}`}
                  className="group block relative rounded-xl overflow-hidden border border-border hover:border-primary/60 transition-colors"
                >
                  <div
                    className="aspect-[4/5] relative"
                    style={{ backgroundColor: album.coverColor }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Play className="h-8 w-8 ml-1" fill="currentColor" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 p-6 w-full">
                      <span className="text-xs font-bold text-accent">
                        {album.year}
                      </span>
                      <h3 className="text-xl font-black mt-1">{album.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {album.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
