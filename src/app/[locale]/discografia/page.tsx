import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

/** Una sola discografía en inicio — evita duplicar álbumes. */
export default async function DiscografiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  redirect(`/${locale}#discografia`);
}
