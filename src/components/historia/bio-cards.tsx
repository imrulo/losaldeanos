import { getBios } from "@/lib/content-data";
import type { Locale } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BioCards({ locale }: { locale: Locale }) {
  const bios = getBios(locale);

  return (
    <div className="mt-16 grid gap-8 lg:grid-cols-2">
      {bios.map((bio) => (
        <Card key={bio.name}>
          <CardHeader>
            <CardTitle className="text-2xl">{bio.name}</CardTitle>
            <p className="text-sm text-accent font-medium">{bio.aka}</p>
            {bio.born && (
              <p className="text-xs text-muted-foreground">{bio.born}</p>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{bio.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {bio.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-primary">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
