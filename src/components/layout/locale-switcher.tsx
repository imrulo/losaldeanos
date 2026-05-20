"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locales.find((l) => l !== locale)!;
  const swapped = pathname.replace(`/${locale}`, `/${other}`);

  return (
    <Link
      href={swapped || `/${other}`}
      className="rounded-md border border-border px-2 py-1 text-xs font-semibold uppercase tracking-wider hover:border-primary hover:text-primary"
      hrefLang={other}
    >
      {other}
    </Link>
  );
}
