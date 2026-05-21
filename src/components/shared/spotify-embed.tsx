import { OFFICIAL_LINKS } from "@/lib/official-links";
import { cn } from "@/lib/utils";

export function SpotifyEmbed({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-primary/25 bg-black/30",
        className,
      )}
    >
      <iframe
        title="Spotify — Los Aldeanos"
        src={OFFICIAL_LINKS.spotifyEmbed}
        className={compact ? "h-[152px] w-full" : "h-[352px] w-full"}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
