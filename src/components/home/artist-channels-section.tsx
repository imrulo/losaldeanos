"use client";

import { ExternalLink, PlayCircle } from "lucide-react";
import { getBios } from "@/lib/content-data";
import { OFFICIAL_LINKS } from "@/lib/official-links";
import { ScrollReveal } from "@/components/museum/scroll-reveal";
import type { Locale } from "@/types/content";

const CHANNELS = [
  {
    id: "al2",
    youtube: OFFICIAL_LINKS.youtubeAl2,
    accent: "from-primary/30 to-card/80",
    initial: "A2",
  },
  {
    id: "el-b",
    youtube: OFFICIAL_LINKS.youtubeElB,
    accent: "from-accent/20 to-card/80",
    initial: "EB",
  },
] as const;

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
              ? "Tras 2014, Al2 y El B siguieron por caminos propios. Este archivo prioriza la era del dúo, pero honra sus canales oficiales por separado."
              : "After 2014, Al2 and El B continued on their own paths. This archive prioritizes the duo era but honors their separate official channels."}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {bios.map((bio, i) => {
            const channel = CHANNELS[i];
            return (
              <ScrollReveal key={bio.name} delay={i * 0.08}>
                <article
                  className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${channel.accent} p-6 sm:p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,184,0,0.08)]`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-background/60 text-lg font-black text-accent"
                      aria-hidden
                    >
                      {channel.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-black text-warm font-display tracking-tight">
                        {bio.name}
                      </h3>
                      <p className="mt-1 text-sm text-primary-bright font-medium">
                        {bio.aka}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{bio.born}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm sm:text-base text-warm/85 leading-relaxed">
                    {bio.summary}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {bio.highlights.slice(0, 2).map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {h.replace(/youtube\.com.*/i, "").trim() || h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={channel.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#FF0000] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF0000]/20 hover:bg-[#e60000] transition-colors"
                  >
                    <PlayCircle className="h-5 w-5" aria-hidden />
                    {isEs
                      ? `YouTube — ${bio.name}`
                      : `YouTube — ${bio.name}`}
                    <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
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
