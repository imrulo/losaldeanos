import { PageHeader } from "@/components/shared/page-header";
import { GalleryLightbox } from "@/components/multimedia/gallery-lightbox";
import { StreamingLinks } from "@/components/layout/streaming-links";
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
              ? "Galería del dúo: fotos y portadas de álbumes. La música vive en Spotify."
              : "Duo gallery: photos and album covers. Music lives on Spotify."
          }
        />
        <div className="mt-6">
          <StreamingLinks locale={l} />
        </div>
      </ScrollReveal>

      <section className="mt-12">
        <GalleryLightbox locale={l} />
      </section>
    </div>
  );
}
