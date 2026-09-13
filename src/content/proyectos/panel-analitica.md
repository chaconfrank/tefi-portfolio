---
titulo: Panel de analítica en tiempo real
descripcion: Dashboard que muestra métricas de producto con actualización en vivo y menos de 30 kB de JS.
stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'SQLite']
repo: 'https://github.com/tefi/panel-analitica'
demo: 'https://panel.tefi.dev'
destacado: true
fecha: 2025-06-18
---

## El problema

El panel anterior tardaba más de cuatro segundos en ser interactivo porque
enviaba el bundle completo de la aplicación para pintar tres gráficas.

## Qué hice

- Renderizado estático del armazón y **islas** sólo para las gráficas.
- Consultas agregadas en SQLite en lugar de calcular en el cliente.
- Streaming de actualizaciones vía Server-Sent Events.

## Resultado

El JavaScript enviado bajó de 310 kB a 28 kB y el tiempo hasta interactivo
quedó por debajo del segundo en 4G simulada.
