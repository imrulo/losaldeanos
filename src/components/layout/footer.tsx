import Link from "next/link";
import { Heart } from "lucide-react";
import { getDictionary, localePath } from "@/lib/i18n";
import { StreamingLinks } from "@/components/layout/streaming-links";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = 2026;
  const aboutHref = localePath(locale, "/sobre");

  return (
    <footer className="mt-auto border-t border-primary/20 bg-gradient-to-b from-card/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            {locale === "es" ? "Escuchar al dúo" : "Listen to the duo"}
          </p>
          <StreamingLinks locale={locale} />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-2 text-sm text-warm">
            <Heart className="h-4 w-4 text-cuban-red shrink-0" aria-hidden />
            <span>{dict.footer.madeWith}</span>
            <Link
              href="https://github.com/imrulo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline"
            >
              GitHub
            </Link>
          </p>
          <span className="text-sm text-muted-foreground">
            {dict.footer.credits} · {year}
          </span>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            {dict.footer.disclaimer}{" "}
            <Link
              href={aboutHref}
              className="text-muted-foreground underline decoration-border underline-offset-2 hover:text-accent"
            >
              {locale === "es" ? "Aviso completo" : "Full notice"}
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
