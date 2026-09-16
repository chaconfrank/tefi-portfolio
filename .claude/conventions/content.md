# Contenido y colecciones

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Las dos colecciones

Definidas en `src/content.config.ts` con el `glob()` loader y validadas con Zod. El schema es la fuente de verdad: si un `.md` no lo cumple, **el build falla**, que es justo lo que queremos.

| Colección | Ruta | Frontmatter |
| --- | --- | --- |
| `proyectos` | `src/content/proyectos/` | `titulo`, `titular?`, `descripcion`, `tipo`, `rol`, `periodo`, `herramientas[]`, `metricas[]`, `aprendizaje`, `orden`, `fecha`, `equipo?`, `portada?`, `repo?`, `demo?`, `destacado`, `borrador` |
| `blog` | `src/content/blog/` | `title`, `description`, `pubDate`, `updatedDate?`, `tags[]`, `borrador` |

Un proyecto **es un case study**, no una ficha: el schema obliga a decir el rol
concreto, el impacto (`metricas`, máximo 3) y el aprendizaje en una frase. El cuerpo
lleva siempre las mismas cuatro secciones `##` — contexto, proceso, rol, resultado —
para que los tres proyectos se puedan comparar de un vistazo. Detalle en la skill
`/nuevo-contenido`.

`titular` es la línea de encuadre que se pinta **encima** del título, en
mayúsculas pequeñas, tanto en la tarjeta como en la cabecera del detalle: el
título dice qué es el proyecto y el titular dice desde qué ángulo se cuenta
("Simplificar la gestión de eventos multiusuario").

**Trampa al tocar el schema:** Astro cachea las entradas ya validadas en
`.astro/`. Si añades un campo al schema y rellenas los `.md`, el build lo recoge
pero **`astro dev` puede seguir sirviendo las entradas viejas sin el campo
nuevo**, sin dar ningún error: Zod descarta las claves que no conoce. Si un campo
recién añadido "no aparece" en dev y sí en `dist/`, es esto — borra `.astro/` y
reinicia el dev server.

Los listados ordenan por `orden` ascendente (y `fecha` descendente para empatar):
con tres proyectos manda el criterio editorial, no la cronología.

## La regla del flag `borrador`

Ambas colecciones tienen `borrador` con default `false`. **Todo `getCollection()` tiene que filtrarlo:**

```ts
const posts = await getCollection('blog', ({ data }) => !data.borrador);
```

Olvidarlo no da error ni aviso: publica los borradores en silencio. Es el fallo más fácil de cometer en este proyecto.

## Rutas de detalle

Las colecciones viven fuera de `src/pages/`, así que **no generan rutas solas**. Cada una tiene su `[...slug].astro` que:

1. Llama a `getCollection()` dentro de `getStaticPaths()` — filtrando `borrador`.
2. Usa `entry.id` como `params.slug` (el `id` lo deriva Astro del nombre del archivo).
3. Pasa la entrada entera por `props` y la renderiza con `const { Content } = await render(entry)`.

El nombre del archivo es `[...slug].astro` con **rest parameter**, no `[slug].astro`: permite slugs con `/` si algún día se usa la propiedad `slug` del frontmatter para anidar.

## Markdown

Shiki resalta los bloques de código por defecto con el tema `github-dark`, sin CSS ni JS extra en el cliente.

Si se añaden temas claro/oscuro (`markdown.shikiConfig.themes`), el CSS se escribe contra la clase **`.astro-code`** y las variables `--astro-code-*` — no contra `.shiki` / `--shiki-*`, que es lo que dice la documentación de Shiki y aquí no aplica.

`markdown.remarkPlugins` y `rehypePlugins` están **deprecados** en esta versión de Astro: los plugins van dentro de `markdown.processor`.

El estilado del Markdown renderizado está en `ProjectLayout` y `PostLayout` bajo la clase `.prose-portfolio`, con selectores `:global()` — ver `styling.md` para por qué son necesarios.
