"use client";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ReadingProgress } from "@/components/museum/reading-progress";
import { BackToTop } from "@/components/museum/back-to-top";
import { FilmGrain } from "@/components/museum/film-grain";

export function MuseumShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ReadingProgress />
      <FilmGrain />
      {children}
      <BackToTop />
    </SmoothScrollProvider>
  );
}
