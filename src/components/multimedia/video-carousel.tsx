"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/types/content";

const videos = [
  {
    id: "al2",
    titleEs: "Al2 El Aldeano — Canal oficial",
    titleEn: "Al2 El Aldeano — Official channel",
    embed: "https://www.youtube.com/embed?listType=user_uploads&list=al2elaldeano",
    link: "https://www.youtube.com/c/al2elaldeano",
  },
  {
    id: "search",
    titleEs: "Los Aldeanos — Selección",
    titleEn: "Los Aldeanos — Selection",
    embed: "https://www.youtube.com/embed?listType=search&list=Los+Aldeanos+live",
    link: "https://www.youtube.com/results?search_query=Los+Aldeanos",
  },
];

export function VideoCarousel({ locale }: { locale: Locale }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex gap-4">
          {videos.map((v) => (
            <div
              key={v.id}
              className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_85%]"
              onMouseEnter={() => setActiveHover(v.id)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <motion.div
                className="aspect-video rounded-xl overflow-hidden border border-border glow-red"
                animate={{ scale: activeHover === v.id ? 1.01 : 1 }}
              >
                <iframe
                  title={locale === "es" ? v.titleEs : v.titleEn}
                  src={
                    activeHover === v.id
                      ? `${v.embed}&autoplay=1&mute=1`
                      : v.embed
                  }
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
              <a
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-primary hover:underline"
              >
                {locale === "es" ? v.titleEs : v.titleEn} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-4">
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
  );
}
