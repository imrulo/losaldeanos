"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mic2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/search/global-search";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

const navItems = [
  "home",
  "history",
  "discography",
  "multimedia",
  "lyrics",
  "legacy",
  "community",
  "about",
] as const;

const paths: Record<(typeof navItems)[number], string> = {
  home: "",
  history: "/historia",
  discography: "/discografia",
  multimedia: "/multimedia",
  lyrics: "/letras",
  legacy: "/legado",
  community: "/comunidad",
  about: "/sobre",
};

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = localePath(locale);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href={base}
          className="flex items-center gap-2 font-black tracking-tight text-foreground hover:text-primary"
        >
          <Mic2 className="h-6 w-6 text-primary" aria-hidden />
          <span>Los Aldeanos</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((key) => {
            const href = `${base}${paths[key]}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  active && "text-primary",
                )}
              >
                {dict.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <GlobalSearch locale={locale} />
          <LocaleSwitcher locale={locale} />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={`${base}/comunidad`}>{dict.nav.enterAldea}</Link>
          </Button>
          <button
            type="button"
            className="lg:hidden rounded-md p-2 hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((key) => (
              <li key={key}>
                <Link
                  href={`${base}${paths[key]}`}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild className="w-full mt-2">
                <Link href={`${base}/comunidad`} onClick={() => setOpen(false)}>
                  {dict.nav.enterAldea}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
