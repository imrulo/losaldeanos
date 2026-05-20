import { PageHeader } from "@/components/shared/page-header";
import { getMdxContent } from "@/lib/content";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

const approvedStories = [
  {
    name: "María · La Habana",
    story:
      "Descubrí Los Aldeanos en la secundaria. Sus letras me enseñaron que pensar diferente no es traición — es responsabilidad.",
  },
  {
    name: "Carlos · Miami",
    story:
      "En la diáspora, su música es el puente con la isla. Cada verso es un recuerdo y una promesa de no olvidar.",
  },
];

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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <PageHeader
        title={l === "es" ? "Legado e Impacto" : "Legacy & Impact"}
        subtitle={
          l === "es"
            ? "Influencia en el rap cubano y la conciencia de una generación."
            : "Influence on Cuban rap and a generation's consciousness."
        }
      />

      <div className="prose prose-invert max-w-3xl space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-2xl font-bold text-gradient-gold">{s.title}</h2>
            <p className="mt-4 text-muted-foreground whitespace-pre-line">
              {s.body.replace(/^-\s/gm, "• ")}
            </p>
          </section>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-bold">
          {l === "es" ? "Testimonios de fans" : "Fan testimonials"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {l === "es"
            ? "Historias moderadas de la comunidad."
            : "Moderated community stories."}
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {approvedStories.map((t) => (
            <li
              key={t.name}
              className="rounded-lg border border-border bg-card p-6"
            >
              <p className="font-semibold text-primary">{t.name}</p>
              <p className="mt-3 text-muted-foreground">{t.story}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
