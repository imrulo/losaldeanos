"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Search } from "lucide-react";
import Fuse from "fuse.js";
import { getAlbumsDuo, getAlbumsAppendix } from "@/lib/content-data";
import { getAlbumCover } from "@/lib/album-covers";
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
import { TiltCard } from "@/components/museum/tilt-card";
export function AlbumMuseumGrid({ locale }: { locale: Locale }) {
  const duoAlbums = getAlbumsDuo(locale);
  const appendixAlbums = getAlbumsAppendix(locale);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Album | null>(null);
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
            ? "Portadas y música del dúo (2003–2014). Todo el audio en Spotify oficial."
            : "Duo covers and music (2003–2014). All audio on official Spotify."}
        </p>
        <Button asChild className="shrink-0 bg-primary hover:opacity-90 glow-blue">
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

      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredDuo.map((album) => (
            <AlbumCard
              key={album.slug}
              album={album}
              onOpen={() => setSelected(album)}
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2 opacity-70">
            {appendixAlbums.map((album) => (
              <div
                key={album.slug}
                className="rounded-xl border border-border/60 bg-card/40 p-4"
              >
                <h3 className="font-bold text-muted-foreground">{album.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{album.description}</p>
                {album.youtube && (
                  <a
                    href={album.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs text-primary hover:underline"
                  >
                    {locale === "es" ? "Canal →" : "Channel →"}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg border-primary/25">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-warm">{selected.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selected.description}</p>
              </DialogHeader>
              <AlbumCoverArt album={selected} large />
              <ul className="space-y-1 max-h-44 overflow-y-auto text-sm">
                {selected.tracks.map((track) => (
                  <li key={track} className="rounded-md px-3 py-1.5 hover:bg-muted/60">
                    {track}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground font-black glow-warm">
                <a href={OFFICIAL_LINKS.spotifyDuo} target="_blank" rel="noopener noreferrer">
                  <Music className="h-5 w-5 mr-2" />
                  {locale === "es" ? "Escuchar en Spotify" : "Listen on Spotify"}
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function AlbumCoverArt({ album, large }: { album: Album; large?: boolean }) {
  const src = album.coverImage ?? getAlbumCover(album.slug);
  return (
    <div
      className={cn(
        "relative aspect-square rounded-xl overflow-hidden border border-primary/20 shadow-lg",
        large ? "w-full" : "w-full",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Portada — ${album.title}`}
          fill
          className="object-cover"
          sizes={large ? "(max-width: 512px) 100vw" : "(max-width: 768px) 50vw, 33vw"}
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: album.coverColor }} />
      )}
    </div>
  );
}

function AlbumCard({ album, onOpen }: { album: Album; onOpen: () => void }) {
  return (
    <TiltCard>
      <motion.button
        type="button"
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onOpen}
        id={album.slug}
        className="w-full text-left rounded-2xl border border-border/80 bg-card/80 overflow-hidden hover:border-primary/40 transition-colors group"
      >
        <AlbumCoverArt album={album} />
        <div className="p-5">
          <Badge variant="outline" className="border-accent/50 text-accent">
            {album.year}
          </Badge>
          <h3 className="font-black text-xl mt-2 text-warm group-hover:text-accent transition-colors">
            {album.title}
          </h3>
        </div>
      </motion.button>
    </TiltCard>
  );
}
