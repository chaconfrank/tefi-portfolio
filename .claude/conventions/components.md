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

Si el componente puede aparecer **varias veces en la misma página**, envuélvelo en un custom element y usa `this.querySelector()` dentro de `connectedCallback()`. Con `document.querySelector()` sólo funcionaría la primera instancia, y el script sólo se ejecuta una vez aunque el componente se repita.

## Si algún día se añade `<ClientRouter />`

Las view transitions rompen estos scripts al navegar: los bundled se ejecutan una sola vez en toda la visita, y los inline pueden reejecutarse de forma impredecible. Habría que colgar el menú de `astro:page-load` y el tema de `astro:after-swap` (si no, se ve el flash claro en cada navegación). No lo añadas sin hacer ese cambio a la vez.
