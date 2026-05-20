"use client";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LoadingScreen } from "@/components/museum/loading-screen";
import { ReadingProgress } from "@/components/museum/reading-progress";
import { BackToTop } from "@/components/museum/back-to-top";

export function MuseumShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <ReadingProgress />
      {children}
      <BackToTop />
    </SmoothScrollProvider>
  );
}
