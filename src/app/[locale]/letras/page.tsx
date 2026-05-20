import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { getLyrics } from "@/lib/content-data";
import { localePath, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/types/content";

export default async function LetrasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;
  const lyrics = getLyrics(l);
  const base = localePath(l);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <PageHeader
        title={l === "es" ? "Letras y Análisis" : "Lyrics & Analysis"}
        subtitle={
          l === "es"
            ? "Canciones icónicas — transcripciones con crédito de fuente pública."
            : "Iconic songs — transcriptions credited to public sources."
        }
      />
      <p className="mb-10 max-w-3xl text-muted-foreground">
        {l === "es"
          ? "Sus letras hablaron de libertad, crítica social, empoderamiento juvenil y pensamiento independiente en Cuba — siempre desde el respeto y la reflexión."
          : "Their lyrics spoke of freedom, social critique, youth empowerment, and independent thought in Cuba — always with respect and reflection."}
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {lyrics.map((entry) => (
          <Card key={entry.slug}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`${base}/letras/${entry.slug}`}
                  className="hover:text-primary"
                >
                  {entry.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {entry.album} · {entry.year}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground line-clamp-2">
                {entry.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.themes.map((t) => (
                  <Badge key={t} variant="calm">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
