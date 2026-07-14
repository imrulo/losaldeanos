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
        title={l === "es" ? "Sobre este archivo" : "About this archive"}
        subtitle={
          l === "es"
            ? "Un homenaje fan al dúo Los Aldeanos (2003–2014)."
            : "A fan tribute to the Los Aldeanos duo (2003–2014)."
        }
      />

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          {l === "es"
            ? "Este sitio es un archivo digital creado con respeto y cariño para la comunidad aldeana. Honra el legado público de Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) y Bian Oscar Rodríguez Galá (El B) cuando formaron Los Aldeanos."
            : "This site is a digital archive created with respect and care for the aldeana community. It honors the public legacy of Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) and Bian Oscar Rodríguez Galá (El B) when they formed Los Aldeanos."}
        </p>
        <p>
          {l === "es"
            ? "La música se enlaza a Spotify oficial. Las imágenes provienen de fuentes públicas documentadas. No mostramos videos embebidos si no son estables."
            : "Music links to official Spotify. Images come from documented public sources. We do not embed videos unless they are stable."}
        </p>
        <p className="text-sm">
          {l === "es"
            ? "Crédito del archivo: imrulo.eth · "
            : "Archive credit: imrulo.eth · "}
          <a
            href="https://github.com/imrulo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>

      <div className="mt-16 rounded-xl border border-border/60 bg-card/30 p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {dict.disclaimer.title}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {dict.disclaimer.body}
        </p>
      </div>
    </div>
  );
}
