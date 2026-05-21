"use client";

import { VideoCarousel } from "@/components/multimedia/video-carousel";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function FeaturedVideos({ locale }: { locale: Locale }) {
  return (
    <section className="py-28 px-4 sm:px-6 border-y border-border/50">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl font-black sm:text-5xl text-warm">
            {locale === "es" ? "Multimedia del dúo" : "Duo multimedia"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {locale === "es"
              ? "Primero el dúo en YouTube; canales solistas como apéndice."
              : "Duo on YouTube first; solo channels as appendix."}
          </p>
        </ScrollReveal>
        <div className="mt-10">
          <VideoCarousel locale={locale} />
        </div>
      </div>
    </section>
  );
}
