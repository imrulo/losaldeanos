"use client";

import { ExternalLink, PlayCircle } from "lucide-react";
import { getBios } from "@/lib/content-data";
import { ARTIST_NAMES } from "@/lib/artist-names";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

const ARTISTS = [
  {
    key: "al2" as const,
    youtube: OFFICIAL_LINKS.youtubeAl2,
    gradient: "from-primary/30 via-card/60 to-background",
    borderHover: "hover:border-primary-bright/50",
    badgeClass: "border-primary-bright/40 text-primary-bright bg-primary/15",
  },
  {
    key: "elB" as const,
    youtube: OFFICIAL_LINKS.youtubeElB,
    gradient: "from-accent/15 via-card/60 to-background",
    borderHover: "hover:border-accent/50",
    badgeClass: "border-accent/40 text-accent bg-accent/10",
  },
];

export function ArtistChannelsSection({ locale }: { locale: Locale }) {
  const bios = getBios(locale);
  const isEs = locale === "es";

  return (
    <section
      id="canales-oficiales"
      className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-20 border-t border-border/40 bg-card/15"
    >
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-3">
            {isEs ? "Apéndice · después del dúo" : "Appendix · after the duo"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-warm font-display tracking-tight">
            {isEs ? "Voces individuales" : "Individual voices"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {isEs
              ? `Tras 2014, ${ARTIST_NAMES.al2.stage} y ${ARTIST_NAMES.elB.stage} siguieron por caminos propios. Sus nombres de artista — no abreviaturas — son parte del lenguaje aldeano.`
              : `After 2014, ${ARTIST_NAMES.al2.stage} and ${ARTIST_NAMES.elB.stage} continued on separate paths. Their artist names are part of the aldeana vocabulary.`}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {bios.map((bio, i) => {
            const meta = ARTISTS[i];
            const names = meta.key === "al2" ? ARTIST_NAMES.al2 : ARTIST_NAMES.elB;

            return (
              <ScrollReveal key={names.stage} delay={i * 0.08}>
                <article
                  className={`rounded-2xl border border-border/60 bg-gradient-to-br ${meta.gradient} p-6 sm:p-8 transition-all duration-300 ${meta.borderHover}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex min-w-[4.5rem] shrink-0 items-center justify-center rounded-xl border px-3 py-2 font-black text-xl font-display ${meta.badgeClass}`}
                    >
                      {names.stage}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-warm font-display leading-tight">
                        {"stageLong" in names ? names.stageLong : names.stage}
                      </h3>
                      <p className="mt-1 text-sm text-warm/80">{names.full}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{bio.born}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm sm:text-base text-warm/90 leading-relaxed">
                    {bio.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {bio.highlights.slice(0, 2).map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {h.replace(/youtube\.com.*/i, "").trim() || h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={meta.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF0000] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF0000]/20 hover:bg-[#e60000] transition-colors"
                  >
                    <PlayCircle className="h-5 w-5 shrink-0" aria-hidden />
                    {`YouTube — ${"stageLong" in names ? names.stageLong : names.stage}`}
                    <ExternalLink className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden />
                  </a>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
