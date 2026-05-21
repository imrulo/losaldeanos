import { OFFICIAL_LINKS } from "@/lib/official-links";

export type FeaturedVideo = {
  id: string;
  titleEs: string;
  titleEn: string;
  /** URL de embed (video ID o búsqueda). */
  embed: string;
  link: string;
  primary: boolean;
};

export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: "rap-es-guerra",
    titleEs: "El rap es guerra — himno del dúo",
    titleEn: "El rap es guerra — duo anthem",
    embed:
      "https://www.youtube.com/embed?listType=search&list=Los+Aldeanos+El+rap+es+guerra",
    link: "https://www.youtube.com/results?search_query=Los+Aldeanos+El+rap+es+guerra",
    primary: true,
  },
  {
    id: "duo-selection",
    titleEs: "Los Aldeanos — selección del dúo",
    titleEn: "Los Aldeanos — duo selection",
    embed:
      "https://www.youtube.com/embed?listType=search&list=Los+Aldeanos+duo+official",
    link: OFFICIAL_LINKS.youtubeDuo,
    primary: true,
  },
  {
    id: "al2",
    titleEs: "Al2 — apéndice",
    titleEn: "Al2 — appendix",
    embed:
      "https://www.youtube.com/embed/videoseries?list=UUCYw09b1bNwXBickiw3k5aOw",
    link: OFFICIAL_LINKS.youtubeAl2,
    primary: false,
  },
  {
    id: "elb",
    titleEs: "El B — apéndice",
    titleEn: "El B — appendix",
    embed:
      "https://www.youtube.com/embed?listType=search&list=El+B+Los+Aldeanos+official",
    link: OFFICIAL_LINKS.youtubeElB,
    primary: false,
  },
];
