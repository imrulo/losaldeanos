import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

/** Legado vive en la homepage — evita secciones duplicadas. */
export default async function LegadoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  redirect(`/${locale}#rap-es-guerra`);
}
