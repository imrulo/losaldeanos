import { PageHeader } from "@/components/shared/page-header";
import { RapEsGuerraSection } from "@/components/home/rap-es-guerra-section";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function LegadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <PageHeader
            title={l === "es" ? "Legado del dúo" : "Duo legacy"}
            subtitle={
              l === "es"
                ? "El rap es guerra y las frases que despertaron una generación (2003–2014)."
                : "El rap es guerra and the lines that awakened a generation (2003–2014)."
            }
          />
        </ScrollReveal>
      </div>
      <RapEsGuerraSection locale={l} />
      <FlipQuotes locale={l} />
    </>
  );
}
