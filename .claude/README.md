# .claude

Documentación operativa del proyecto: lo que Claude Code lee para trabajar aquí.

| Ruta | Qué es | Cuándo se carga |
| --- | --- | --- |
| `../CLAUDE.md` | Ground rules: comandos, jerarquía de autoridad, estado | Siempre, automático |
| `conventions/` | Convenciones detalladas, una por área | Siempre, vía `@` desde CLAUDE.md |
| `skills/` | Flujos de trabajo del proyecto | Bajo demanda, cuando la tarea encaja |
| `settings.json` | Permisos del proyecto | Siempre, por el harness |

## Reglas de mantenimiento

Toda convención nueva va a `conventions/`, **nunca a CLAUDE.md**: ese archivo entra en contexto en cada sesión y tiene que seguir siendo corto. En CLAUDE.md sólo se añade la línea `@` que apunta al archivo.

Las convenciones describen **este** proyecto. Si algo es el comportamiento por defecto de Astro y no una decisión nuestra, no se documenta salvo que sea una trampa real (algo que el build no avisa).

Cada regla debería poder responder "¿qué se rompe si no la sigo?". Si no hay respuesta, sobra.
