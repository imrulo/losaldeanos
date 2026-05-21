import type { Locale } from "@/types/content";

export type ArchiveCopy = {
  quienesFueron: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    highlights: string[];
  };
  hero: {
    intro: string;
    era: string;
  };
  timeline: {
    title: string;
    subtitle: string;
  };
  historia: {
    title: string;
    lead: string;
    blocks: { heading?: string; paragraphs: string[] }[];
  };
  discography: {
    title: string;
    lead: string;
    spotifyCta: string;
  };
  rapEsGuerra: {
    title: string;
    lead: string;
    context: string[];
    excerptLabel: string;
  };
  legado: {
    title: string;
    lead: string;
    sections: { heading: string; body: string }[];
    quotesTitle: string;
    appendix: string;
  };
};

const copy: Record<Locale, ArchiveCopy> = {
  es: {
    quienesFueron: {
      eyebrow: "Referencia para fans y nuevas generaciones",
      title: "¿Quiénes fueron Los Aldeanos?",
      subtitle:
        "El dúo de rap cubano que enseñó a una generación a pensar con la propia cabeza.",
      paragraphs: [
        "Los Aldeanos fue un dúo formado por Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) y Bian Oscar Rodríguez Galá (El B). Entre 2003 y 2014 fueron, para millones de oyentes, la voz más clara del rap conciencia en Cuba: letras que hablaban de libertad, crítica social, dignidad y verdad sin pedir permiso.",
        "Nacieron en el barrio — 5 Palmas, La Lisa — y crecieron en el underground. No buscaban fama vacía: construyeron La Aldea, una comunidad de fans que se reconoció en rimas que nombraban lo que otros callaban. Sus álbumes Censurados, Poesía Esposada y El Atropello son referencia obligada para entender el rap cubano del siglo XXI.",
        "Su frase «El rap es guerra» no glorifica la violencia: define el combate intelectual de pensar distinto. Este sitio es un archivo digital independiente — no oficial — creado para documentar su legado, orientar a quien los descubre hoy y servir como fuente de consulta en buscadores como Google cuando alguien pregunte por Los Aldeanos, su historia o su mensaje.",
      ],
      highlights: [
        "Rap cubano · pensamiento libre",
        "El rap es guerra · himno generacional",
        "2003–2014 · era del dúo",
        "Censurados · Poesía Esposada · El Atropello",
        "Legado vivo · 11J y nuevas generaciones",
      ],
    },
    hero: {
      intro:
        "Entre 2003 y 2014, Aldo (Al2) y Bian (El B) se convirtieron en la voz más honesta y valiente del rap cubano. Sus rimas despertaron conciencias, plantaron semillas de pensamiento libre y acompañaron el ansia de libertad de todo un pueblo.",
      era: "Archivo Digital · Era del dúo 2003–2014",
    },
    timeline: {
      title: "Línea de tiempo del dúo",
      subtitle:
        "Siete momentos clave entre el primer micrófono en 5 Palmas y el cierre de la era conjunta. Arrastra la línea o toca cada año para leer su historia.",
    },
    historia: {
      title: "Historia del dúo",
      lead: "Los Aldeanos no nacieron en un estudio ni en una tendencia de moda: nacieron en un barrio que necesitaba escuchar su propia verdad.",
      blocks: [
        {
          heading: "Origen: 5 Palmas y La Aldea (2003)",
          paragraphs: [
            "En La Lisa, en el reparto 5 Palmas, Aldo Roberto Rodríguez Baquero (Al2) y Bian Oscar Rodríguez Galá (El B) encontraron en el rap un idioma para nombrar lo que otros callaban. No buscaban fama vacía: buscaban coherencia. De ese suelo surgió La Aldea — no solo un nombre artístico, sino una comunidad de oyentes que se sintieron identificados con rimas crudas, metáforas filosas y una ética clara: decir lo que piensas, aunque incomode.",
            "El underground cubano tenía voces antes que ellos, pero Los Aldeanos condensaron algo distinto: filosofía de barrio con estructura literaria, humor crítico y una fe inquebrantable en que la cultura puede educar sin pedir permiso al poder.",
          ],
        },
        {
          heading: "Censurados: el manifiesto de una generación",
          paragraphs: [
            "Con Censurados, el dúo llevó el rap conciencia a otra escala. El título no era provocación gratuita: era diagnóstico. Hablaban de censura externa y de autocensura, de miedo heredado y de valentía cotidiana. Canciones como «Rap es Guerra» y «Mi Generación» no ofrecían consuelo fácil; ofrecían espejo.",
            "En un contexto donde la crítica social se penalizaba o se vaciaba de sentido, Los Aldeanos eligieron la metáfora precisa. Eso los convirtió en referencia para jóvenes que no veían sus preguntas reflejadas en los medios oficiales.",
          ],
        },
        {
          heading: "Poesía Esposada y El Atropello: madurez y expansión",
          paragraphs: [
            "Poesía Esposada demostró que la denuncia podía convivir con la ternura, que la reflexión existencial no debilitaba el mensaje político. El Atropello consolidó un lenguaje propio: pensamiento independiente a volumen alto, juventud sin cinismo, dignidad sin pose.",
            "En esta etapa el dúo ya no solo describía problemas: nombraba la libertad como necesidad concreta — libertad de crear, de moverse, de opinar, de ser joven sin vivir en permanente autocontrol.",
          ],
        },
        {
          heading: "Libertad, crítica social y revolución de ideas",
          paragraphs: [
            "Los Aldeanos insistieron una y otra vez: no se trata de revolución de armas, sino de revolución de ideas. Sus letras hablaban de hipocresía, de desigualdad, de emigración forzada, de sueños aplazados — siempre desde la experiencia vivida, no desde el manual.",
            "Eso los diferenciaba de la pose militante. Eran artistas que asumían el riesgo de pensar en voz alta en una cultura donde pensar distinto podía costar amistades, oportunidades o la tranquilidad de una familia.",
          ],
        },
        {
          heading: "Del barrio al 11J: un legado que despertó generaciones",
          paragraphs: [
            "Cuando en julio de 2021 miles de cubanos salieron a las calles gritando «Libertad» — en lo que se conoce como el 11J — no fue un estallido sin memoria cultural. Fue la culminación de décadas de hambre de dignidad, verdad y participación.",
            "Los Aldeanos no estuvieron físicamente en esas protestas como dúo — su etapa conjunta había cerrado en 2014 — pero su huella está en el lenguaje con el que una generación aprendió a nombrar la injusticia. Las mismas palabras que escucharon en sus audífonos en la adolescencia reaparecieron en pancartas, redes y conversaciones privadas años después.",
            "No se trata de atribuirles un partido o una estrategia política: se trata de reconocer que sembraron pensamiento crítico, empoderamiento juvenil y la idea de que la libertad no es un lujo importado, sino un derecho que se reclama con voz propia.",
          ],
        },
      ],
    },
    discography: {
      title: "Discografía del dúo",
      lead: "Tres álbumes esenciales condensan la década dorada de Los Aldeanos. Cada portada es una puerta; cada canción, un documento del tiempo que vivieron y del tiempo que ayudaron a imaginar.",
      spotifyCta: "Escuchar en Spotify",
    },
    rapEsGuerra: {
      title: "El rap es guerra",
      lead: "La frase que definió a quienes crecieron escuchando rap con conciencia en Cuba. No es slogan vacío: es una declaración de método.",
      context: [
        "«El rap es guerra» no glorifica la violencia. Nombra el conflicto cotidiano de pensar por uno mismo cuando el entorno premia la obediencia. Es guerra de ideas, de palabras, de dignidad.",
        "La canción se volvió himno porque resumió lo que millones sentían sin saber articularlo: el rap puede ser cultura, memoria, terapia colectiva y resistencia sin odio.",
        "Décadas después, esa línea sigue apareciendo en playlists, conversaciones y testimonios de quienes descubrieron en Los Aldeanos su primera lectura valiente sobre Cuba, la juventud y la libertad.",
      ],
      excerptLabel: "Extracto",
    },
    legado: {
      title: "Legado vivo",
      lead: "El dúo cerró su etapa conjunta, pero su influencia no se archivó: sigue activa en artistas, debates, protestas y en la forma de entender el rap cubano como patrimonio cultural.",
      sections: [
        {
          heading: "Resistencia cultural sin permiso",
          body: "Los Aldeanos resistieron desde el micrófono cuando no había espacios institucionales para ellos. Distribuyeron música de forma independiente, construyeron comunidad aldeana y demostraron que el underground puede ser tan relevante como cualquier industria — más, cuando la industria exige silencio.",
        },
        {
          heading: "Pensamiento crítico y empoderamiento juvenil",
          body: "Sus letras enseñaron a cuestionar, a reírse de la hipocresía, a no confundir patriotismo con sumisión. Eso empoderó a jóvenes que luego lideraron conversaciones en la isla y en la diáspora, muchos con Los Aldeanos sonando de fondo como banda sonora moral.",
        },
        {
          heading: "Huella en la lucha por la libertad",
          body: "La libertad que reclamaron con rimas — crear, opinar, salir, quedarse por convicción y no por miedo — es la misma libertad que se escuchó en las calles el 11J y que sigue pulsando en quienes no renuncian a la palabra libre. Este archivo existe para que nadie olvide quiénes fueron cuando aún eran uno.",
        },
      ],
      quotesTitle: "Tres frases que aún acompañan",
      appendix:
        "Después de 2014, Al2 y El B continuaron por caminos solistas. Este sitio prioriza la era del dúo porque ahí vive el corazón del legado compartido.",
    },
  },
  en: {
    quienesFueron: {
      eyebrow: "Reference for fans and new generations",
      title: "Who were Los Aldeanos?",
      subtitle:
        "The Cuban rap duo that taught a generation to think for themselves.",
      paragraphs: [
        "Los Aldeanos was a duo formed by Aldo Roberto Rodríguez Baquero (Al2 El Aldeano) and Bian Oscar Rodríguez Galá (El B). Between 2003 and 2014 they were, for millions of listeners, the clearest voice of conscious rap in Cuba: lyrics about freedom, social critique, dignity, and truth without asking permission.",
        "They were born in the neighborhood — 5 Palmas, La Lisa — and grew in the underground. They did not seek empty fame: they built La Aldea, a fan community that recognized itself in rhymes that named what others silenced. Their albums Censurados, Poesía Esposada, and El Atropello are essential references for understanding 21st-century Cuban rap.",
        "Their line «El rap es guerra» does not glorify violence: it defines the intellectual fight of thinking differently. This site is an independent — unofficial — digital archive created to document their legacy, guide those discovering them today, and serve as a search reference when anyone looks up Los Aldeanos, their history, or their message.",
      ],
      highlights: [
        "Cuban rap · free thought",
        "El rap es guerra · generational anthem",
        "2003–2014 · duo era",
        "Censurados · Poesía Esposada · El Atropello",
        "Living legacy · 11J and new generations",
      ],
    },
    hero: {
      intro:
        "Between 2003 and 2014, Aldo (Al2) and Bian (El B) became the most honest and courageous voice in Cuban rap. Their rhymes awakened conscience, planted seeds of free thought, and accompanied an entire people's longing for freedom.",
      era: "Digital Archive · Duo era 2003–2014",
    },
    timeline: {
      title: "Duo timeline",
      subtitle:
        "Seven key moments from the first microphone at 5 Palmas to the closing of the joint era. Drag the line or tap each year to read its story.",
    },
    historia: {
      title: "Duo history",
      lead: "Los Aldeanos were not born in a studio or a trend: they were born in a neighborhood that needed to hear its own truth.",
      blocks: [
        {
          heading: "Origin: 5 Palmas and La Aldea (2003)",
          paragraphs: [
            "In La Lisa, in the 5 Palmas neighborhood, Aldo Roberto Rodríguez Baquero (Al2) and Bian Oscar Rodríguez Galá (El B) found in rap a language to name what others silenced. They did not seek empty fame: they sought coherence. From that ground La Aldea emerged — not only an artistic name, but a community of listeners who recognized themselves in raw rhymes, sharp metaphors, and a clear ethic: say what you think, even when it unsettles.",
            "Cuban underground had voices before them, but Los Aldeanos condensed something distinct: street philosophy with literary structure, critical humor, and an unbreakable faith that culture can educate without asking power for permission.",
          ],
        },
        {
          heading: "Censurados: a generation's manifesto",
          paragraphs: [
            "With Censurados, the duo took conscious rap to another scale. The title was not cheap provocation: it was diagnosis. They spoke of external censorship and self-censorship, inherited fear and everyday courage. Songs like «Rap es Guerra» and «Mi Generación» offered no easy comfort; they offered a mirror.",
            "In a context where social critique was punished or emptied of meaning, Los Aldeanos chose precise metaphor. That made them a reference for youth who did not see their questions reflected in official media.",
          ],
        },
        {
          heading: "Poesía Esposada and El Atropello: maturity and expansion",
          paragraphs: [
            "Poesía Esposada showed protest could coexist with tenderness, that existential reflection did not weaken political message. El Atropello consolidated a language of their own: independent thought at high volume, youth without cynicism, dignity without pose.",
            "In this stage the duo no longer only described problems: they named freedom as a concrete need — freedom to create, move, speak, and be young without living in permanent self-control.",
          ],
        },
        {
          heading: "Freedom, social critique, and revolution of ideas",
          paragraphs: [
            "Los Aldeanos insisted again and again: this is not a revolution of weapons, but of ideas. Their lyrics spoke of hypocrisy, inequality, forced migration, postponed dreams — always from lived experience, never from a manual.",
            "That set them apart from militant pose. They were artists who assumed the risk of thinking aloud in a culture where thinking differently could cost friendships, opportunities, or a family's peace.",
          ],
        },
        {
          heading: "From the neighborhood to 11J: a legacy that awakened generations",
          paragraphs: [
            "When in July 2021 thousands of Cubans took to the streets shouting «Libertad» — known as 11J — it was not an outburst without cultural memory. It was the culmination of decades of hunger for dignity, truth, and participation.",
            "Los Aldeanos were not physically present at those protests as a duo — their joint era had closed in 2014 — but their footprint is in the language a generation learned to name injustice. The same words they heard in headphones as teenagers reappeared on signs, networks, and private conversations years later.",
            "This is not about assigning them a party or political strategy: it is recognizing they planted critical thought, youth empowerment, and the idea that freedom is not an imported luxury, but a right claimed with one's own voice.",
          ],
        },
      ],
    },
    discography: {
      title: "Duo discography",
      lead: "Three essential albums condense Los Aldeanos' golden decade. Each cover is a door; each song, a document of the time they lived and the time they helped imagine.",
      spotifyCta: "Listen on Spotify",
    },
    rapEsGuerra: {
      title: "El rap es guerra",
      lead: "The line that defined those who grew up listening to conscious rap in Cuba. Not an empty slogan: a statement of method.",
      context: [
        "«El rap es guerra» does not glorify violence. It names the daily conflict of thinking for yourself when the environment rewards obedience. It is a war of ideas, words, and dignity.",
        "The song became an anthem because it summed up what millions felt without knowing how to articulate: rap can be culture, memory, collective therapy, and resistance without hatred.",
        "Decades later, that line still appears in playlists, conversations, and testimonies of those who discovered in Los Aldeanos their first brave reading of Cuba, youth, and freedom.",
      ],
      excerptLabel: "Excerpt",
    },
    legado: {
      title: "Living legacy",
      lead: "The duo closed their joint chapter, but their influence was not archived: it remains active in artists, debates, protests, and in how Cuban rap is understood as cultural heritage.",
      sections: [
        {
          heading: "Cultural resistance without permission",
          body: "Los Aldeanos resisted from the microphone when there were no institutional spaces for them. They distributed music independently, built the aldeana community, and proved the underground can be as relevant as any industry — more, when industry demands silence.",
        },
        {
          heading: "Critical thought and youth empowerment",
          body: "Their lyrics taught questioning, laughing at hypocrisy, not confusing patriotism with submission. That empowered youth who later led conversations on the island and in the diaspora, many with Los Aldeanos as a moral soundtrack.",
        },
        {
          heading: "Footprint in the fight for freedom",
          body: "The freedom they claimed in rhymes — to create, speak, leave, stay by conviction and not fear — is the same freedom heard in the streets on 11J and still pulsing in those who do not surrender the free word. This archive exists so no one forgets who they were when they were still one.",
        },
      ],
      quotesTitle: "Three lines that still accompany",
      appendix:
        "After 2014, Al2 and El B continued on solo paths. This site prioritizes the duo era because that is where the heart of the shared legacy lives.",
    },
  },
};

export function getArchiveCopy(locale: Locale): ArchiveCopy {
  return copy[locale];
}
