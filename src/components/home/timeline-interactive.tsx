"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Play, X } from "lucide-react";
import { getTimeline } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { ArtistFilter, Locale, TimelineEvent } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { useMicroSound } from "@/hooks/use-micro-sound";

type Filter = ArtistFilter | "all";

const filters: { id: Filter; es: string; en: string }[] = [
  { id: "all", es: "Todo", en: "All" },
  { id: "los-aldeanos", es: "Juntos", en: "Together" },
  { id: "al2", es: "Al2", en: "Al2" },
  { id: "el-b", es: "El B", en: "El B" },
];

function youtubeSearchUrl(title: string, year: number) {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`Los Aldeanos ${title} ${year}`)}`;
}

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
  const [timeWarp, setTimeWarp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const sound = useMicroSound();
  const base = localePath(locale);

  const events = useMemo(() => {
    if (filter === "all") return allEvents;
    return allEvents.filter(
      (e) => e.artist === filter || e.artist === "all" || !e.artist,
    );
  }, [allEvents, filter]);

  const active = events[activeIndex] ?? events[0];
  const progress = events.length > 1 ? activeIndex / (events.length - 1) : 0;
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(events.length - 1, index));
      if (clamped !== activeIndex) {
        setTimeWarp(true);
        sound.tick();
        setTimeout(() => setTimeWarp(false), 420);
      }
      setActiveIndex(clamped);
      const el = scrollRef.current?.children[clamped] as HTMLElement | undefined;
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    },
    [activeIndex, events.length, sound],
  );

  const scrub = (value: number) => {
    goTo(Math.round(value * (events.length - 1)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scroll: scrollRef.current.scrollLeft };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft =
      dragStart.current.scroll - (e.clientX - dragStart.current.x) * 1.2;
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <section
      id="timeline-museum"
      className={cn(
        "relative py-28 px-4 sm:px-6 overflow-hidden",
        fullPage && "min-h-screen",
      )}
    >
      <AnimatePresence>
        {timeWarp && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed inset-0 z-40 bg-primary/20 mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative">
        <ScrollReveal>
          <div className="flex items-end gap-4 flex-wrap">
            <Clock className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h2 className="text-4xl font-black sm:text-6xl tracking-tight">
                {locale === "es" ? "Viaje en el tiempo" : "Journey through time"}
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {locale === "es"
                  ? "Arrastra la línea · usa el scrubber · entra en cada año."
                  : "Drag the line · use the scrubber · enter each year."}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFilter(f.id);
                goTo(0);
                sound.tick();
              }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold border transition-all hover:scale-105",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground glow-red"
                  : "border-border bg-card/50 hover:border-primary/60",
              )}
            >
              {locale === "es" ? f.es : f.en}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card/40 p-4 sm:p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {locale === "es" ? "Línea de tiempo" : "Timeline"}
            </span>
            <span className="text-2xl font-black text-primary tabular-nums">
              {active?.year}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progress * 100}
            onChange={(e) => scrub(Number(e.target.value) / 100)}
            className="timeline-scrubber w-full h-3 rounded-full appearance-none cursor-pointer accent-primary"
            style={{ ["--value" as string]: `${progress * 100}%` }}
            aria-label="Timeline scrubber"
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
            <span>{events[0]?.year}</span>
            <span className="text-accent">{active?.title}</span>
            <span>{events[events.length - 1]?.year}</span>
          </div>
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 items-start">
          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 hover:border-primary hover:glow-red shadow-lg"
              aria-label="Previous year"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 hover:border-primary hover:glow-red shadow-lg"
              aria-label="Next year"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute left-8 right-8 top-[52px] h-0.5 bg-border z-0" />
            <div
              className="absolute left-8 top-[52px] h-0.5 bg-primary z-0 transition-all duration-500 glow-red"
              style={{ width: `calc(${progress * 100}% - 4rem)` }}
            />

            <div
              ref={scrollRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className={cn(
                "flex gap-4 sm:gap-8 overflow-x-auto py-8 px-10 sm:px-14 snap-x snap-mandatory scrollbar-hide select-none",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
            >
              {events.map((event, i) => (
                <TimelineNode
                  key={`${event.year}-${event.title}-${filter}`}
                  event={event}
                  active={i === activeIndex}
                  onSelect={() => goTo(i)}
                  onHover={() => i !== activeIndex && goTo(i)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <TimelineDetailPanel
                key={`${active.year}-${active.title}`}
                event={active}
                locale={locale}
                base={base}
                youtubeUrl={youtubeSearchUrl(active.title, active.year)}
              />
            )}
          </AnimatePresence>
        </div>

        {!fullPage && (
          <Link
            href={`${base}/historia`}
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            {locale === "es" ? "Historia completa" : "Full history"} →
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
  onHover,
}: {
  event: TimelineEvent;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      layout
      animate={{ scale: active ? 1.08 : 1 }}
      className="snap-center shrink-0 flex flex-col items-center gap-4 min-w-[100px] sm:min-w-[130px] z-10"
    >
      <div className="relative">
        <motion.div
          className={cn(
            "relative h-24 w-24 sm:h-28 sm:w-28 rounded-full border-[3px] flex items-center justify-center font-black text-xl sm:text-2xl transition-all duration-300",
            active
              ? "border-primary bg-primary/25 text-primary glow-red shadow-[0_0_60px_rgba(200,16,46,0.35)]"
              : "border-border/80 bg-card hover:border-primary/70 hover:shadow-lg",
            event.highlight && !active && "ring-2 ring-accent/40",
          )}
          style={
            active
              ? {
                  background: `radial-gradient(circle at 30% 30%, ${event.coverColor ?? "#1a0a0a"}88, #0a0a0a)`,
                }
              : undefined
          }
        >
          {event.year}
        </motion.div>
        {active && (
          <motion.span
            layoutId="timeline-ring"
            className="absolute -inset-2 rounded-full border border-primary/50"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </div>
      <span
        className={cn(
          "text-xs sm:text-sm font-bold text-center max-w-[120px] leading-tight",
          active ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {event.title}
      </span>
    </motion.button>
  );
}

function TimelineDetailPanel({
  event,
  locale,
  base,
  youtubeUrl,
}: {
  event: TimelineEvent;
  locale: Locale;
  base: string;
  youtubeUrl: string;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="mt-8 lg:mt-0 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl overflow-hidden glow-red lg:sticky lg:top-24"
    >
      <div
        className="h-36 sm:h-44 relative"
        style={{
          background: `linear-gradient(160deg, ${event.coverColor ?? "#1a0508"} 0%, #050505 70%)`,
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[7rem] font-black text-white/[0.06]">
          {event.year}
        </span>
        <Badge className="absolute top-4 left-4 text-base px-3 py-1">
          {event.year}
        </Badge>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <h3 className="text-2xl font-black leading-tight">{event.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.longDescription ?? event.description}
        </p>

        <div className="aspect-video rounded-lg overflow-hidden border border-border bg-black">
          <iframe
            title={`${event.title} preview`}
            src={`${youtubeUrl}&mute=1`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="flex-1 font-bold">
            <Link href={`${base}/historia#${event.year}`}>
              {locale === "es" ? "Ir al detalle" : "View detail"}
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`Los Aldeanos ${event.title} ${event.year}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="h-4 w-4 mr-1" />
              YouTube
            </a>
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
