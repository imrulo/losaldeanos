import Link from "next/link";
import { getAlbums } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturedReleases({ locale }: { locale: Locale }) {
  const albums = getAlbums(locale)
    .filter((a) => a.artist === "los-aldeanos")
    .slice(0, 3);
  const base = localePath(locale);

  return (
    <section className="py-20 px-4 sm:px-6 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black">
          {locale === "es" ? "Lanzamientos destacados" : "Featured releases"}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Card key={album.slug} id={album.slug}>
              <CardHeader>
                <div
                  className="mb-4 h-32 w-full rounded-md"
                  style={{ backgroundColor: album.coverColor }}
                  role="img"
                  aria-label={album.title}
                />
                <Badge>{album.year}</Badge>
                <CardTitle className="mt-2">{album.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {album.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Link
          href={`${base}/discografia`}
          className="mt-8 inline-block text-sm font-semibold text-primary"
        >
          {locale === "es" ? "Discografía completa →" : "Full discography →"}
        </Link>
      </div>
    </section>
  );
}
