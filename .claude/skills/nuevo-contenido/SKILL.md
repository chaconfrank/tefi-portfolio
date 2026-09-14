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

Pregunta sólo lo que falte. Un **proyecto** es un case study, así que hacen falta:
título, descripción de una línea (con el resultado, no la categoría), tipo
(`Startup` / `Freelance` / `Proyecto propio`), rol concreto, periodo, herramientas,
hasta 3 métricas, el aprendizaje clave en una frase y el orden en el listado.
Opcionales: equipo, repo, demo, portada.

Si no hay métricas duras, usa cualitativas (`12 entrevistas`, `0 → 1`): la tira de
impacto vacía se nota más que una métrica modesta.

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
tipo: Startup            # Startup | Freelance | Proyecto propio
rol: 
periodo: '2026 · 8 semanas'
equipo: 'Con 1 PM y 3 ingenieros'   # opcional
herramientas: ['Figma', 'FigJam']
metricas:                # máximo 3
  - valor: '38% → 61%'
    etiqueta: 'Activación a 7 días'
aprendizaje: 'Una sola frase.'
orden: 4                 # menor = más arriba en el listado
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

Un proyecto lleva **siempre estas cuatro secciones `##`, en este orden** — es lo que
hace comparables los case studies entre sí:

1. `## Contexto y problema` — 3 bullets de situación y la pregunta real en negrita.
2. `## Proceso` — lista numerada de pasos de research/diseño/validación.
3. `## Mi rol` — bullets en primera persona con verbos concretos (definí, moderé, diseñé).
4. `## Resultado e impacto` — bullets con números, incluyendo lo que **no** funcionó.

El aprendizaje clave **no va en el cuerpo**: va en el frontmatter y lo pinta el layout
al final. Si no cabe en una frase, no es el aprendizaje clave.

## Paso 4: Imagen de portada (si la hay)

Guarda el archivo en `src/content/proyectos/` junto al `.md` (o en `src/assets/`), **nunca en `public/`**: ahí no se optimiza. Referencia la ruta relativa en `portada` y rellena siempre `portadaAlt`.

## Paso 5: Verificar

```bash
nvm use && npm run build
```

El build valida el frontmatter contra el schema Zod. Si falta un campo obligatorio o una fecha no parsea, falla ahí y dice cuál es.

Comprueba que la entrada aparece donde toca:
- Un post → `/blog/` y el feed `/rss.xml` (el blog está fuera de la navegación).
- Un proyecto → `/proyectos/` y la home (salen todos, ordenados por `orden`).
- Con `borrador: true` **no debe aparecer en ningún sitio**. Si aparece, el listado correspondiente ha olvidado filtrar el flag: arréglalo ahí (ver `.claude/conventions/content.md`).
