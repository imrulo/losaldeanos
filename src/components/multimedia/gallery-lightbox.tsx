"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { getGallery } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";

export function GalleryLightbox({ locale }: { locale: Locale }) {
  const images = getGallery(locale);
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);
  const prev = useCallback(() => {
    if (index === null) return;
    setIndex((index - 1 + images.length) % images.length);
  }, [index, images.length]);
  const next = useCallback(() => {
    if (index === null) return;
    setIndex((index + 1) % images.length);
  }, [index, images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, prev, next]);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setIndex(i)}
            className={cn(
              "relative w-full break-inside-avoid rounded-lg overflow-hidden border border-border group",
              img.aspect === "tall" && "aspect-[3/4]",
              img.aspect === "wide" && "aspect-video",
              (!img.aspect || img.aspect === "square") && "aspect-square",
            )}
          >
            <div
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{ backgroundColor: img.color }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
              <ZoomIn className="h-8 w-8 text-white" />
            </div>
            <span className="absolute bottom-0 left-0 right-0 p-3 text-xs font-medium bg-gradient-to-t from-black/80 to-transparent">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-card border border-border"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 p-3 rounded-full bg-card border border-border"
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
              className="absolute right-4 p-3 rounded-full bg-card border border-border"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-4xl w-full aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: images[index].color }}
            >
              <div className="h-full flex flex-col items-center justify-center p-8">
                <p className="text-2xl font-bold">{images[index].caption}</p>
                <p className="mt-2 text-muted-foreground text-sm">
                  {index + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
