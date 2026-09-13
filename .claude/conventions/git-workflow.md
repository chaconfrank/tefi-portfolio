# Git

> Convenciones específicas de este proyecto.

**Estado actual: el proyecto no es todavía un repositorio git.** Estas reglas aplican desde el `git init`.

## Ramas

- Rama principal: `main`.
- **Nunca commitear directamente en `main`.** Una rama por cambio: `feature/<slug>`, `fix/<slug>`.

## Commits

Conventional Commits, en inglés:

```
feat: add project detail page
fix: filter drafts out of the RSS feed
chore: bump astro to 7.4
```

Types habituales: `feat`, `fix`, `refactor`, `style`, `content`, `chore`, `docs`.

`content:` para cambios que sólo añaden o editan entradas de `src/content/` — separa el contenido del código en el historial, que es lo que se quiere mirar por separado en un portfolio.

## Antes de commitear

1. `nvm use` (Node ≥ 22.12).
2. `npm run build` — pasa o no se commitea. Es la única verificación automática que hay: valida schemas de contenido, utilidades de Tailwind e imports.
3. Revisar el diff en staged.

## Qué no se commitea

`dist/`, `.astro/` y `node_modules/` ya están en `.gitignore`. El `.idea/` también. `.vscode/` **sí** se commitea: lleva las extensiones recomendadas del proyecto.
