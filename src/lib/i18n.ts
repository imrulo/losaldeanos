import type { Locale } from "@/types/content";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

type Dictionary = {
  nav: {
    home: string;
    history: string;
    discography: string;
    multimedia: string;
    lyrics: string;
    legacy: string;
    community: string;
    about: string;
    enterAldea: string;
    search: string;
  };
  hero: {
    quote: string;
    tagline: string;
    cta: string;
    scroll: string;
  };
  footer: {
    madeWith: string;
    credits: string;
    rights: string;
    disclaimer: string;
  };
  common: {
    readMore: string;
    listenWhileReading: string;
    share: string;
    sourcePublic: string;
    filterAll: string;
    submit: string;
    newsletter: string;
    newsletterDesc: string;
    email: string;
  };
  disclaimer: {
    title: string;
    body: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  es: {
    nav: {
      home: "Inicio",
      history: "Historia",
      discography: "Discografía",
      multimedia: "Multimedia",
      lyrics: "Letras",
      legacy: "Legado",
      community: "Comunidad",
      about: "Sobre el sitio",
      enterAldea: "Entrar a La Aldea",
      search: "Buscar",
    },
    hero: {
      quote: "El rap es guerra",
      tagline: "Archivo Digital · Legado Vivo · Para la Comunidad",
      cta: "Explorar el archivo",
      scroll: "Descubre el legado",
    },
    footer: {
      madeWith: "Hecho con amor para la comunidad aldeana ❤️",
      credits: "Archivo Digital por imrulo.eth",
      rights:
        "Todos los derechos de las obras pertenecen a sus creadores.",
      disclaimer:
        "Sitio fan no oficial dedicado al legado público de Los Aldeanos. No representamos a los artistas.",
    },
    common: {
      readMore: "Leer más",
      listenWhileReading: "Escuchar mientras lees",
      share: "Compartir",
      sourcePublic: "Fuente: pública",
      filterAll: "Todos",
      submit: "Enviar",
      newsletter: "Boletín del legado",
      newsletterDesc:
        "Recibe actualizaciones del archivo: nuevas entradas, testimonios y recursos.",
      email: "Tu correo",
    },
    disclaimer: {
      title: "Aviso importante",
      body: "Sitio fan no oficial dedicado al legado público de Los Aldeanos. No representamos a Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) ni a Bian Oscar Rodríguez Galá (El B). Todos los enlaces dirigen a contenidos originales en plataformas oficiales de terceros.",
    },
  },
  en: {
    nav: {
      home: "Home",
      history: "History",
      discography: "Discography",
      multimedia: "Media",
      lyrics: "Lyrics",
      legacy: "Legacy",
      community: "Community",
      about: "About",
      enterAldea: "Enter La Aldea",
      search: "Search",
    },
    hero: {
      quote: "Rap is war",
      tagline: "Digital Archive · Living Legacy · For the Community",
      cta: "Explore the archive",
      scroll: "Discover the legacy",
    },
    footer: {
      madeWith: "Made with love for the aldeana community ❤️",
      credits: "Digital Archive by imrulo.eth",
      rights: "All work rights belong to their creators.",
      disclaimer:
        "Unofficial fan site dedicated to the public legacy of Los Aldeanos. We do not represent the artists.",
    },
    common: {
      readMore: "Read more",
      listenWhileReading: "Listen while you read",
      share: "Share",
      sourcePublic: "Source: public",
      filterAll: "All",
      submit: "Submit",
      newsletter: "Legacy newsletter",
      newsletterDesc:
        "Get archive updates: new entries, testimonials, and resources.",
      email: "Your email",
    },
    disclaimer: {
      title: "Important notice",
      body: "Unofficial fan site dedicated to the public legacy of Los Aldeanos. We do not represent Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) or Bian Oscar Rodríguez Galá (El B). All links point to original content on third-party official platforms.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}
