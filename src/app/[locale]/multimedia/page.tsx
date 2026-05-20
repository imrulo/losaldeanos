import { PageHeader } from "@/components/shared/page-header";
import { VideoCarousel } from "@/components/multimedia/video-carousel";
import { GalleryLightbox } from "@/components/multimedia/gallery-lightbox";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function MultimediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <ScrollReveal>
        <PageHeader
          title={l === "es" ? "Multimedia" : "Media"}
          subtitle={
            l === "es"
              ? "Videos con hover-play y galería con lightbox."
              : "Videos with hover-play and lightbox gallery."
          }
        />
      </ScrollReveal>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          {l === "es" ? "Videos" : "Videos"}
        </h2>
        <VideoCarousel locale={l} />
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6">
          {l === "es" ? "Galería histórica" : "Historical gallery"}
        </h2>
        <GalleryLightbox locale={l} />
      </section>
    </div>
  );
}
