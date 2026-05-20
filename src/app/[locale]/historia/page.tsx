import { PageHeader } from "@/components/shared/page-header";
import { TimelineFull } from "@/components/historia/timeline-full";
import { BioCards } from "@/components/historia/bio-cards";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function HistoriaPage({
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
        title={l === "es" ? "Historia y Biografía" : "History & Biography"}
        subtitle={
          l === "es"
            ? "Cronología del dúo y perfiles basados en fuentes públicas."
            : "Duo chronology and profiles based on public sources."
        }
      />
      <TimelineFull locale={l} />
      <BioCards locale={l} />
    </div>
  );
}
