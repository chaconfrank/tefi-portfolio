# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Regla crítica: convenciones primero

Antes de cualquier cambio, consultar las convenciones del proyecto en `.claude/conventions/`. Están precargadas abajo.

**Jerarquía de autoridad:**
1. Convenciones de este proyecto (`.claude/conventions/`)
2. Documentación oficial de Astro — consultable con el MCP `astro-docs`
3. Criterio general

Toda convención nueva se añade a `.claude/conventions/`, **nunca a este archivo**: CLAUDE.md entra en contexto en cada sesión y debe seguir siendo corto.

### Convenciones del proyecto (precargadas)

@.claude/conventions/architecture.md
@.claude/conventions/code-style.md
@.claude/conventions/components.md
@.claude/conventions/content.md
@.claude/conventions/styling.md
@.claude/conventions/assets.md
@.claude/conventions/git-workflow.md

## Entorno y comandos

**Stack:** Astro 7 · TypeScript strict · Tailwind CSS v4 · sitio estático, sin framework de UI.

Requiere **Node ≥ 22.12** (ver `.nvmrc`). El Node por defecto del sistema es v20 y **falla**: ejecuta `nvm use` antes de cualquier comando npm en esta carpeta.

| Acción | Comando |
| --- | --- |
| Dev server (`localhost:4321`) | `npm run dev` |
| Parar el dev server | `npx astro dev stop` |
| Logs del dev server | `npx astro dev logs` |
| Build estático a `./dist/` | `npm run build` |
| Servir el build | `npm run preview` |
| Type-check (requiere `@astrojs/check`) | `npx astro check` |

**No hay tests ni linter.** `npm run build` es la única verificación automática: falla si un `.md` incumple su schema Zod, si una utilidad de Tailwind no existe o si un import se rompe. Ejecútalo antes de dar por terminado un cambio.

## Idioma

- **Español**: documentación, convenciones, textos de la web, comunicación con el usuario.
- **Inglés**: código, nombres de componentes y variables, commits, ramas, PRs.

Detalle de las excepciones en `code-style.md`.

## Skills del proyecto

| Skill | Cuándo usar |
| --- | --- |
| `/nuevo-contenido` | Añadir un proyecto o un post a las colecciones |

## Rutas

| Concepto | Ruta |
| --- | --- |
| Convenciones | `.claude/conventions/` |
| Skills del proyecto | `.claude/skills/` |
| Permisos del proyecto | `.claude/settings.json` |
| Contenido editable | `src/content/`, `src/data/`, `src/consts.ts` |

## Estado y desviaciones conocidas

Portfolio recién inicializado: el contenido de `src/content/`, `src/data/` y `src/consts.ts` son ejemplos de relleno, y `site` es un placeholder. No hay repositorio git.

Puntos donde el código todavía no sigue las convenciones — arréglalos si tocas esa zona:

1. **La fuente no se carga.** `global.css` declara `--font-sans: 'Inter Variable'` y nada la sirve, así que el sitio cae al stack del sistema. Se resuelve con la API de fuentes de Astro (`assets.md`), no con un `<link>`.
2. **Barra final inconsistente.** `NAV_LINKS` usa `/proyectos` y las tarjetas enlazan a `/proyectos/id/`. Falta decidir `trailingSlash` y unificar los tres sitios (`architecture.md`).
3. **Sin `astro check`.** `@astrojs/check` no está instalado, así que nada comprueba tipos.
