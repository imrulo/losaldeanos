import { notFound } from "next/navigation";
import Link from "next/link";
import { getLyricBySlug, getLyrics } from "@/lib/content-data";
import { localePath, isValidLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/shared/page-header";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/content";

const lyricBodies: Record<string, { es: string[]; en: string[] }> = {
  "rap-es-guerra": {
    es: [
      "El rap es guerra, el rap es cultura,",
      "el rap es la voz de mi generación.",
      "No es guerra de balas, es guerra de ideas,",
      "donde el micrófono es mi única nación.",
      "[...]",
      "Fuente: transcripción pública — comunidad de fans.",
    ],
    en: [
      "Rap is war, rap is culture,",
      "rap is the voice of my generation.",
      "Not war of bullets, but war of ideas,",
      "where the microphone is my only nation.",
      "[...]",
      "Source: public transcription — fan community.",
    ],
  },
  "mi-generacion": {
    es: [
      "Somos la generación que no se calla,",
      "que piensa con la cabeza alta.",
      "[...]",
      "Fuente: pública.",
    ],
    en: [
      "We are the generation that won't stay silent,",
      "that thinks with heads held high.",
      "[...]",
      "Source: public.",
    ],
  },
  libertad: {
    es: [
      "Libertad de pensar, libertad de crear,",
      "libertad de ser quien soy sin pedir permiso.",
      "[...]",
    ],
    en: [
      "Freedom to think, freedom to create,",
      "freedom to be who I am without asking permission.",
      "[...]",
    ],
  },
  "revolucion-pensamiento": {
    es: [
      "No es revolución de armas, es revolución de ideas,",
      "de conciencia despierta en cada verso.",
      "[...]",
    ],
    en: [
      "Not a revolution of arms, but of ideas,",
      "of awakened consciousness in every verse.",
      "[...]",
    ],
  },
};

export async function generateStaticParams() {
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((locale) =>
    getLyrics(locale).map((l) => ({ locale, slug: l.slug })),
  );
}

export default async function LyricPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;
  const entry = getLyricBySlug(l, slug);
  if (!entry) notFound();

  const dict = getDictionary(l);
  const base = localePath(l);
  const lines = lyricBodies[slug]?.[l] ?? [
    entry.excerpt,
    l === "es" ? "Fuente: pública." : "Source: public.",
  ];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://losaldeanos.com";

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader title={entry.title} subtitle={`${entry.album} · ${entry.year}`} />
      <div className="flex flex-wrap gap-2 mb-8">
        {entry.themes.map((t) => (
          <Badge key={t} variant="accent">
            {t}
          </Badge>
        ))}
      </div>

      {entry.listenUrl && (
        <div className="mb-8 rounded-lg border border-border p-4">
          <p className="text-sm font-semibold mb-2">{dict.common.listenWhileReading}</p>
          <Button variant="outline" asChild>
            <a href={entry.listenUrl} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </Button>
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        {lines.map((line) => (
          <p key={line} className="text-lg leading-relaxed mb-2 font-medium">
            {line}
          </p>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted-foreground">{dict.common.sourcePublic}</p>

      <div className="mt-10">
        <ShareButtons
          title={entry.title}
          url={`${siteUrl}${base}/letras/${slug}`}
        />
      </div>
      <Link href={`${base}/letras`} className="mt-8 inline-block text-primary text-sm">
        ← {l === "es" ? "Todas las letras" : "All lyrics"}
      </Link>
    </article>
  );
}
