/** Enlaces oficiales y prioritarios — el dúo es el corazón del archivo. */
export const OFFICIAL_LINKS = {
  spotifyDuo: "https://open.spotify.com/artist/4Y6VI2Mfdhvb1RImggzOiY",
  spotifyEmbed: "https://open.spotify.com/embed/artist/4Y6VI2Mfdhvb1RImggzOiY?utm_source=generator",
  youtubeDuo: "https://www.youtube.com/@LosAldeanosOficial",
  youtubeDuoEmbed:
    "https://www.youtube.com/embed?listType=search&list=Los+Aldeanos+duo+official",
  youtubeAl2: "https://www.youtube.com/c/al2elaldeano",
  youtubeElB: "https://www.youtube.com/results?search_query=El+B+Los+Aldeanos",
  github: "https://github.com/imrulo",
} as const;

export const DUO_ERA = { start: 2003, end: 2014 } as const;

export function isDuoEraYear(year: number) {
  return year >= DUO_ERA.start && year <= DUO_ERA.end;
}
