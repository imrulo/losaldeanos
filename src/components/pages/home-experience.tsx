"use client";

import { HeroImmersive } from "@/components/home/hero-immersive";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { ReleasesCarousel } from "@/components/home/releases-carousel";
import { FeaturedVideos } from "@/components/home/featured-videos";
import { GalleryLightbox } from "@/components/multimedia/gallery-lightbox";
import { LegacyMap } from "@/components/home/legacy-map";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

export function HomeExperience({ locale }: { locale: Locale }) {
  return (
    <>
      <HeroImmersive locale={locale} />
      <TimelineInteractive locale={locale} />
      <ReleasesCarousel locale={locale} />
      <FeaturedVideos locale={locale} />
      <section className="py-28 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-4xl font-black sm:text-5xl text-warm">
              {locale === "es" ? "Galería del dúo" : "Duo gallery"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              {locale === "es"
                ? "Momentos de Al2 y El B juntos — toca para ampliar."
                : "Moments of Al2 and El B together — tap to enlarge."}
            </p>
          </ScrollReveal>
          <div className="mt-10">
            <GalleryLightbox locale={locale} />
          </div>
        </div>
      </section>
      <LegacyMap locale={locale} />
      <FlipQuotes locale={locale} />
      <TestimonialsCarousel locale={locale} />
      <section className="py-28 px-4 sm:px-6 border-t border-border bg-card/10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black">
              {locale === "es" ? "Boletín del legado" : "Legacy newsletter"}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              {locale === "es"
                ? "Únete a La Aldea — actualizaciones del museo."
                : "Join La Aldea — museum updates."}
            </p>
          </ScrollReveal>
          <div className="mt-8">
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
