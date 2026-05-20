import { AlertTriangle } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function DisclaimerBanner({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div
      role="note"
      className="border-b border-primary/20 bg-primary/10 px-4 py-2 text-center text-xs sm:text-sm text-foreground/90"
    >
      <span className="inline-flex items-center gap-2 justify-center">
        <AlertTriangle className="h-4 w-4 text-primary shrink-0" aria-hidden />
        {dict.footer.disclaimer}
      </span>
    </div>
  );
}
