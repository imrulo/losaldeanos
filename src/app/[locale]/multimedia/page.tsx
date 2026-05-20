import { PageHeader } from "@/components/shared/page-header";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";

const videos = [
  {
    title: "Al2 El Aldeano — Canal oficial",
    embed: "https://www.youtube.com/embed/videoseries?list=UUplaceholder",
    link: "https://www.youtube.com/c/al2elaldeano",
  },
];

const gallery = [
  { id: 1, caption: "Legado urbano", color: "#1a0a0a" },
  { id: 2, caption: "Rap conciencia", color: "#2a1515" },
  { id: 3, caption: "La Aldea", color: "#0f1a18" },
  { id: 4, caption: "Underground elevado", color: "#1f1208" },
];

export default async function MultimediaPage({
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
        title={l === "es" ? "Multimedia" : "Media"}
        subtitle={
          l === "es"
            ? "Videos oficiales y galería de imágenes históricas (contenido público)."
            : "Official videos and historical gallery (public content)."
        }
      />

      <section className="space-y-8">
        <h2 className="text-2xl font-bold">{l === "es" ? "Videos" : "Videos"}</h2>
        <div className="aspect-video max-w-4xl rounded-lg overflow-hidden border border-border glow-red">
          <iframe
            title="YouTube — Al2 El Aldeano"
            src="https://www.youtube.com/embed?listType=user_uploads&list=al2elaldeano"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-muted-foreground">
          <a
            href="https://www.youtube.com/c/al2elaldeano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            youtube.com/c/al2elaldeano
          </a>
        </p>
        {videos.map((v) => (
          <a
            key={v.link}
            href={v.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary"
          >
            {v.title} →
          </a>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">
          {l === "es" ? "Galería" : "Gallery"}
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((g) => (
            <figure
              key={g.id}
              className="aspect-square rounded-lg overflow-hidden border border-border"
            >
              <div
                className="h-full w-full grayscale hover:grayscale-0 transition-all"
                style={{ backgroundColor: g.color }}
                role="img"
                aria-label={g.caption}
              />
              <figcaption className="p-2 text-xs text-muted-foreground text-center">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
