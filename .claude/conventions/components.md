# Componentes e interactividad

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Dónde va cada cosa

| Tipo | Carpeta | Señal |
| --- | --- | --- |
| Página | `src/pages/` | Define una ruta. **Única carpeta que Astro reserva.** |
| Layout | `src/layouts/` | Aporta el shell o la estructura compartida, tiene `<slot />` |
| Componente | `src/components/` | Trozo reutilizable sin ruta propia |

Un componente que sólo se usa en una página puede vivir en `src/components/` igualmente: no fragmentes la carpeta por uso.

## Interactividad sin framework

Toda la interactividad son `<script>` en el componente que la necesita. Un `<script>` sin atributos es el caso normal: Astro lo procesa (TypeScript, imports de npm, bundling) y lo **deduplica por página** aunque el componente se repita.

Desde Astro 5 los scripts **no se elevan al `<head>`**: se renderizan donde los escribes.

### Cuándo `is:inline`

Añadir *cualquier* atributo a un `<script>` implica `is:inline` y desactiva todo el procesado. Úsalo sólo en estos casos:

- El script de tema en `BaseHead`: tiene que ejecutarse antes del primer pintado. **Si deja de ser inline o sale del `<head>`, vuelve el flash blanco al cargar.**
- Un `<script>` renderizado condicionalmente (`{cond && <script is:inline>…}`): sin `is:inline` no se comporta como esperas.
- Scripts de `public/` o de un CDN: `<script is:inline src="…">`.

### Pasar datos del servidor al cliente

El frontmatter no llega al navegador. Guarda el valor en un atributo `data-*` y léelo con `dataset`:

```astro
---
const { mensaje } = Astro.props;
---
<mi-widget data-mensaje={mensaje}><button>Ir</button></mi-widget>
```

`ThemeToggle` ya está preparado así: va envuelto en `<theme-toggle>` y define el
custom element con guarda `customElements.get()`. Hoy sólo se pinta una vez por
página, pero con `document.getElementById` y un `id` fijo bastaría con repetirlo en
un sitio para que el segundo dejara de responder.

Es un interruptor deslizante (`role="switch"`): pista de cristal y un pomo en
`--color-highlight` que se desliza a la derecha en oscuro. **La posición la
decide el CSS** con la variante `dark:` sobre el deslizador, no el JavaScript:
el script inline de `BaseHead` aplica la clase `dark` antes del primer pintado,
así que nace en la posición correcta y no salta al cargar. El JS sólo alterna
la clase, guarda la preferencia y sincroniza `aria-checked`.

Si el componente puede aparecer **varias veces en la misma página**, envuélvelo en un custom element y usa `this.querySelector()` dentro de `connectedCallback()`. Con `document.querySelector()` sólo funcionaría la primera instancia, y el script sólo se ejecuta una vez aunque el componente se repita.

## Si algún día se añade `<ClientRouter />`

Las view transitions rompen estos scripts al navegar: los bundled se ejecutan una sola vez en toda la visita, y los inline pueden reejecutarse de forma impredecible. Habría que colgar el menú de `astro:page-load` y el tema de `astro:after-swap` (si no, se ve el flash claro en cada navegación). No lo añadas sin hacer ese cambio a la vez.

## El abanico de proyectos (`ProjectFan`)

Inicio y Proyectos listan los case studies con `ProjectFan`: un **abanico en
bucle** (inspirado en el carrusel de Google Labs). La tarjeta activa va recta
en el centro y las vecinas giradas hacia fuera y más bajas; las flechas, el
deslizamiento con el dedo y ← → lo giran sin final.

- El script sólo pone `data-modo="abanico"` y da a cada tarjeta `--k`
  (posición circular respecto a la activa) y `--ak`. Todo el movimiento sale
  de esas variables en el `<style>` scoped del componente, que gana a las
  utilidades de Tailwind por ir sin capa.
- La tarjeta que pasa de un extremo al otro se recoloca sin transición
  (`data-salto`) y entra con un fundido; más allá de ±2 van ocultas.
- **En móvil (< md) no hay abanico**: las mismas variables con giro y caída a
  cero lo convierten en un carrusel de tarjetas rectas en fila, con la misma
  dinámica (bucle, deslizar y flechas).
- Sin JavaScript es una fila deslizable con scroll-snap.
- La portada de cada tarjeta es `portada` del frontmatter (la composición
  del hero de cada caso).
