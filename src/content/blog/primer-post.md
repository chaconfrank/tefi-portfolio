---
title: Por qué elegí Astro para mi portfolio
description: Cero JavaScript por defecto, contenido en Markdown con tipos y despliegue estático en cualquier sitio.
pubDate: 2025-08-02
tags: ['astro', 'rendimiento']
---

Llevaba años reconstruyendo mi portfolio con el framework de moda. Esta vez
quería algo que pudiera **abandonar durante un año** y seguir funcionando.

## Cero JavaScript por defecto

Un portfolio es, en el fondo, texto e imágenes. Astro renderiza los componentes
a HTML en tiempo de build y no envía runtime al navegador salvo que lo pidas
explícitamente con una isla.

## Contenido con tipos

Las content collections validan el frontmatter con Zod. Si olvido la fecha en
un proyecto, el build falla en vez de publicar una página rota.

```ts
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({ titulo: z.string(), fecha: z.coerce.date() }),
});
```

## Despliegue en cualquier sitio

La salida es HTML estático: Vercel, Netlify, GitHub Pages o un bucket. Sin
servidor que mantener y sin factura sorpresa.
