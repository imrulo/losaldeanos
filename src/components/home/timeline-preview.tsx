"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getTimeline } from "@/lib/content-data";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { Badge } from "@/components/ui/badge";

export function TimelinePreview({ locale }: { locale: Locale }) {
  const events = getTimeline(locale).filter((e) => e.highlight).slice(0, 4);
  const base = localePath(locale);

  return (
    <section id="timeline-preview" className="py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black">
          {locale === "es" ? "Timeline" : "Timeline"}
        </h2>
        <p className="mt-2 text-muted-foreground max-w-xl">
          {locale === "es"
            ? "Hitos del legado — desde 5 Palmas hasta las carreras en solitario."
            : "Legacy milestones — from 5 Palmas to solo careers."}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <motion.article
              key={event.year}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <Badge variant="accent">{event.year}</Badge>
              <h3 className="mt-3 text-xl font-bold">{event.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {event.description}
              </p>
            </motion.article>
          ))}
        </div>
        <Link
          href={`${base}/historia`}
          className="mt-8 inline-block text-sm font-semibold text-primary hover:underline"
        >
          {locale === "es" ? "Ver timeline completo →" : "Full timeline →"}
        </Link>
      </div>
    </section>
  );
}
