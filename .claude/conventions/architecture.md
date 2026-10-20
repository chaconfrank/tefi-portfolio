# Arquitectura

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Forma del proyecto

Sitio estático (`output: 'static'`) sin adaptador ni backend. Todo se resuelve en tiempo de build; en el navegador sólo corren dos `<script>` sueltos (toggle de tema y menú móvil).

**No hay framework de UI instalado.** No añadas React/Vue/Svelte sin que se pida explícitamente: cualquier interactividad que haga falta se resuelve con un `<script>` o un custom element (ver `components.md`).

## Flujo de datos

Tres fuentes, cada una con su mecanismo. Al añadir datos, elige la que corresponda en vez de crear una cuarta:

1. **Colecciones de contenido** (`src/content/proyectos/`, `src/content/blog/`) — Markdown/MDX cargado con el `glob()` loader y validado con Zod en `src/content.config.ts`. Es lo que crece con el tiempo y necesita validación. Detalle en `content.md`.
2. **Datos estructurados** (`src/data/*.json`, y su versión inglesa en `src/data/en/`) — experiencia y skills. Listas cortas, sin schema, que sólo se pintan. Si una de estas listas empieza a necesitar validación o cuerpo en Markdown, promociónala a colección.
3. **Configuración del sitio** (`src/consts.ts`) — identidad, email, LinkedIn, rutas del CV y cifras de trayectoria. La navegación, las rutas y los textos de interfaz de cada idioma viven en `src/i18n.ts`: **no hardcodees enlaces ni textos de interfaz en los componentes**.

El portfolio es de **Product Designer**: la navegación son cuatro entradas (Inicio,
Proyectos, Sobre mí, Contacto) y los proyectos son case studies. La colección `blog`
y su feed siguen existiendo y compilando, pero **están fuera de la navegación** (`RUTAS` en `src/i18n.ts`) a
propósito: un blog con un post de relleno resta en un portfolio que se enseña a
recruiters. Si se retoma, se vuelve a añadir al nav.

## Composición de páginas

```
BaseLayout            shell <html>, Header, <main><slot/></main>, Footer
  └─ BaseHead         <head>: canónica, Open Graph, <Font />, script de tema
  └─ halo teal        <div> decorativo en -z-10, detrás de la nav
ProjectLayout         BaseLayout + cabecera de proyecto + estilos del Markdown
PostLayout            BaseLayout + cabecera de post + estilos del Markdown
CaseStudyLayout       BaseLayout + siguiente caso + cierre; el MDX maqueta el resto
```

El `Header` es igual en todas las páginas: **sin fondo propio**, con la nav centrada
en una pastilla translúcida (`NavPill`) y, a la derecha, sólo el cambio de
idioma y el toggle de tema (el CV se descarga desde el hero y Sobre mí). Por
debajo de 400 px los dos controles pasan a botones redondos para que todo
quepa en una fila. El color de la
cabecera no lo pone el header sino un **halo teal** que pinta `BaseLayout` como
`<div>` decorativo absoluto en `-z-10`, centrado arriba y disuelto en transparente.
Si le pones fondo sólido al header, tapas el halo y se pierde el efecto.

Una página nueva usa `BaseLayout` y le pasa `title` y `description`; si no lo hace, hereda los valores de `consts.ts` y **dos páginas distintas compiten por el mismo título en buscadores**.

Las páginas de detalle de contenido no llaman a `BaseLayout` directamente: usan `ProjectLayout` o `PostLayout`, que ya resuelven la cabecera y el estilado del Markdown.

## Rutas y enlaces

`build.format` vale `'directory'` por defecto: cada página se genera como `/ruta/index.html` y `Astro.url.pathname` lleva barra final. Por eso `astro.config.mjs` fija **`trailingSlash: 'always'`**, que es lo que recomienda la doc de Astro con ese formato para que dev y build no difieran.

La decisión está aplicada en **los tres sitios a la vez**; si alguna vez se cambia a `'never'`, hay que cambiarlos los tres:

1. Las rutas de `RUTAS` en `src/i18n.ts`.
2. Los `href` construidos con `entry.id` en tarjetas y listados.
3. El helper `rss()` en `src/pages/rss.xml.js`, que **añade barra final por su cuenta pase lo que pase**: con `trailingSlash: 'never'` hay que pasarle `trailingSlash: false` explícitamente o el feed apuntará a URLs que redirigen.

## Idiomas

El sitio es bilingüe. El español es el idioma por defecto y vive en la raíz;
el inglés, en `/en/` con rutas propias (`/en/projects/`, `/en/about/`,
`/en/contact/`). El idioma de cada página **sale de su URL**:
`getLang(Astro.url)` en `src/i18n.ts`, así que ningún componente lo recibe
por props.

- **Textos de interfaz** (nav, botones, etiquetas, aria-labels): el objeto
  `UI` de `src/i18n.ts`. **Páginas**: un componente por página en
  `src/components/paginas/` con sus textos en un objeto `{ es, en }`; los
  archivos de `src/pages/` y `src/pages/en/` sólo lo renderizan.
- **Case studies**: el inglés de cada `proyectos/<slug>.mdx` vive en
  `proyectos/en/<slug>.mdx` (mismo slug, rutas relativas con un `../` más).
  Su id lleva el prefijo `en/`: usa siempre `getProyectos(lang)`,
  `slugDe()` y `hrefProyecto()`; un `getCollection('proyectos')` a pelo
  mezclaría los dos idiomas.
- **CV**: `cvPath(lang)` da el PDF de cada idioma.
- **Cambio de idioma**: el globo del header enlaza `equivalente()`, la misma
  página en el otro idioma; `BaseHead` emite los `hreflang` con la misma
  función. El blog sólo existe en español y cae en la portada inglesa.

## Configuración

`site` en `astro.config.mjs` es **obligatorio**, no cosmético: de él dependen el sitemap, el RSS y las URLs canónicas de `BaseHead`. Es `https://estephanymago.website` (dominio de IONOS apuntando a Render).

Las variables de entorno se leen con `import.meta.env`, nunca con `process.env`. Sólo las que empiezan por `PUBLIC_` llegan al navegador; el resto es servidor. Para tipado y validación, declara el esquema en `env.schema` del config e importa desde `astro:env/client` o `astro:env/server`.

Ni `import.meta.env` ni `astro:env` funcionan **dentro de `astro.config.mjs`**: ahí toca `process.env` o `loadEnv` de Vite.
