"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Locale } from "@/types/content";

const videos = [
  {
    id: "duo",
    primary: true,
    titleEs: "Los Aldeanos — Dúo (principal)",
    titleEn: "Los Aldeanos — Duo (primary)",
    embed: OFFICIAL_LINKS.youtubeDuoEmbed,
    link: OFFICIAL_LINKS.youtubeDuo,
  },
  {
    id: "al2",
    primary: false,
    titleEs: "Al2 — Apéndice",
    titleEn: "Al2 — Appendix",
    embed: "https://www.youtube.com/embed?listType=user_uploads&list=al2elaldeano",
    link: OFFICIAL_LINKS.youtubeAl2,
  },
  {
    id: "elb",
    primary: false,
    titleEs: "El B — Apéndice",
    titleEn: "El B — Appendix",
    embed: "https://www.youtube.com/embed?listType=search&list=El+B+Los+Aldeanos",
    link: OFFICIAL_LINKS.youtubeElB,
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
                className={
                  v.primary
                    ? "aspect-video rounded-xl overflow-hidden border border-primary/40 glow-blue"
                    : "aspect-video rounded-xl overflow-hidden border border-border/60 opacity-90"
                }
                animate={{ scale: activeHover === v.id ? 1.01 : 1 }}
              >
                <iframe
                  title={locale === "es" ? v.titleEs : v.titleEn}
                  src={
                    activeHover === v.id ? `${v.embed}&autoplay=1&mute=1` : v.embed
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
                className={
                  v.primary
                    ? "mt-2 inline-block text-sm font-bold text-accent hover:underline"
                    : "mt-2 inline-block text-xs text-muted-foreground hover:text-accent"
                }
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
          className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:glow-blue"
        >
          ←
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:glow-blue"
        >
          →
        </button>
      </div>
    </div>
  );
}
