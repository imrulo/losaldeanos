"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { getGallery } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";

export function GalleryLightbox({ locale }: { locale: Locale }) {
  const images = getGallery(locale);
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const close = () => {
    setIndex(null);
    setZoom(1);
  };
  const prev = useCallback(() => {
    if (index === null) return;
    setZoom(1);
    setIndex((index - 1 + images.length) % images.length);
  }, [index, images.length]);
  const next = useCallback(() => {
    if (index === null) return;
    setZoom(1);
    setIndex((index + 1) % images.length);
  }, [index, images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(2.5, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, prev, next]);

  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 60) prev();
    if (dx < -60) next();
  };

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => {
              setIndex(i);
              setZoom(1);
            }}
            className={cn(
              "relative w-full break-inside-avoid rounded-xl overflow-hidden border border-border group hover:border-primary/60 transition-all",
              img.aspect === "tall" && "aspect-[3/4]",
              img.aspect === "wide" && "aspect-video",
              (!img.aspect || img.aspect === "square") && "aspect-square",
            )}
          >
            {img.src ? (
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <div
                className="absolute inset-0 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                style={{ backgroundColor: img.color }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
              <ZoomIn className="h-10 w-10 text-white" />
            </div>
            <span className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold bg-gradient-to-t from-black to-transparent">
              {img.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(1, z - 0.25));
                }}
                className="p-2 rounded-full bg-card border border-border"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(2.5, z + 0.25));
                }}
                className="p-2 rounded-full bg-card border border-border"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="p-2 rounded-full bg-card border border-border"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 sm:left-6 p-3 rounded-full bg-card border border-border z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 sm:right-6 p-3 rounded-full bg-card border border-border z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden border border-primary/30 bg-card"
              onClick={(e) => e.stopPropagation()}
              style={{ transformOrigin: "center center" }}
            >
              {images[index].src ? (
                <div className="relative aspect-[4/3] min-h-[40vh]">
                  <Image
                    src={images[index].src!}
                    alt={images[index].caption}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              ) : (
                <div
                  className="min-h-[50vh] flex flex-col items-center justify-center p-10"
                  style={{ backgroundColor: images[index].color }}
                />
              )}
              <div className="p-6 text-center border-t border-border">
                <p className="text-2xl font-black text-warm">{images[index].caption}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {index + 1} / {images.length}
                  {locale === "es" ? " · Flechas o swipe" : " · Arrows or swipe"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
