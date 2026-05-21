"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DUO_HERO_IMAGE } from "@/lib/official-links";
import { getTimelineAppendix, getTimelineDuo } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import { OFFICIAL_LINKS, isDuoEraYear } from "@/lib/official-links";
import type { Locale, TimelineEvent } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { useMicroSound } from "@/hooks/use-micro-sound";

type ViewMode = "duo" | "appendix";

export function TimelineInteractive({
  locale,
  fullPage = false,
}: {
  locale: Locale;
  fullPage?: boolean;
}) {
  const duoEvents = getTimelineDuo(locale);
  const appendixEvents = getTimelineAppendix(locale);
  const [view, setView] = useState<ViewMode>("duo");
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeWarp, setTimeWarp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const sound = useMicroSound();
  const base = localePath(locale);

  const events = view === "duo" ? duoEvents : appendixEvents;

  const active = events[activeIndex] ?? events[0];
  const progress = events.length > 1 ? activeIndex / (events.length - 1) : 0;

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(events.length - 1, index));
      if (clamped !== activeIndex) {
        setTimeWarp(true);
        sound.tick();
        setTimeout(() => setTimeWarp(false), 400);
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
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft =
      dragStart.current.scroll - (e.clientX - dragStart.current.x) * 1.25;
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
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40 bg-accent/15 mix-blend-soft-light"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative">
        <ScrollReveal>
          <div className="flex items-end gap-4 flex-wrap">
            <Clock className="h-10 w-10 text-accent shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary mb-2">
                {locale === "es" ? "Corazón del archivo" : "Heart of the archive"}
              </p>
              <h2 className="text-4xl font-black sm:text-6xl tracking-tight text-warm">
                {locale === "es" ? "Viaje en el tiempo" : "Journey through time"}
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {locale === "es"
                  ? "2003–2014 en grande. Arrastra, explora, escucha al dúo."
                  : "2003–2014 front and center. Drag, explore, listen to the duo."}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setView("duo");
              setActiveIndex(0);
              sound.tick();
            }}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-bold border transition-all",
              view === "duo"
                ? "border-primary bg-primary text-primary-foreground glow-blue"
                : "border-border bg-card/50 hover:border-primary/40",
            )}
          >
            {locale === "es" ? "Era del dúo (2003–2014)" : "Duo era (2003–2014)"}
          </button>
          <button
            type="button"
            onClick={() => {
              setView("appendix");
              setActiveIndex(0);
              sound.tick();
            }}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium border transition-all opacity-80",
              view === "appendix"
                ? "border-muted-foreground/50 bg-muted text-foreground"
                : "border-border/60 bg-transparent text-muted-foreground hover:opacity-100",
            )}
          >
            {locale === "es" ? "Apéndice solistas" : "Solo appendix"}
          </button>
        </div>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-card/50 p-5 backdrop-blur-sm glow-blue">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {locale === "es" ? "Línea de tiempo" : "Timeline"}
            </span>
            <span className="text-3xl font-black text-accent tabular-nums">
              {active?.year}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progress * 100}
            onChange={(e) => scrub(Number(e.target.value) / 100)}
            className="timeline-scrubber w-full h-3 rounded-full cursor-pointer"
            aria-label="Timeline scrubber"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{events[0]?.year}</span>
            <span className="text-warm font-medium truncate max-w-[50%] text-center">
              {active?.title}
            </span>
            <span>{events[events.length - 1]?.year}</span>
          </div>
        </div>

        <div className="mt-10 relative min-w-0">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-0 top-[55%] z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/95 hover:border-primary glow-blue"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-0 top-[55%] z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/95 hover:border-primary glow-blue"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              className="absolute left-10 right-10 top-[58px] h-1 rounded-full bg-border/80 z-0"
              aria-hidden
            />
            <div
              className="absolute left-10 top-[58px] h-1 rounded-full bg-gradient-to-r from-primary to-accent z-0 transition-all duration-500"
              style={{ width: `calc((100% - 5rem) * ${progress})` }}
              aria-hidden
            />

            <div
              ref={scrollRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className={cn(
                "flex gap-6 sm:gap-10 overflow-x-auto py-12 px-12 sm:px-16 snap-x snap-mandatory scrollbar-hide touch-pan-x",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
            >
              {events.map((event, i) => (
                <TimelineNode
                  key={`${view}-${event.year}-${event.title}`}
                  event={event}
                  active={i === activeIndex}
                  duoView={view === "duo"}
                  onSelect={() => {
                    goTo(i);
                    setModalOpen(true);
                  }}
                  onHover={() => i !== activeIndex && goTo(i)}
                />
              ))}
            </div>
        </div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-primary/25 p-0">
            {active && (
              <TimelineDetailModal
                event={active}
                locale={locale}
                base={base}
              />
            )}
          </DialogContent>
        </Dialog>

        {!fullPage && (
          <Link
            href={`${base}/historia`}
            className="mt-10 inline-flex text-sm font-bold text-primary hover:text-accent"
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
  duoView,
  onSelect,
  onHover,
}: {
  event: TimelineEvent;
  active: boolean;
  duoView: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const isDuo = duoView && (event.isDuoEra || isDuoEraYear(event.year));
  const size = isDuo
    ? "h-28 w-28 sm:h-36 sm:w-36 text-2xl sm:text-3xl"
    : "h-16 w-16 sm:h-20 sm:w-20 text-base";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      layout
      animate={{ scale: active ? 1.05 : 1 }}
      className={cn(
        "snap-center shrink-0 flex flex-col items-center gap-4 z-10",
        isDuo ? "min-w-[130px] sm:min-w-[160px]" : "min-w-[90px]",
      )}
    >
      <div className="relative">
        <motion.div
          className={cn(
            "relative rounded-full border-[3px] flex items-center justify-center font-black transition-all duration-300",
            size,
            active
              ? "border-accent bg-primary/30 text-accent glow-warm shadow-[0_0_50px_rgba(230,184,0,0.25)]"
              : "border-primary/40 bg-card/80 text-warm hover:border-primary hover:glow-blue",
            event.highlight && !active && "ring-2 ring-accent/30",
            event.isAppendix && "opacity-70 scale-90 border-dashed",
          )}
          style={
            active && event.coverColor
              ? {
                  background: `radial-gradient(circle at 35% 30%, ${event.coverColor}99, #0a0908)`,
                }
              : undefined
          }
        >
          {event.year}
        </motion.div>
        {active && isDuo && (
          <motion.span
            layoutId="duo-ring"
            className="absolute -inset-3 rounded-full border-2 border-accent/40"
          />
        )}
      </div>
      <span
        className={cn(
          "font-bold text-center leading-tight",
          isDuo ? "text-sm sm:text-base max-w-[140px]" : "text-xs max-w-[90px] opacity-80",
          active ? "text-warm" : "text-muted-foreground",
        )}
      >
        {event.title}
      </span>
    </motion.button>
  );
}

function TimelineDetailModal({
  event,
  locale,
  base,
}: {
  event: TimelineEvent;
  locale: Locale;
  base: string;
}) {
  const searchQ = encodeURIComponent(`Los Aldeanos ${event.title} ${event.year}`);

  return (
    <>
      <div className="relative h-48 sm:h-56">
        {!event.isAppendix ? (
          <Image
            src={DUO_HERO_IMAGE}
            alt="Los Aldeanos — el dúo"
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(145deg, ${event.coverColor ?? "#1a1814"} 0%, #0a0908 100%)`,
            }}
          />
        )}
        <div className="absolute inset-0 cuban-flag-overlay opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <span className="absolute bottom-4 left-5 text-6xl font-black text-warm/15">
          {event.year}
        </span>
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {event.isAppendix
            ? locale === "es"
              ? "Apéndice"
              : "Appendix"
            : locale === "es"
              ? "Era del dúo"
              : "Duo era"}
        </Badge>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-warm text-left">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.longDescription ?? event.description}
        </p>

        {!event.isAppendix && (
          <>
            <div className="rounded-xl overflow-hidden border border-border bg-black/40">
              <iframe
                title="Spotify Los Aldeanos"
                src={OFFICIAL_LINKS.spotifyEmbed}
                className="h-[152px] w-full"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <iframe
                title={`YouTube ${event.title}`}
                src={`https://www.youtube.com/embed?listType=search&list=${searchQ}&mute=1`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-2">
          <Button asChild className="font-bold bg-accent text-accent-foreground hover:opacity-90">
            <Link href={`${base}/historia#${event.year}`}>
              {locale === "es" ? "Ir al detalle" : "View detail"}
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-primary/40">
            <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
              <Music className="h-4 w-4 mr-1" />
              Spotify — Los Aldeanos
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
