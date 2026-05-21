import Link from "next/link";
import { Heart } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { StreamingLinks } from "@/components/layout/streaming-links";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-primary/20 bg-gradient-to-b from-card/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground leading-relaxed">
          {dict.disclaimer.body}
        </p>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            {locale === "es" ? "Escuchar al dúo" : "Listen to the duo"}
          </p>
          <StreamingLinks locale={locale} />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-2 text-sm text-warm">
            <Heart className="h-4 w-4 text-cuban-red shrink-0" aria-hidden />
            <span>
              {locale === "es"
                ? "Hecho con amor para la comunidad aldeana ❤️ por "
                : "Made with love for the aldeana community ❤️ by "}
              <Link
                href="https://github.com/imrulo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-semibold hover:underline"
              >
                imrulo.eth
              </Link>
            </span>
          </p>
          <span className="text-sm text-muted-foreground">
            {dict.footer.credits} · {year}
          </span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
