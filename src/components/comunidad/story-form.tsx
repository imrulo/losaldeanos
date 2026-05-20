"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/types/content";

export function StoryForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        location: form.get("location"),
        story: form.get("story"),
        locale,
      }),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  const labels =
    locale === "es"
      ? {
          title: "Tu historia con Los Aldeanos",
          name: "Nombre o alias",
          location: "Ciudad / país (opcional)",
          story: "Tu historia",
          note: "Las historias se moderan antes de publicarse.",
          thanks: "Gracias — tu historia está en revisión.",
        }
      : {
          title: "Your story with Los Aldeanos",
          name: "Name or alias",
          location: "City / country (optional)",
          story: "Your story",
          note: "Stories are moderated before publishing.",
          thanks: "Thanks — your story is under review.",
        };

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <h3 className="text-xl font-bold">{labels.title}</h3>
      <p className="text-sm text-muted-foreground">{labels.note}</p>
      <Input name="name" required placeholder={labels.name} />
      <Input name="location" placeholder={labels.location} />
      <textarea
        name="story"
        required
        rows={5}
        placeholder={labels.story}
        className="flex w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm"
      />
      <Button type="submit">
        {locale === "es" ? "Enviar" : "Submit"}
      </Button>
      {status === "ok" && (
        <p className="text-sm text-calm">{labels.thanks}</p>
      )}
    </form>
  );
}
