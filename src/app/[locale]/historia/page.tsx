import { HistoriaExperience } from "@/components/pages/historia-experience";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

export default async function HistoriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HistoriaExperience locale={locale as Locale} />;
}
