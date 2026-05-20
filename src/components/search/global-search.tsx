"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/lib/i18n";
import type { Locale, SearchDocument } from "@/types/content";

export function GlobalSearch({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(() => {
      void fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}`)
        .then((r) => r.json())
        .then((d: { results: SearchDocument[] }) => setResults(d.results ?? []));
    }, 200);
    return () => clearTimeout(t);
  }, [q, locale]);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:border-primary sm:hidden"
        onClick={() => setOpen(!open)}
        aria-label={dict.nav.search}
      >
        <Search className="h-4 w-4" />
      </button>
      <div
        className={
          open
            ? "absolute right-0 top-10 w-72 sm:static sm:w-48"
            : "hidden sm:block sm:w-48"
        }
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={dict.nav.search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-8"
            aria-label={dict.nav.search}
          />
        </div>
        {results.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => {
                    setQ("");
                    setOpen(false);
                  }}
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="block text-xs text-muted-foreground truncate">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
