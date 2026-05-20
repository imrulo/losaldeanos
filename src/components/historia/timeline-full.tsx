"use client";

import { motion } from "framer-motion";
import { getTimeline } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import { Badge } from "@/components/ui/badge";

export function TimelineFull({ locale }: { locale: Locale }) {
  const events = getTimeline(locale);

  return (
    <ol className="relative border-l border-border ml-4 space-y-10">
      {events.map((event, i) => (
        <motion.li
          key={event.year}
          id={String(event.year)}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="relative pl-8"
        >
          <span
            className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"
            aria-hidden
          />
          <Badge variant={event.highlight ? "default" : "secondary"}>
            {event.year}
          </Badge>
          <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {event.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
