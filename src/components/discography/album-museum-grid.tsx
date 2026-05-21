"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Music, Play, Search } from "lucide-react";
import Fuse from "fuse.js";
import {
  getAlbumsDuo,
  getAlbumsAppendix,
} from "@/lib/content-data";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Album, Locale } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VinylPlayer } from "@/components/discography/vinyl-player";

export function AlbumMuseumGrid({ locale }: { locale: Locale }) {
  const duoAlbums = getAlbumsDuo(locale);
  const appendixAlbums = getAlbumsAppendix(locale);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Album | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [showAppendix, setShowAppendix] = useState(false);

  const filteredDuo = useMemo(() => {
    if (!query.trim()) return duoAlbums;
    const fuse = new Fuse(duoAlbums, {
      keys: ["title", "description", "tracks"],
      threshold: 0.4,
    });
    return fuse.search(query).map((r) => r.item);
  }, [duoAlbums, query]);

  return (
    <>
      <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground max-w-xl">
          {locale === "es"
            ? "Discografía del dúo (2003–2014). Escucha en Spotify oficial de Los Aldeanos."
            : "Duo discography (2003–2014). Listen on official Los Aldeanos Spotify."}
        </p>
        <Button asChild className="shrink-0 bg-primary hover:opacity-90">
          <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
            <Music className="h-4 w-4 mr-2" />
            Spotify — Los Aldeanos
          </a>
        </Button>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={locale === "es" ? "Buscar álbum del dúo..." : "Search duo album..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 border-primary/20"
        />
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredDuo.map((album) => (
            <AlbumCard
              key={album.slug}
              album={album}
              onOpen={() => {
                setSelected(album);
                setPlayingTrack(null);
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 border-t border-border/60 pt-10">
        <button
          type="button"
          onClick={() => setShowAppendix(!showAppendix)}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {locale === "es"
            ? showAppendix
              ? "▾ Ocultar apéndice (carreras solistas)"
              : "▸ Apéndice breve: carreras solistas"
            : showAppendix
              ? "▾ Hide appendix (solo careers)"
              : "▸ Brief appendix: solo careers"}
        </button>
        {showAppendix && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 opacity-75">
            {appendixAlbums.map((album) => (
              <AlbumCard
                key={album.slug}
                album={album}
                small
                onOpen={() => {
                  setSelected(album);
                  setPlayingTrack(null);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl border-primary/20">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-warm">{selected.title}</DialogTitle>
                <p className="text-muted-foreground">{selected.description}</p>
              </DialogHeader>
              <div className="grid sm:grid-cols-2 gap-6">
                <div
                  className="aspect-square rounded-xl border border-border"
                  style={{ backgroundColor: selected.coverColor }}
                />
                <div>
                  <VinylPlayer spinning={!!playingTrack} />
                  <ul className="mt-4 space-y-1 max-h-48 overflow-y-auto">
                    {selected.tracks.map((track) => (
                      <li key={track}>
                        <button
                          type="button"
                          onClick={() =>
                            setPlayingTrack(playingTrack === track ? null : track)
                          }
                          className={cn(
                            "w-full text-left rounded-md px-3 py-2 text-sm flex gap-2 hover:bg-muted",
                            playingTrack === track && "bg-primary/15 text-primary",
                          )}
                        >
                          <Play className="h-3 w-3 mt-0.5 shrink-0" />
                          {track}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {playingTrack && (
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <iframe
                    title={playingTrack}
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`Los Aldeanos ${selected.title} ${playingTrack}`)}`}
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button asChild className="bg-primary">
                  <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
                    <Music className="h-3 w-3 mr-1" /> Spotify — Dúo
                  </a>
                </Button>
                {selected.youtube && (
                  <Button variant="outline" asChild>
                    <a href={selected.youtube} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" /> YouTube
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function AlbumCard({
  album,
  onOpen,
  small,
}: {
  album: Album;
  onOpen: () => void;
  small?: boolean;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onOpen}
      id={album.slug}
      className={cn(
        "text-left rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:glow-blue transition-all group",
        small && "opacity-90",
      )}
    >
      <div
        className={cn(
          "relative aspect-square",
          !small && "group-hover:scale-[1.02] transition-transform",
        )}
        style={{ backgroundColor: album.coverColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Play className="h-7 w-7 ml-0.5" fill="currentColor" />
          </span>
        </div>
      </div>
      <div className={cn("p-4", small && "p-3")}>
        <Badge variant="outline" className="border-accent/50 text-accent">
          {album.year}
        </Badge>
        <h3 className={cn("font-bold mt-2", small ? "text-base" : "text-lg")}>
          {album.title}
        </h3>
      </div>
    </motion.button>
  );
}
