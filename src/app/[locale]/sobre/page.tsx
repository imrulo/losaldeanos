import { PageHeader } from "@/components/shared/page-header";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        title={l === "es" ? "Sobre este sitio" : "About this site"}
      />

      <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-bold text-primary">{dict.disclaimer.title}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {dict.disclaimer.body}
        </p>
      </div>

      <div className="mt-12 space-y-6 text-muted-foreground">
        <p>
          {l === "es"
            ? "Este archivo digital es un proyecto fan creado con Next.js 16, diseñado para preservar y celebrar el legado público de Los Aldeanos — Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) y Bian Oscar Rodríguez Galá (El B)."
            : "This digital archive is a fan project built with Next.js 16, designed to preserve and celebrate the public legacy of Los Aldeanos — Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) and Bian Oscar Rodríguez Galá (El B)."}
        </p>
        <p>
          {l === "es"
            ? "El contenido se gestiona mediante archivos MDX/JSON en /content — sin necesidad de tocar código para añadir entradas."
            : "Content is managed via MDX/JSON files in /content — no code changes needed to add entries."}
        </p>
        <h3 className="text-foreground font-bold">
          {l === "es" ? "Agregar contenido" : "Adding content"}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>timeline.json — eventos cronológicos</li>
          <li>albums.json — discografía</li>
          <li>lyrics.json + letras/[slug] — canciones</li>
          <li>bios.json — biografías</li>
          <li>mdx/legado.mdx — texto largo</li>
        </ul>
      </div>
    </div>
  );
}
