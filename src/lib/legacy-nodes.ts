export type LegacyNode = {
  id: string;
  es: string;
  en: string;
  descEs: string;
  descEn: string;
  x: number;
  y: number;
  href: string;
  center?: boolean;
};

export const legacyNodes: LegacyNode[] = [
  {
    id: "pensamiento",
    es: "Pensamiento revolucionario",
    en: "Revolutionary thought",
    descEs: "Ideas como arma — sin odio, con conciencia.",
    descEn: "Ideas as a weapon — without hate, with consciousness.",
    x: 50,
    y: 12,
    href: "letras",
  },
  {
    id: "libertad",
    es: "Libertad",
    en: "Freedom",
    descEs: "Pensar, crear y existir sin permiso.",
    descEn: "Think, create, and exist without permission.",
    x: 15,
    y: 48,
    href: "letras",
  },
  {
    id: "juventud",
    es: "Juventud",
    en: "Youth",
    descEs: "Una generación que no se calla.",
    descEn: "A generation that won't stay silent.",
    x: 85,
    y: 48,
    href: "legado",
  },
  {
    id: "diaspora",
    es: "Diáspora",
    en: "Diaspora",
    descEs: "La Aldea global más allá de la isla.",
    descEn: "The global Aldea beyond the island.",
    x: 50,
    y: 82,
    href: "comunidad",
  },
  {
    id: "centro",
    es: "Los Aldeanos",
    en: "Los Aldeanos",
    descEs: "El núcleo del rap conciencia cubano.",
    descEn: "The core of Cuban conscious rap.",
    x: 50,
    y: 50,
    href: "historia",
    center: true,
  },
] as const;
