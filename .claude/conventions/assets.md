# Imágenes y fuentes

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## `src/assets/` vs `public/`

| Carpeta | Para qué | Qué le pasa |
| --- | --- | --- |
| `src/assets/` | Imágenes del sitio y de los proyectos | Astro las optimiza: WebP/AVIF, `srcset`, dimensiones inferidas |
| `public/` | Favicon, `robots.txt`, el PDF del CV | Se copian tal cual, **nunca se optimizan** |

Una imagen en `public/` referenciada desde `<Image>` no da error: simplemente no se optimiza. Si una portada se ve pesada, lo primero que hay que mirar es en qué carpeta está.

## Uso de `<Image />`

`alt` es **obligatorio**; si la imagen es decorativa, `alt=""` para que los lectores de pantalla la ignoren. `<Image>` fija `width`/`height` para evitar saltos de layout (CLS). Para servir varios formatos, `<Picture formats={['avif','webp']} />`.

En el schema de `proyectos`, `portada` usa el helper `image()`, que valida la ruta en build y devuelve el objeto con metadatos que espera `<Image>`.

## Responsive: una estrategia, no dos

Este proyecto usa **la estrategia Tailwind**: clases de utilidad en el `<img>` resultante (`aspect-video w-full object-cover`) y `widths`/`sizes` manuales cuando hacen falta.

**Nunca actives `image.responsiveStyles: true`.** Tailwind v4 emite sus reglas dentro de cascade layers, que por definición pierden contra las reglas sin capa que inyecta Astro. El resultado sería que tus clases dejan de aplicarse sobre las imágenes y no es obvio por qué.

La alternativa (prop `layout` de Astro + `responsiveStyles: true`) es válida, pero implica renunciar a estilar imágenes con Tailwind. No mezcles las dos.

## Fuentes

Se declaran en `astro.config.mjs` con la API integrada de Astro, **no con `<link>` a Google Fonts ni `@font-face` a mano**:

```js
fonts: [{ provider: fontProviders.google(), name: 'Inter', cssVariable: '--font-inter' }]
```

Luego se monta con `<Font cssVariable="--font-inter" />` en el `<head>` y se conecta a Tailwind con un bloque aparte del `@theme` normal:

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

Dos detalles que muerden: Astro descarga **sólo el peso 400** salvo que declares `weights` (para una variable font, `weights: ["100 900"]`), y genera fallbacks con métricas ajustadas a partir de la última familia genérica que listes, para que no haya salto de layout mientras carga.
