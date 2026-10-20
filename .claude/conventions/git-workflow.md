# Git

> Convenciones específicas de este proyecto.


## Ramas

- Rama principal: `main`.
- **Nunca commitear directamente en `main`.** Una rama por cambio: `feature/<slug>`, `fix/<slug>`.
- **Cada rama sale de `main` y su PR va contra `main`.** No se apilan ramas
  (una PR con base en otra rama): al fusionar la de arriba primero, sus
  cambios acaban en la rama de abajo y no en `main`, que es lo que publica
  Render. Si un cambio depende de otro sin fusionar, se espera a que entre.
- PR pequeñas, de un solo tema: una PR de 70 archivos no se revisa de verdad.

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
