import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="scratch-line mb-6 w-24" />
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
