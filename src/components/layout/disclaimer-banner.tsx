import { AlertTriangle } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function DisclaimerBanner({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div
      role="note"
      className="border-b border-primary/30 bg-primary/15 px-4 py-3 text-center text-xs sm:text-sm font-medium text-warm/95"
    >
      <span className="inline-flex flex-wrap items-center gap-2 justify-center max-w-4xl mx-auto">
        <AlertTriangle className="h-4 w-4 text-accent shrink-0" aria-hidden />
        <strong className="text-accent">{dict.disclaimer.title}:</strong>
        <span>{dict.disclaimer.body}</span>
      </span>
    </div>
  );
}
