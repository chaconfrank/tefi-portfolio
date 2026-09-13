# Arquitectura

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Forma del proyecto

Sitio estático (`output: 'static'`) sin adaptador ni backend. Todo se resuelve en tiempo de build; en el navegador sólo corren dos `<script>` sueltos (toggle de tema y menú móvil).

**No hay framework de UI instalado.** No añadas React/Vue/Svelte sin que se pida explícitamente: cualquier interactividad que haga falta se resuelve con un `<script>` o un custom element (ver `components.md`).

## Flujo de datos

Tres fuentes, cada una con su mecanismo. Al añadir datos, elige la que corresponda en vez de crear una cuarta:

1. **Colecciones de contenido** (`src/content/proyectos/`, `src/content/blog/`) — Markdown/MDX cargado con el `glob()` loader y validado con Zod en `src/content.config.ts`. Es lo que crece con el tiempo y necesita validación. Detalle en `content.md`.
2. **Datos estructurados** (`src/data/*.json`) — experiencia y skills. Listas cortas, sin schema, que sólo se pintan. Si una de estas listas empieza a necesitar validación o cuerpo en Markdown, promociónala a colección.
3. **Configuración del sitio** (`src/consts.ts`) — título, descripción, navegación y redes. El nav del header y los enlaces del footer se derivan de aquí: **no hardcodees enlaces de navegación en los componentes**.

## Composición de páginas

```
BaseLayout            shell <html>, Header, <main><slot/></main>, Footer
  └─ BaseHead         <head>: canónica, Open Graph, RSS, script de tema
ProjectLayout         BaseLayout + cabecera de proyecto + estilos del Markdown
PostLayout            BaseLayout + cabecera de post + estilos del Markdown
```

Una página nueva usa `BaseLayout` y le pasa `title` y `description`; si no lo hace, hereda los valores de `consts.ts` y **dos páginas distintas compiten por el mismo título en buscadores**.

Las páginas de detalle de contenido no llaman a `BaseLayout` directamente: usan `ProjectLayout` o `PostLayout`, que ya resuelven la cabecera y el estilado del Markdown.

## Rutas y enlaces

`build.format` vale `'directory'` por defecto: cada página se genera como `/ruta/index.html` y `Astro.url.pathname` lleva barra final. Con ese formato la doc de Astro recomienda fijar `trailingSlash: 'always'` (o `'never'` si algún día se cambia a `format: 'file'`) para que dev y build no difieran.

Sea cual sea la elección, aplícala en **los tres sitios a la vez**:

1. Los `href` de `NAV_LINKS` en `src/consts.ts`.
2. Los `href` construidos con `entry.id` en tarjetas y listados.
3. El helper `rss()` en `src/pages/rss.xml.js`, que **añade barra final por su cuenta pase lo que pase**: con `trailingSlash: 'never'` hay que pasarle `trailingSlash: false` explícitamente o el feed apuntará a URLs que redirigen.

## Configuración

`site` en `astro.config.mjs` es **obligatorio**, no cosmético: de él dependen el sitemap, el RSS y las URLs canónicas de `BaseHead`. Hoy es el placeholder `https://tefi.dev`.

Las variables de entorno se leen con `import.meta.env`, nunca con `process.env`. Sólo las que empiezan por `PUBLIC_` llegan al navegador; el resto es servidor. Para tipado y validación, declara el esquema en `env.schema` del config e importa desde `astro:env/client` o `astro:env/server`.

Ni `import.meta.env` ni `astro:env` funcionan **dentro de `astro.config.mjs`**: ahí toca `process.env` o `loadEnv` de Vite.
