import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import Link from "next/link";

export function CulturalImpact({ locale }: { locale: Locale }) {
  const base = localePath(locale);
  const items =
    locale === "es"
      ? [
          {
            title: "Conciencia despierta",
            desc: "Letras que invitaron a pensar, no a obedecer el silencio.",
          },
          {
            title: "Rap cubano underground",
            desc: "Puente entre el barrio y la literatura urbana contemporánea.",
          },
          {
            title: "Comunidad global",
            desc: "La diáspora mantiene vivo el legado en cada playlist y foro.",
          },
        ]
      : [
          {
            title: "Awakened consciousness",
            desc: "Lyrics that invited thinking, not obeying silence.",
          },
          {
            title: "Cuban underground rap",
            desc: "A bridge between the block and contemporary urban literature.",
          },
          {
            title: "Global community",
            desc: "The diaspora keeps the legacy alive in every playlist and forum.",
          },
        ];

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-gradient-gold">
          {locale === "es" ? "Impacto cultural" : "Cultural impact"}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="border-l-2 border-primary pl-6"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>
        <Link
          href={`${base}/legado`}
          className="mt-10 inline-block font-semibold text-primary"
        >
          {locale === "es" ? "Explorar legado →" : "Explore legacy →"}
        </Link>
      </div>
    </section>
  );
}
