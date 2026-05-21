import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function MultimediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  redirect(`/${locale}#legado-vivo`);
}
