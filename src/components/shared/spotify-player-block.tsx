import { Music } from "lucide-react";
import { SpotifyEmbed } from "@/components/shared/spotify-embed";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import { cn } from "@/lib/utils";

export function SpotifyPlayerBlock({
  locale,
  compact = false,
  className,
}: {
  locale: "es" | "en";
  compact?: boolean;
  className?: string;
}) {
  const isEs = locale === "es";

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#1DB954]/35 bg-gradient-to-br from-[#1DB954]/10 via-card/50 to-background p-4 sm:p-5",
        "shadow-[0_0_40px_rgba(29,185,84,0.12)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="flex items-center gap-2 text-sm font-bold text-warm">
          <Music className="h-5 w-5 text-[#1DB954]" aria-hidden />
          {isEs ? "Reproductor Spotify — Los Aldeanos" : "Spotify player — Los Aldeanos"}
        </p>
        <a
          href={OFFICIAL_LINKS.spotifyDuo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary-bright hover:text-accent transition-colors"
        >
          {isEs ? "Abrir en Spotify ↗" : "Open in Spotify ↗"}
        </a>
      </div>
      <SpotifyEmbed compact={compact} />
    </div>
  );
}
