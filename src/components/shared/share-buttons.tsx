"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encoded}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${encoded}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Share2 className="h-4 w-4 text-muted-foreground" aria-hidden />
      {links.map((l) => (
        <Button key={l.label} variant="outline" size="sm" asChild>
          <a href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (navigator.share) {
            void navigator.share({ title, url });
          } else {
            void navigator.clipboard.writeText(url);
          }
        }}
      >
        Copiar enlace
      </Button>
    </div>
  );
}
