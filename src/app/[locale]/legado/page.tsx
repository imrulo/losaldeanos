import { PageHeader } from "@/components/shared/page-header";
import { getMdxContent } from "@/lib/content";
import { LegacyMap } from "@/components/home/legacy-map";
import { FlipQuotes } from "@/components/home/flip-quotes";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
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
  const { content } = getMdxContent(l, "legado");

  const sections = content
    .split("\n## ")
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.replace(/^## /, "").split("\n");
      return { title: title.trim(), body: rest.join("\n").trim() };
    });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <PageHeader
            title={l === "es" ? "Legado e Impacto" : "Legacy & Impact"}
            subtitle={
              l === "es"
                ? "Un museo interactivo del pensamiento crítico cubano."
                : "An interactive museum of Cuban critical thought."
            }
          />
        </ScrollReveal>

        <div className="prose prose-invert max-w-3xl space-y-8">
          {sections.map((s) => (
            <ScrollReveal key={s.title}>
              <section>
                <h2 className="text-2xl font-bold text-gradient-gold">
                  {s.title}
                </h2>
                <p className="mt-4 text-muted-foreground whitespace-pre-line leading-relaxed">
                  {s.body.replace(/^-\s/gm, "• ")}
                </p>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <LegacyMap locale={l} />
      <FlipQuotes locale={l} />
      <TestimonialsCarousel locale={l} />
    </>
  );
}
