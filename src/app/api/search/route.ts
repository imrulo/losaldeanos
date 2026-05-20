import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/content";
import { createSearch } from "@/lib/search";
import { isValidLocale } from "@/lib/i18n";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const localeParam = searchParams.get("locale") ?? "es";

  if (!isValidLocale(localeParam) || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const fuse = createSearch(buildSearchIndex(localeParam));
  const results = fuse.search(q).slice(0, 12).map((r) => r.item);

  return NextResponse.json({ results });
}
