/** Enlaces verificados — dúo primero, solistas como apéndice. */
export const OFFICIAL_LINKS = {
  spotifyDuo: "https://open.spotify.com/artist/4Y6VI2Mfdhvb1RImggzOiY",
  spotifyEmbed:
    "https://open.spotify.com/embed/artist/4Y6VI2Mfdhvb1RImggzOiY?utm_source=generator",
  youtubeAl2: "https://www.youtube.com/channel/UCYw09b1bNwXBickiw3k5aOw",
  youtubeElB: "https://www.youtube.com/user/elboficial",
  github: "https://github.com/imrulo",
} as const;

/** Foto pública del dúo — Wikimedia Commons (dominio público), URL remota fiable. */
export const DUO_HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Aldo_y_El_B.JPG";

export const DUO_HERO_ATTRIBUTION =
  "Foto: Wikimedia Commons · Aldo y El B (dominio público)";

export const DUO_ERA = { start: 2003, end: 2014 } as const;

export function isDuoEraYear(year: number) {
  return year >= DUO_ERA.start && year <= DUO_ERA.end;
}
