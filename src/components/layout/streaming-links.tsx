import { Music, ExternalLink } from "lucide-react";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import type { Locale } from "@/types/content";

export function StreamingLinks({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const primary = {
    href: OFFICIAL_LINKS.spotifyDuo,
    label: "Spotify — Los Aldeanos",
    icon: Music,
  };

  const secondary = [
    {
      href: OFFICIAL_LINKS.youtubeAl2,
      label: locale === "es" ? "YouTube Al2 (apéndice)" : "YouTube Al2 (appendix)",
    },
    {
      href: OFFICIAL_LINKS.youtubeElB,
      label: locale === "es" ? "YouTube El B (apéndice)" : "YouTube El B (appendix)",
    },
  ];

  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-2 items-center"
          : "flex flex-wrap gap-3 justify-center items-center"
      }
    >
      <a
        href={primary.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-semibold text-warm hover:bg-primary/25 hover:glow-blue transition-all"
      >
        <primary.icon className="h-4 w-4 shrink-0" />
        {primary.label}
      </a>
      {secondary.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border/80 px-3 py-1.5 text-xs text-muted-foreground hover:text-accent hover:border-accent/40 transition-all"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          {link.label}
        </a>
      ))}
    </div>
  );
}
