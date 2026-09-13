---
titulo: Tienda para artesanos locales
descripcion: E-commerce estático con catálogo gestionado en Markdown y checkout delegado a Stripe.
stack: ['Astro', 'Stripe', 'Tailwind CSS']
demo: 'https://tienda.tefi.dev'
destacado: true
fecha: 2025-02-10
---

## Contexto

Un colectivo de doce artesanos necesitaba vender online sin pagar la cuota
mensual de una plataforma cerrada.

## Decisiones

- **Catálogo en Markdown**: cada producto es un archivo, versionado en Git.
- **Sin backend propio**: el checkout lo resuelve Stripe con enlaces de pago.
- **Imágenes optimizadas** en tiempo de build, servidas en AVIF con respaldo.

## Resultado

Coste de infraestructura: 0 €/mes. Puntuación de 100 en Lighthouse en las
cuatro categorías.
