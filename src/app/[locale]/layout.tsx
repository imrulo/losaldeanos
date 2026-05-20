import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner";
import { isValidLocale } from "@/lib/i18n";
import { siteMetadata, jsonLdMusicGroup } from "@/lib/metadata";
import type { Locale } from "@/types/content";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return siteMetadata(locale as Locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const jsonLd = jsonLdMusicGroup(locale);

  return (
    <ThemeProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DisclaimerBanner locale={locale} />
      <Navbar locale={locale} />
      <main className="pt-16 flex-1">{children}</main>
      <Footer locale={locale} />
    </ThemeProvider>
  );
}
