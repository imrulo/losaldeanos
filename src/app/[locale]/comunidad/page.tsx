import { PageHeader } from "@/components/shared/page-header";
import { StoryForm } from "@/components/comunidad/story-form";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "GitHub — imrulo",
    href: "https://github.com/imrulo",
  },
  {
    label: "YouTube — Al2 El Aldeano",
    href: "https://www.youtube.com/c/al2elaldeano",
  },
];

export default async function ComunidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <PageHeader
        title={l === "es" ? "Comunidad" : "Community"}
        subtitle={
          l === "es"
            ? "La Aldea global — enlaces, historias y conexión."
            : "The global Aldea — links, stories, and connection."
        }
      />

      <section className="mb-16">
        <h2 className="text-xl font-bold">
          {l === "es" ? "Enlaces" : "Links"}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Button variant="outline" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          {l === "es"
            ? "Agrega enlaces a foros/Discord de fans en content/es/comunidad.json cuando estén disponibles."
            : "Add fan forum/Discord links in content/en/comunidad.json when available."}
        </p>
      </section>

      <StoryForm locale={l} />
    </div>
  );
}
