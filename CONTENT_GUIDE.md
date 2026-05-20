# Guía de contenido — Los Aldeanos Archivo

## Estructura

```
content/
  es/
    timeline.json    # Eventos cronológicos
    albums.json      # Discografía
    lyrics.json      # Índice de letras
    bios.json        # Biografías Al2 y El B
    mdx/
      legado.mdx     # Texto largo legado
  en/
    (mismos archivos en inglés)
```

## Añadir un álbum

Edita `content/es/albums.json` y `content/en/albums.json`:

```json
{
  "slug": "nuevo-album",
  "title": "Título",
  "artist": "los-aldeanos",
  "year": 2011,
  "coverColor": "#1a0a0a",
  "description": "Descripción breve.",
  "tracks": ["Track 1", "Track 2"],
  "spotify": "https://open.spotify.com/...",
  "youtube": "https://www.youtube.com/...",
  "apple": "https://music.apple.com/..."
}
```

`artist`: `los-aldeanos` | `al2` | `el-b`

## Añadir evento al timeline

```json
{
  "year": 2011,
  "title": "Título del hito",
  "description": "Descripción corta.",
  "longDescription": "Texto expandido para el panel interactivo.",
  "highlight": false,
  "artist": "los-aldeanos",
  "coverColor": "#1a0a0a",
  "youtubeId": ""
}
```

`artist`: `los-aldeanos` | `al2` | `el-b` | `all`

## Frases flip (quotes.json)

```json
{
  "id": "mi-frase",
  "lyric": "Texto de la frase...",
  "context": "Contexto didáctico al voltear la tarjeta.",
  "theme": "libertad"
}
```

## Galería (gallery.json)

```json
{
  "id": "7",
  "caption": "Pie de foto",
  "color": "#1a0508",
  "aspect": "tall"
}
```

## Añadir letra

1. Entrada en `lyrics.json` (ambos idiomas).
2. Cuerpo extendido en `src/app/[locale]/letras/[slug]/page.tsx` → objeto `lyricBodies`, o migrar a archivo MDX dedicado.

## MDX legado

Edita `content/{locale}/mdx/legado.mdx` con secciones `## Título`.

## Moderación de testimonios

Las historias enviadas vía `/api/stories` se registran en consola (dev). Para producción: conectar Vercel KV, D1 o Sanity y listar en `legado/page.tsx`.
