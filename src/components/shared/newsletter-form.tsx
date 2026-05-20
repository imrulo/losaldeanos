"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function NewsletterForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), locale }),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(res.ok ? "ok" : "error");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:max-w-md">
      <Input
        name="email"
        type="email"
        required
        placeholder={dict.common.email}
        aria-label={dict.common.email}
      />
      <Button type="submit" disabled={status === "loading"}>
        {dict.common.submit}
      </Button>
      {status === "ok" && (
        <p className="text-sm text-calm sm:basis-full">✓ OK</p>
      )}
      {status === "error" && (
        <p className="text-sm text-primary sm:basis-full">Error</p>
      )}
    </form>
  );
}
