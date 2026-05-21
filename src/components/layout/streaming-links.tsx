import { Music, PlayCircle } from "lucide-react";
import { ARTIST_NAMES } from "@/lib/artist-names";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Locale } from "@/types/content";

export function StreamingLinks({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const isEs = locale === "es";

  const links = [
    {
      href: OFFICIAL_LINKS.spotifyDuo,
      label: "Spotify — Los Aldeanos",
      icon: Music,
      className:
        "border-[#1DB954]/40 bg-[#1DB954]/10 text-warm hover:bg-[#1DB954]/20",
      iconClass: "text-[#1DB954]",
    },
    {
      href: OFFICIAL_LINKS.youtubeAl2,
      label: `YouTube — ${ARTIST_NAMES.al2.stageLong}`,
      icon: PlayCircle,
      className: "border-border/70 bg-card/40 text-warm hover:border-accent/40",
      iconClass: "text-[#FF0000]",
    },
    {
      href: OFFICIAL_LINKS.youtubeElB,
      label: `YouTube — ${ARTIST_NAMES.elB.stage}`,
      icon: PlayCircle,
      className: "border-border/70 bg-card/40 text-warm hover:border-accent/40",
      iconClass: "text-[#FF0000]",
    },
  ];

  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-2 items-center"
          : "flex flex-wrap gap-3 items-center"
      }
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${link.className}`}
        >
          <link.icon className={`h-4 w-4 shrink-0 ${link.iconClass}`} />
          {link.label}
        </a>
      ))}
    </div>
  );
}
