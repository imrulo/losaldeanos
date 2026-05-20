import { PageHeader } from "@/components/shared/page-header";
import { AlbumMuseumGrid } from "@/components/discography/album-museum-grid";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function DiscografiaPage({
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
          title={l === "es" ? "Discografía" : "Discography"}
          subtitle={
            l === "es"
              ? "Toca un álbum — vinilo, tracklist y preview en vivo."
              : "Tap an album — vinyl, tracklist, and live preview."
          }
        />
      </ScrollReveal>
      <AlbumMuseumGrid locale={l} />
    </div>
  );
}
