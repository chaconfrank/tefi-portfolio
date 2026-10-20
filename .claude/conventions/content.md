# Contenido y colecciones

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Las dos colecciones

Definidas en `src/content.config.ts` con el `glob()` loader y validadas con Zod. El schema es la fuente de verdad: si un `.md` no lo cumple, **el build falla**, que es justo lo que queremos.

| Colección | Ruta | Frontmatter |
| --- | --- | --- |
| `proyectos` | `src/content/proyectos/` | `titulo`, `titular?`, `descripcion`, `tipo`, `empresa?`, `rol`, `rolResumen?`, `periodo`, `herramientas[]`, `metricas[]`, `aprendizaje`, `orden`, `fecha`, `equipo?`, `portada?`, `repo?`, `demo?`, `destacado`, `borrador` |
| `blog` | `src/content/blog/` | `title`, `description`, `pubDate`, `updatedDate?`, `tags[]`, `borrador` |

Un proyecto **es un case study**, no una ficha: el schema obliga a decir el rol
concreto, el impacto (`metricas`, máximo 3) y el aprendizaje en una frase. El cuerpo
lleva siempre las mismas cuatro secciones `##` — contexto, proceso, rol, resultado —
para que los tres proyectos se puedan comparar de un vistazo. Detalle en la skill
`/nuevo-contenido`.

**Plantilla `editorial`** (`plantilla: editorial` en el frontmatter, archivo
`.mdx`): el cuerpo no sigue las cuatro secciones, compone su propia maqueta con
los componentes de `src/components/case-study/` y la ruta lo pinta con
`CaseStudyLayout`, que sólo aporta el marco. `CaseSection` tiene dos
composiciones, `dividida` y `apilada`: altérnalas entre secciones seguidas. Lo
visual de cada sección entra por su slot `media` (`<Fragment slot="media">`
si son varias piezas). Las pausas sin número van con `CaseReflection` y el cierre, con `CaseClosing`.
Para alternar texto y visuales dentro de una sección, `CaseText` continúa el
texto tras una captura; los gráficos ya diseñados (diagramas de flujo) van con
`Diagram`, sin marco de captura ni lámina de fondo: tienen que llegar con
fondo transparente, o quitarles el blanco exterior antes, para que se vean
bien también en oscuro. Los bloques largos se
dividen en pasos con `CaseSubsection` (h3, mismas composiciones que
`CaseSection`); las capturas que ya llegan dentro de un dispositivo van con
`DeviceShot` (sin marco), las anotadas con `AnnotatedScreenshot` y dos
propuestas del mismo peso con `ProposalPair` (`marco` para capturas planas). Un
contenido que pasa de un producto a otro (Profesionales → Conecta) va con
`ProductHandoff`. Para research: `StudyContext` (ficha del estudio, sólo
datos dados) y `FindingsMatrix` (síntesis de hallazgos; no es una `<table>`
para que en móvil se apile sin perder las etiquetas de columna). Dos estados
de una pantalla sin antes/después van con `ScreenDuo`. Las citas reales de participantes,
con `QuoteSet` (comillas y atribución; nunca el filete verde, que es para
ideas de la autora). Un único botón resaltado sobre una pantalla va con
`HighlightedShot` (aro en `--color-metric`, sin halos) e insights compactos
de research con `InsightGrid`.

`CaseHero`, `CaseSection`, `CaseSubsection` y `CaseText` aceptan
`compacta`: el mismo componente con el ritmo vertical apretado (capítulos a
~112 px, subsecciones a ~80 px, texto → visual ~48 px). Wedify, HandiSport y
Amaia · Rediseño general lo usan enteros; Historia de Vida y Preferencias van
sin él. Los componentes de visual, franja y cierre que usa Rediseño general
también la aceptan, con valor por defecto sin cambios. Para la composición
de ese caso hay además `CaseHero lateral` (texto a la izquierda y composición
a la derecha desde lg, alineada arriba con el eyebrow para que se vea al
entrar) con `CaseFacts fondo={false}` debajo (franja entre filetes, sin gris):
es el hero de Rediseño general, Wedify y HandiSport. Además, `VersionStep` con `disposicion="columna"`
(dos versiones lado a lado, cada captura pegada a su texto) o
`"completa"`. `CaseSubsection` admite también `etiqueta`, una línea en
mayúsculas encima del subtítulo.

**Acento por producto:** los componentes pintan el acento con
`--color-amaia-*`. Un caso de otro producto no los toca: envuelve su MDX en
un `<div>` que reasigna esas variables a sus propios tokens
(`[--color-amaia-ink:var(--color-wedify-ink)]`, ver `wedify.mdx` y
`handisport.mdx`). `CaseHero` sin `disciplina` deja el eyebrow sólo con el
producto. Si el
dev server no tiñe tras crear un `.mdx` nuevo, reinícialo: Tailwind no
había escaneado el archivo.

Los `<p>` del MDX no llevan el scope de esos componentes: se estilan con
variantes `[&>p]`, no con `<style>`. En MDX los comentarios son `{/* */}`
(`<!-- -->` rompe el build), y el texto que va dentro de un `<p>` del
componente (`CaseTakeaway`, `CaseNote`) se escribe en la misma línea que la
etiqueta: con saltos de línea el MDX lo envuelve en otro `<p>`.

Cuidado con los espacios entre elementos en línea de una plantilla
(`<span>01</span>` + salto + `<span>· …</span>`): el compilador los
colapsa. Pon `{' '}` explícito.

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

**Ancho del texto:** en los case studies las secciones, subsecciones,
CaseText, versiones, pausas y cierre son **una sola columna a todo el ancho
del contenedor**: encabezado, texto, destacado (debajo del texto) y visual
en vertical. Antes el texto se quedaba en 7–9 de 12 columnas y dejaba un
hueco vacío a la derecha; `composicion` sigue aceptándose pero ya no parte
el bloque en dos columnas.
