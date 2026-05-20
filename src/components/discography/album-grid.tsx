"use client";

import { useState } from "react";
import { ExternalLink, Music } from "lucide-react";
import { getAlbumsByArtist } from "@/lib/content-data";
import type { Album, ArtistFilter, Locale } from "@/types/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function AlbumCard({ album, locale }: { album: Album; locale: Locale }) {
  return (
    <Card id={album.slug}>
      <CardHeader>
        <div
          className="mb-4 h-40 w-full rounded-md grayscale hover:grayscale-0 transition-all"
          style={{
            backgroundColor: album.coverColor,
            boxShadow: "inset 0 0 60px rgba(200,16,46,0.15)",
          }}
          role="img"
          aria-label={album.title}
        />
        <div className="flex gap-2">
          <Badge>{album.year}</Badge>
          <Badge variant="outline">{album.artist}</Badge>
        </div>
        <CardTitle className="mt-2">{album.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{album.description}</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="tracks">
            <AccordionTrigger>
              {locale === "es" ? "Tracklist" : "Tracklist"}
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside text-sm space-y-1">
                {album.tracks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-wrap gap-2">
          {album.spotify && (
            <Button variant="outline" size="sm" asChild>
              <a href={album.spotify} target="_blank" rel="noopener noreferrer">
                <Music className="h-3 w-3 mr-1" /> Spotify
              </a>
            </Button>
          )}
          {album.youtube && (
            <Button variant="outline" size="sm" asChild>
              <a href={album.youtube} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" /> YouTube
              </a>
            </Button>
          )}
          {album.apple && (
            <Button variant="outline" size="sm" asChild>
              <a href={album.apple} target="_blank" rel="noopener noreferrer">
                Apple
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AlbumGrid({ locale }: { locale: Locale }) {
  const filters: { value: ArtistFilter | "all"; label: string }[] =
    locale === "es"
      ? [
          { value: "all", label: "Todos" },
          { value: "los-aldeanos", label: "Los Aldeanos" },
          { value: "al2", label: "Al2" },
          { value: "el-b", label: "El B" },
        ]
      : [
          { value: "all", label: "All" },
          { value: "los-aldeanos", label: "Los Aldeanos" },
          { value: "al2", label: "Al2" },
          { value: "el-b", label: "El B" },
        ];

  const [filter, setFilter] = useState<ArtistFilter | "all">("all");

  return (
    <Tabs value={filter} onValueChange={(v) => setFilter(v as ArtistFilter | "all")}>
      <TabsList className="flex flex-wrap h-auto gap-1">
        {filters.map((f) => (
          <TabsTrigger key={f.value} value={f.value}>
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {filters.map((f) => (
        <TabsContent key={f.value} value={f.value}>
          <div className="grid gap-6 md:grid-cols-2">
            {getAlbumsByArtist(locale, f.value).map((album) => (
              <AlbumCard key={album.slug} album={album} locale={locale} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
