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
- En rutas dinámicas, `getStaticPaths` va con **`satisfies GetStaticPaths`** y las props se tipan con `type Props = InferGetStaticPropsType<typeof getStaticPaths>`. La anotación `: GetStaticPaths` compila, pero deja las props como `unknown` y `astro check` falla.

**`astro dev` y `astro build` no comprueban tipos** (transpilan con esbuild): lo hace `astro check`, que el script `build` corre antes de compilar (`astro check && astro build`). Un error de tipos rompe el build, también en Render.

## Plantillas `.astro`

Para clases condicionales usa `class:list`, nunca concatenación de strings:

```astro
class:list={['rounded-lg px-3 py-1.5', activo ? 'text-ink font-medium' : 'text-ink-soft']}
```

El frontmatter (entre `---`) corre **en el servidor, en tiempo de build**. Nada de lo que declares ahí existe en el navegador. Para pasar un valor a un `<script>`, ver `components.md`.
