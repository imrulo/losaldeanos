import { Hero } from "@/components/home/hero";
import { TimelinePreview } from "@/components/home/timeline-preview";
import { FeaturedReleases } from "@/components/home/featured-releases";
import { CulturalImpact } from "@/components/home/cultural-impact";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale as Locale} />
      <TimelinePreview locale={locale as Locale} />
      <FeaturedReleases locale={locale as Locale} />
      <CulturalImpact locale={locale as Locale} />
      <section className="py-20 px-4 sm:px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">
            {locale === "es" ? "Boletín del legado" : "Legacy newsletter"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg">
            {locale === "es"
              ? "Recibe actualizaciones del archivo."
              : "Get archive updates."}
          </p>
          <div className="mt-6">
            <NewsletterForm locale={locale as Locale} />
          </div>
        </div>
      </section>
    </>
  );
}
