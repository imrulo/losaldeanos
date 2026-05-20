"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Music, Play, Search } from "lucide-react";
import Fuse from "fuse.js";
import { getAlbums } from "@/lib/content-data";
import type { Album, ArtistFilter, Locale } from "@/types/content";
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

const filters: { id: ArtistFilter | "all"; es: string; en: string }[] = [
  { id: "all", es: "Todos", en: "All" },
  { id: "los-aldeanos", es: "Los Aldeanos", en: "Los Aldeanos" },
  { id: "al2", es: "Al2", en: "Al2" },
  { id: "el-b", es: "El B", en: "El B" },
];

export function AlbumMuseumGrid({ locale }: { locale: Locale }) {
  const allAlbums = getAlbums(locale);
  const [filter, setFilter] = useState<ArtistFilter | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Album | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list =
      filter === "all"
        ? allAlbums
        : allAlbums.filter((a) => a.artist === filter);
    if (query.trim()) {
      const fuse = new Fuse(list, {
        keys: ["title", "description", "tracks"],
        threshold: 0.4,
      });
      list = fuse.search(query).map((r) => r.item);
    }
    return list;
  }, [allAlbums, filter, query]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold border transition-all",
                filter === f.id
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              {locale === "es" ? f.es : f.en}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={locale === "es" ? "Buscar álbum..." : "Search album..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((album) => (
            <motion.button
              key={album.slug}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setSelected(album);
                setPlayingTrack(null);
              }}
              id={album.slug}
              className="text-left rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:glow-red transition-all group"
            >
              <div
                className="aspect-square relative grayscale group-hover:grayscale-0 transition-all"
                style={{ backgroundColor: album.coverColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                  <Play className="h-12 w-12 text-primary" fill="currentColor" />
                </div>
              </div>
              <div className="p-4">
                <Badge className="mb-2">{album.year}</Badge>
                <h3 className="font-bold text-lg">{album.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {album.description}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                <p className="text-muted-foreground">{selected.description}</p>
              </DialogHeader>

              <div className="grid sm:grid-cols-2 gap-8 items-center">
                <div
                  className="aspect-square rounded-lg"
                  style={{ backgroundColor: selected.coverColor }}
                />
                <div>
                  <VinylPlayer spinning={!!playingTrack} />
                  <ul className="mt-6 space-y-2">
                    {selected.tracks.map((track) => (
                      <li key={track}>
                        <button
                          type="button"
                          onClick={() =>
                            setPlayingTrack(
                              playingTrack === track ? null : track,
                            )
                          }
                          className={cn(
                            "w-full text-left rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                            playingTrack === track && "bg-primary/20 text-primary",
                          )}
                        >
                          <Play className="h-3 w-3 shrink-0" />
                          {track}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {playingTrack && (
                <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-border">
                  <iframe
                    title={playingTrack}
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(`Los Aldeanos ${selected.title} ${playingTrack}`)}`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {selected.spotify && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selected.spotify} target="_blank" rel="noopener noreferrer">
                      <Music className="h-3 w-3 mr-1" /> Spotify
                    </a>
                  </Button>
                )}
                {selected.youtube && (
                  <Button variant="outline" size="sm" asChild>
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
