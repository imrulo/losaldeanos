import { PageHeader } from "@/components/shared/page-header";
import { BioCards } from "@/components/historia/bio-cards";
import { TimelineInteractive } from "@/components/home/timeline-interactive";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
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
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <PageHeader
            title={l === "es" ? "Historia y Biografía" : "History & Biography"}
            subtitle={
              l === "es"
                ? "Explora el legado año a año — arrastra el timeline."
                : "Explore the legacy year by year — drag the timeline."
            }
          />
        </ScrollReveal>
        <BioCards locale={l} />
      </div>
      <TimelineInteractive locale={l} fullPage />
    </div>
  );
}
