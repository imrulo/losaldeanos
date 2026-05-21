import { Music, PlayCircle } from "lucide-react";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Locale } from "@/types/content";

export function StreamingLinks({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const links = [
    {
      href: OFFICIAL_LINKS.spotifyDuo,
      label: "Spotify — Los Aldeanos",
      icon: Music,
      primary: true,
    },
    {
      href: OFFICIAL_LINKS.youtubeDuo,
      label: locale === "es" ? "YouTube — Los Aldeanos" : "YouTube — Los Aldeanos",
      icon: PlayCircle,
      primary: true,
    },
    {
      href: OFFICIAL_LINKS.youtubeAl2,
      label: "Al2",
      icon: PlayCircle,
      primary: false,
    },
    {
      href: OFFICIAL_LINKS.youtubeElB,
      label: "El B",
      icon: PlayCircle,
      primary: false,
    },
  ];

  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-2"
          : "flex flex-wrap gap-3 justify-center"
      }
    >
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              link.primary
                ? "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-semibold text-warm hover:bg-primary/25 hover:glow-blue transition-all"
                : "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/50 hover:text-accent transition-all"
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
