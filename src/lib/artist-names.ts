/** Nombres oficiales del dúo — lenguaje aldeano consistente en todo el sitio. */
export const ARTIST_NAMES = {
  al2: {
    stage: "Al2",
    stageLong: "Al2 El Aldeano",
    given: "Aldo",
    full: "Aldo Roberto Rodríguez Baquero",
  },
  elB: {
    stage: "El B",
    given: "Bian",
    full: "Bian Oscar Rodríguez Galá",
  },
  duo: "Los Aldeanos",
} as const;

export function duoIntroEs() {
  return `Entre 2003 y 2014, ${ARTIST_NAMES.al2.given} (${ARTIST_NAMES.al2.stage}) y ${ARTIST_NAMES.elB.given} (${ARTIST_NAMES.elB.stage}) se convirtieron en la voz más honesta y valiente del rap cubano. Sus rimas despertaron conciencias, plantaron semillas de pensamiento libre y acompañaron el ansia de libertad de todo un pueblo.`;
}

export function duoIntroEn() {
  return `Between 2003 and 2014, ${ARTIST_NAMES.al2.given} (${ARTIST_NAMES.al2.stage}) and ${ARTIST_NAMES.elB.given} (${ARTIST_NAMES.elB.stage}) became the most honest and courageous voice in Cuban rap. Their rhymes awakened conscience, planted seeds of free thought, and accompanied an entire people's longing for freedom.`;
}
