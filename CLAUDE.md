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

## Dominio del portfolio

El portfolio existe para conseguir entrevistas de Product Designer. Estephany
tiene dos años de experiencia, así que la baza no es la antigüedad: es demostrar
impacto y proceso. Esa es la regla que decide qué entra y qué no.

**Lenguaje del dominio**

| Término | Qué significa aquí |
| --- | --- |
| Case study | Un proyecto contado como caso: qué problema había, cómo se abordó, qué hizo ella en concreto y qué cambió al final. No es una ficha técnica. |
| Tipo de proyecto | De dónde viene el encargo: startup, freelance o proyecto propio. Distingue el trabajo con cliente real del trabajo sin cliente, y un recruiter lo lee distinto. |
| Métrica de impacto | Una cifra o un hecho que muestra qué cambió gracias al trabajo de diseño. Máximo tres por case study. |
| Aprendizaje clave | Lo que ella se lleva del proyecto, en una frase. Si no cabe en una frase, no es el aprendizaje clave. |
| Borrador | Contenido escrito que todavía no debe verse publicado. |

**Reglas**

1. **Ninguna cifra publicada es inventada.** No se publica un dato falso aunque
   nadie vaya a comprobarlo. Cuando no hay número real, se dice el hecho
   cualitativo que sí es cierto en lugar de estimar uno.
2. **Un case study dice qué hizo ella en concreto**, no qué hizo el equipo. Si
   su papel no se puede describir sin ambigüedad, el proyecto todavía no está
   listo para publicarse.
3. **El móvil no aparece en ninguna página del sitio.** Sí viaja dentro del CV
   en PDF, y es deliberado: lo que se evita es que los rastreadores lo recojan
   del texto de la web, no que lo tenga alguien que se descarga el CV a
   propósito.

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

Portfolio de **Estephany Mago**, Product Designer UX/UI. El esqueleto está completo
y el contenido sale de su CV real. Lo que queda por rellenar está marcado con
`TODO` — búscalos con `grep -rn TODO src astro.config.mjs`:

- `site` en `astro.config.mjs` sigue siendo el placeholder `https://tefi.dev`.
- **Métricas de los case studies**: Amaia ya lleva cifras reales dadas por
  Estephany (tiempo de resolución de incidencias y tamaño del backlog). Wedify y
  Handsport siguen con métricas cualitativas y llevan dentro las preguntas
  concretas que faltan por responder.

Puntos donde el código todavía no sigue las convenciones — arréglalos si tocas esa zona:

1. **Sin `astro check`.** `@astrojs/check` no está instalado, así que nada comprueba tipos.
2. **Sin imágenes.** Ningún case study tiene `portada`; las tarjetas se pintan sin
   imagen. Al añadirlas, van en `src/content/proyectos/` o `src/assets/`, nunca en
   `public/` (ver `assets.md`).
3. **Sin `og-default.png`.** `BaseHead` apunta a `/og-default.png` y ese archivo no
   existe: las previsualizaciones en LinkedIn salen sin imagen.
