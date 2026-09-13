# Estilo de código

> Convenciones específicas de este proyecto. Lo que aquí se documenta es una decisión nuestra o una trampa que el build no avisa, no el comportamiento por defecto de Astro.

## Idioma

| Ámbito | Idioma |
| --- | --- |
| Textos de la web, rutas (`/sobre-mi`), documentación | Español |
| Nombres de campos del frontmatter de `proyectos` (`titulo`, `descripcion`, `fecha`) | Español |
| Frontmatter de `blog` (`title`, `description`, `pubDate`) | Inglés — **excepción**, hereda del starter oficial |
| Código, nombres de componentes y variables, commits, ramas | Inglés |

La excepción de `blog` es deliberada: mantiene compatibilidad con el schema del starter y con lo que espera `@astrojs/rss`. No la "arregles" por consistencia.

## TypeScript

`tsconfig.json` extiende `astro/tsconfigs/strict`. Consecuencias prácticas:

- Cada componente con props declara **`interface Props`** con ese nombre exacto: la extensión de Astro para VS Code la busca literalmente para dar autocompletado a quien use el componente.
- Los tipos se importan con **`import type`** (`verbatimModuleSyntax` está activo). Sin ello el bundler puede intentar empaquetar un tipo como si fuera código.
- En rutas dinámicas, tipa la función con la utilidad `GetStaticPaths` para tener `params` y `props` comprobados.

**Ni `astro dev` ni `astro build` comprueban tipos**: transpilan con esbuild. Un error de tipos no rompe el build hoy. Si se quiere esa red, hay que instalar `@astrojs/check` y cambiar el script a `astro check && astro build`.

## Plantillas `.astro`

Para clases condicionales usa `class:list`, nunca concatenación de strings:

```astro
class:list={['rounded-lg px-3 py-1.5', activo ? 'text-ink font-medium' : 'text-ink-soft']}
```

El frontmatter (entre `---`) corre **en el servidor, en tiempo de build**. Nada de lo que declares ahí existe en el navegador. Para pasar un valor a un `<script>`, ver `components.md`.
