# Estilos

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Tailwind v4, sin `tailwind.config.js`

La configuración vive en `src/styles/global.css`. Los design tokens están en el bloque `@theme`:

```css
@theme {
  --color-ink: …;        /* texto principal */
  --color-ink-soft: …;   /* texto secundario */
  --color-paper: …;      /* fondo */
  --color-paper-soft: …; /* fondo elevado */
  --color-accent: …;     /* enlaces, CTA */
  --color-line: …;       /* bordes */
}
```

Las utilidades se derivan solas: `--color-ink` da `text-ink`, `bg-ink`, `border-ink`. **Para cambiar la paleta se tocan los tokens, no los componentes.** Si necesitas un color que no existe como token, añade el token; no metas un valor arbitrario tipo `text-[#1a1a1a]`.

## Dark mode por clase

Por clase, no por media query: `@custom-variant dark` en el CSS, la clase `dark` en `<html>`, y el `<script is:inline>` de `BaseHead` que la aplica leyendo `localStorage` antes del primer pintado. Los tokens se redefinen bajo `.dark`, así que **un componente escrito con tokens ya funciona en oscuro sin variantes `dark:`**.

Usa `dark:` sólo para lo que no es color de token (mostrar/ocultar los iconos del toggle, por ejemplo).

## La utilidad `glass`

La nav, el toggle, el badge de disponibilidad y los botones secundarios comparten
el mismo cristal, definido una sola vez en `global.css` con `@utility glass`:
fondo a media opacidad, `backdrop-blur` + `backdrop-saturate`, borde claro y un
brillo interior arriba. La variante oscura se ajusta con `.dark .glass`.

Úsala siempre en lugar de repetir `bg-paper/40 backdrop-blur-xl border-white/50…`:
si el cristal cambia, cambia en un sitio. Y **no le pongas fondo sólido al
`Header`**: el efecto depende de que se vea el halo morado por detrás.

## `@apply` dentro de un componente

Un `<style>` de componente que use `@apply` necesita esto como **primera línea del bloque**:

```css
@reference "../styles/global.css";
```

En Tailwind v4 los estilos de componente están aislados y sin esa directiva el build falla con `Cannot apply unknown utility class`. Ya está en `ProjectLayout` y `PostLayout`.

## Cascada en Astro

Un `<style>` de componente es **scoped automáticamente**: puedes usar selectores tan genéricos como `h1 {}` sin miedo a filtraciones.

Por eso el Markdown renderizado necesita `:global()`: el HTML que produce `<Content />` no lleva el atributo de scope del layout, así que `.prose-portfolio h2 {}` no le aplicaría y `.prose-portfolio :global(h2) {}` sí.

Orden de evaluación: **`<link>` en el head < estilos importados < estilos scoped**. Los scoped ganan a igualdad de especificidad, siempre. De ahí que `global.css` se importe lo primero en `BaseHead`, para quedar con la precedencia más baja.

Cuidado: importar un componente aplica el CSS que ese componente importa, **aunque nunca lo renderices**.
