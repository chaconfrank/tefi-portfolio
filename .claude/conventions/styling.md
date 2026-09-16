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
  --color-accent-soft: …;    /* teal claro: fondos de hover e interacción */
  --color-metric: …;         /* naranja de las cifras (sólo texto grande) e iconos de metodología */
  --color-metric-soft: …;    /* su fondo suave (cajas de los iconos) */
  --color-highlight: …;      /* amarillo del sello de disponibilidad */
  --color-highlight-ink: …;  /* lo que va escrito encima del amarillo */
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
`Header`**: el efecto depende de que se vea el halo teal por detrás.

## Jerarquía de llamadas a la acción

Tres niveles, y **sólo un primario por pantalla**:

| Nivel | Estilo |
| --- | --- |
| Primario | `rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper` |
| Secundario | `glass rounded-full px-5 py-2.5 text-sm font-medium hover:bg-accent-soft` |
| Enlace de acción | texto `text-accent font-medium`, subrayado al hover |
| Terciario | enlace de texto `text-ink-soft`, subrayado al hover |

El primario es **negro y redondo** (`bg-ink`/`text-paper`, así el oscuro sale
solo). Cada color tiene un papel fijo: el **teal `--color-accent`** es el de
los enlaces — los de acción («Ver case study →», «Ver todos →») y los de dentro
del texto — además de iconos y badges; el **naranja `--color-metric`** es sólo
para las cifras grandes de métricas y trayectoria; el amarillo
`--color-highlight` es el sello y el punto del badge de disponibilidad (que
lleva un aro `ring-ink/30` porque el amarillo solo, sobre el cristal, da 1,43:1
y desaparece).

**Restricciones medidas, no negociables sin re-medir:**
- El amarillo `#ffd269` como color de TEXTO sobre el papel da **1,43:1** —
  desaparece. Como fondo lleva `--color-highlight-ink` encima (10,3:1).
- El naranja `--color-metric` da **3,7:1** sobre el papel: pasa AA sólo como
  texto grande y grueso, que es como lo usan `MetricStrip` y las tarjetas. No
  lo uses en texto de cuerpo.

El secundario sigue siendo `glass` para no romper la familia con la nav y el
toggle; su hover se tiñe de teal (`bg-accent-soft`) para que el feedback use el
color de marca y funcione en los dos temas sin variantes `dark:`.

## Animación de entrada (`.reveal`)

Las tarjetas y las tiras de métricas llevan la clase `reveal`: fundido +
deslizamiento al entrar en el viewport. Es **CSS puro con scroll-driven
animations** (`animation-timeline: view()`), sin JavaScript, envuelto en
`@supports`: donde el navegador no lo soporta el bloque entero se ignora y el
contenido se pinta normal. Por eso NO hay que replicar este patrón con
IntersectionObserver + `opacity: 0` inicial — ese enfoque deja contenido
invisible si el JS falla, que es justo lo que este evita. Respeta
`prefers-reduced-motion` de serie.

Los tres niveles están aplicados en todo el sitio: `Hero`, `ContactCTA`, `404` y
`/contacto`. Si añades una pantalla nueva, cuenta los primarios antes de
publicarla.

## `glass` y `glass-strong`

`glass-strong` es el mismo cristal con el fondo al 75 % en vez del 40 %. Es para
elementos pequeños que van sobre el halo —el badge de disponibilidad del hero—:
con el 40 % un texto de 12 px se funde con el fondo y deja de leerse. Para
superficies grandes sigue usándose `glass`.

## El sello de disponibilidad

`AvailabilityBadge` es el disco amarillo giratorio del cierre de página y de
`/contacto`. Dos cosas que muerden:

1. **Su texto no usa `text-ink`, usa `--color-highlight-ink`**, que es un token
   que *no se redefine en oscuro*. El disco sigue siendo amarillo claro en los
   dos modos, así que si el texto se invierte con el tema se vuelve ilegible.
   Lo mismo vale para cualquier cosa que pongas encima del amarillo.
2. **El giro necesita `transform-box: view-box`** en el grupo que rota (está en
   el `<style>` del componente). Sin eso el origen de la rotación es el (0,0) del
   `viewBox` y el texto sale orbitando fuera del disco, no girando sobre él.

La animación se declara como `--animate-seal-spin` dentro de `@theme`, con sus
`@keyframes` anidados —que es como se declaran animaciones propias en Tailwind
v4—, y el componente la respeta con `motion-reduce:animate-none`.

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
