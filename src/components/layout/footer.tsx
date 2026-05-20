import Link from "next/link";
import { Heart } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
          {dict.disclaimer.body}
        </p>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 text-primary" aria-hidden />
            {dict.footer.madeWith}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="https://github.com/imrulo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              github.com/imrulo
            </Link>
            <span>
              {dict.footer.credits} · {year}
            </span>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
