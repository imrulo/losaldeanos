"use client";

import { HeroImmersive } from "@/components/home/hero-immersive";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { ReleasesCarousel } from "@/components/home/releases-carousel";
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
      <LegacyMap locale={locale} />
      <FlipQuotes locale={locale} />
      <TestimonialsCarousel locale={locale} />
      <section className="py-24 px-4 sm:px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="text-2xl font-bold">
              {locale === "es" ? "Boletín del legado" : "Legacy newsletter"}
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              {locale === "es"
                ? "Recibe actualizaciones del museo virtual."
                : "Get virtual museum updates."}
            </p>
          </ScrollReveal>
          <div className="mt-6">
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
