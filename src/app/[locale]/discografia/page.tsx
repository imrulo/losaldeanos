import { PageHeader } from "@/components/shared/page-header";
import { AlbumGrid } from "@/components/discography/album-grid";
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
      <PageHeader
        title={l === "es" ? "Discografía" : "Discography"}
        subtitle={
          l === "es"
            ? "Los Aldeanos, Al2 y El B — enlaces a plataformas oficiales."
            : "Los Aldeanos, Al2, and El B — links to official platforms."
        }
      />
      <AlbumGrid locale={l} />
      <div className="mt-16 aspect-video max-w-3xl rounded-lg overflow-hidden border border-border">
        <iframe
          title="Al2 El Aldeano YouTube"
          src="https://www.youtube.com/embed?listType=search&list=Los+Aldeanos"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
