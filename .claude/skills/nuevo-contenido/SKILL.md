---
name: nuevo-contenido
description: >
  Esta skill debe usarse cuando el usuario pida "añadir un proyecto",
  "nuevo proyecto al portfolio", "escribir un post", "nuevo post",
  "publicar una entrada", "añadir contenido", o quiera crear una entrada
  nueva en las colecciones de proyectos o blog de este portfolio.
---

# Añadir contenido al portfolio

Crear una entrada nueva en `proyectos` o `blog` cumpliendo el schema a la primera, sin romper el build.

## Paso 1: Determinar colección y datos

Pregunta sólo lo que falte. Para un **proyecto** hacen falta: título, descripción de una línea, stack, fecha, y si va destacado en la home. Opcionales: repo, demo, portada.

Para un **post**: título, descripción, tags.

Si el usuario no tiene todo, crea la entrada con `borrador: true` y los campos que falten marcados con `TODO`. Nunca inventes un enlace de repo o de demo.

## Paso 2: Crear el archivo

Ruta y nombre — el nombre del archivo **es** la URL:

| Colección | Ruta | Ejemplo |
| --- | --- | --- |
| `proyectos` | `src/content/proyectos/<slug>.md` | `panel-analitica.md` → `/proyectos/panel-analitica/` |
| `blog` | `src/content/blog/<slug>.md` | `primer-post.md` → `/blog/primer-post/` |

Slug en minúsculas, sin acentos, separado por guiones.

Frontmatter de proyecto (campos en **español**):

```yaml
---
titulo: 
descripcion: 
stack: ['Astro', 'TypeScript']
fecha: 2026-01-15
destacado: false
borrador: false
# repo: 'https://github.com/...'
# demo: 'https://...'
# portada: './portada.jpg'
# portadaAlt: 'descripción de la imagen'
---
```

Frontmatter de post (campos en **inglés**, es la excepción del proyecto):

```yaml
---
title: 
description: 
pubDate: 2026-01-15
tags: []
borrador: false
---
```

## Paso 3: Cuerpo

Markdown normal. Empieza por `##`, nunca por `#`: el `<h1>` lo pone el layout a partir del título del frontmatter, y duplicarlo rompe la jerarquía de encabezados.

Para un proyecto, la estructura que siguen los existentes es: contexto o problema → decisiones tomadas → resultado con números si los hay.

## Paso 4: Imagen de portada (si la hay)

Guarda el archivo en `src/content/proyectos/` junto al `.md` (o en `src/assets/`), **nunca en `public/`**: ahí no se optimiza. Referencia la ruta relativa en `portada` y rellena siempre `portadaAlt`.

## Paso 5: Verificar

```bash
nvm use && npm run build
```

El build valida el frontmatter contra el schema Zod. Si falta un campo obligatorio o una fecha no parsea, falla ahí y dice cuál es.

Comprueba que la entrada aparece donde toca:
- Un post → `/blog` y el feed `/rss.xml`.
- Un proyecto → `/proyectos`, y la home si `destacado: true`.
- Con `borrador: true` **no debe aparecer en ningún sitio**. Si aparece, el listado correspondiente ha olvidado filtrar el flag: arréglalo ahí (ver `.claude/conventions/content.md`).
