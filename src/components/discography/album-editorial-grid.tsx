"use client";

import { Music } from "lucide-react";
import { getAlbumsAppendix, getAlbumsDuo } from "@/lib/content-data";
import { getArchiveCopy } from "@/lib/archive-copy";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Album, Locale } from "@/types/content";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/museum/scroll-reveal";

export function AlbumEditorialGrid({ locale }: { locale: Locale }) {
  const copy = getArchiveCopy(locale);
  const duoAlbums = getAlbumsDuo(locale);
  const appendixAlbums = getAlbumsAppendix(locale);

  return (
    <div className="space-y-12">
      <ScrollReveal>
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/12 to-card/40 p-6 sm:p-10">
          <p className="text-lg sm:text-xl text-warm leading-relaxed max-w-3xl">
            {copy.discography.lead}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-14 px-8 bg-[#1DB954] hover:bg-[#1ed760] text-white font-black shadow-lg shadow-[#1DB954]/25"
          >
            <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
              <Music className="h-5 w-5 mr-2" />
              {copy.discography.spotifyCta}
            </a>
          </Button>
        </div>
      </ScrollReveal>

      <div className="space-y-8">
        {duoAlbums.map((album, i) => (
          <ScrollReveal key={album.slug} delay={i * 0.05}>
            <AlbumEditorialRow album={album} locale={locale} index={i + 1} />
          </ScrollReveal>
        ))}
      </div>

      <details className="group max-w-2xl">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-warm transition-colors list-none flex items-center gap-2">
          <span className="group-open:rotate-90 transition-transform">▸</span>
          {locale === "es"
            ? "Apéndice breve: carreras en solitario"
            : "Brief appendix: solo careers"}
        </summary>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border/60">
          {appendixAlbums.map((album) => (
            <p key={album.slug}>
              <span className="text-warm font-semibold">{album.title}</span>
              {" — "}
              {album.description}
              {album.youtube && (
                <>
                  {" · "}
                  <a
                    href={album.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {locale === "es" ? "Canal oficial" : "Official channel"}
                  </a>
                </>
              )}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

function AlbumEditorialRow({
  album,
  locale,
  index,
}: {
  album: Album;
  locale: Locale;
  index: number;
}) {
  const impact = album.impact ?? album.description;

  return (
    <article
      id={album.slug}
      className="rounded-2xl border border-border/50 bg-card/25 p-6 sm:p-10 hover:border-primary/35 transition-all duration-300"
    >
      <div className="flex flex-wrap items-baseline gap-3 mb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent font-black text-lg">
          {index}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          {album.year}
        </span>
      </div>
      <h3 className="text-3xl sm:text-4xl font-black text-warm tracking-tight font-display">
        {album.title}
      </h3>
      <p className="mt-3 text-lg font-medium text-accent/90">{album.description}</p>
      <p className="mt-5 text-base sm:text-lg text-warm/85 leading-[1.8]">{impact}</p>
      <p className="mt-5 text-sm text-muted-foreground border-t border-border/40 pt-5">
        <span className="font-semibold text-warm/70">
          {locale === "es" ? "Escuchar en Spotify" : "Listen on Spotify"}
        </span>
        {" · "}
        {album.tracks.slice(0, 5).join(" · ")}
      </p>
    </article>
  );
}
