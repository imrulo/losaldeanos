"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { getTimeline } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { ArtistFilter, Locale, TimelineEvent } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/museum/scroll-reveal";

type Filter = ArtistFilter | "all";

const filters: { id: Filter; es: string; en: string }[] = [
  { id: "all", es: "Todo", en: "All" },
  { id: "los-aldeanos", es: "Juntos", en: "Together" },
  { id: "al2", es: "Al2", en: "Al2" },
  { id: "el-b", es: "El B", en: "El B" },
];

export function TimelineInteractive({
  locale,
  fullPage = false,
}: {
  locale: Locale;
  fullPage?: boolean;
}) {
  const allEvents = getTimeline(locale);
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const base = localePath(locale);

  const events = useMemo(() => {
    if (filter === "all") return allEvents;
    return allEvents.filter(
      (e) => e.artist === filter || e.artist === "all" || !e.artist,
    );
  }, [allEvents, filter]);

  const active = events[activeIndex] ?? events[0];
  const progress = events.length > 1 ? activeIndex / (events.length - 1) : 0;

  const selectEvent = useCallback((index: number) => {
    setActiveIndex(index);
    setPanelOpen(true);
    const el = scrollRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const scrub = (value: number) => {
    const idx = Math.round(value * (events.length - 1));
    setActiveIndex(idx);
    selectEvent(idx);
  };

  return (
    <section
      id="timeline-museum"
      className={cn("py-24 px-4 sm:px-6", fullPage && "min-h-screen")}
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl font-black sm:text-5xl">
            {locale === "es" ? "Viaje en el tiempo" : "Journey through time"}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {locale === "es"
              ? "Arrastra, explora y entra en cada año del legado."
              : "Drag, explore, and step into each year of the legacy."}
          </p>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                setActiveIndex(0);
              }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold border transition-all",
                filter === f.id
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              {locale === "es" ? f.es : f.en}
            </button>
          ))}
        </div>

        {/* Scrubber */}
        <div className="mt-8">
          <input
            type="range"
            min={0}
            max={100}
            value={progress * 100}
            onChange={(e) => scrub(Number(e.target.value) / 100)}
            className="timeline-scrubber w-full h-2 rounded-full appearance-none cursor-pointer"
            aria-label={locale === "es" ? "Progreso timeline" : "Timeline progress"}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{events[0]?.year}</span>
            <span className="text-primary font-bold">{active?.year}</span>
            <span>{events[events.length - 1]?.year}</span>
          </div>
        </div>

        {/* Draggable horizontal timeline */}
        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => selectEvent(Math.max(0, activeIndex - 1))}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 hover:border-primary"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() =>
              selectEvent(Math.min(events.length - 1, activeIndex + 1))
            }
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 hover:border-primary"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            ref={scrollRef}
            drag="x"
            dragConstraints={{ left: -((events.length - 1) * 140), right: 0 }}
            style={{ x: dragX }}
            className="flex gap-6 overflow-x-auto pb-6 pt-4 px-2 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
          >
            {events.map((event, i) => (
              <TimelineNode
                key={`${event.year}-${event.title}`}
                event={event}
                active={i === activeIndex}
                onSelect={() => selectEvent(i)}
                locale={locale}
              />
            ))}
          </motion.div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {panelOpen && active && (
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="mt-8 rounded-xl border border-border bg-card/95 backdrop-blur-xl overflow-hidden glow-red"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div
                  className="min-h-[200px] md:min-h-[280px] relative"
                  style={{
                    background: `linear-gradient(135deg, ${active.coverColor ?? "#1a0a0a"} 0%, #0a0a0a 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-black text-white/10">
                      {active.year}
                    </span>
                  </div>
                  {active.youtubeId && (
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="accent" className="gap-1">
                        <Play className="h-3 w-3" /> Audio
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8 relative">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Badge className="mb-3">{active.year}</Badge>
                  <h3 className="text-2xl font-bold pr-8">{active.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {active.longDescription ?? active.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href={`${base}/historia#${active.year}`}>
                        {locale === "es" ? "Ir a ese año" : "Go to year"}
                      </Link>
                    </Button>
                    {active.youtubeId && (
                      <Button variant="outline" asChild>
                        <a
                          href={`https://www.youtube.com/results?search_query=Los+Aldeanos+${active.year}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          YouTube
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {!fullPage && (
          <Link
            href={`${base}/historia`}
            className="mt-8 inline-block text-sm font-semibold text-primary hover:underline"
          >
            {locale === "es" ? "Historia completa →" : "Full history →"}
          </Link>
        )}
      </div>
    </section>
  );
}

function TimelineNode({
  event,
  active,
  onSelect,
  locale,
}: {
  event: TimelineEvent;
  active: boolean;
  onSelect: () => void;
  locale: Locale;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "snap-center shrink-0 flex flex-col items-center gap-3 min-w-[120px]",
        active && "scale-105",
      )}
    >
      <div
        className={cn(
          "relative h-20 w-20 rounded-full border-2 flex items-center justify-center font-black text-lg transition-all",
          active
            ? "border-primary bg-primary/20 text-primary glow-red"
            : "border-border bg-card hover:border-primary/60",
          event.highlight && "ring-2 ring-accent/50 ring-offset-2 ring-offset-background",
        )}
      >
        {event.year}
        {active && (
          <motion.span
            layoutId="timeline-pulse"
            className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"
          />
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium text-center max-w-[100px] line-clamp-2",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {event.title}
      </span>
    </motion.button>
  );
}
