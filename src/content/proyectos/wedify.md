---
titulo: 'Wedify — SaaS multiusuario para gestión de eventos'
titular: 'Simplificar la gestión de eventos multiusuario'
descripcion: 'Tres tipos de usuario con objetivos opuestos dentro del mismo producto. Definí la arquitectura de información y un acceso por roles con su propio panel para cada uno.'
tipo: Freelance
rol: 'Product Designer UX/UI — arquitectura de información, flujos y UI'
periodo: 'Oct 2024 — Ene 2025'
herramientas: ['Figma', 'Linear', 'Notion']
metricas:
  - valor: '3 roles'
    etiqueta: 'Superadmin, administrador de recintos y cliente'
  - valor: '3 paneles'
    etiqueta: 'Un panel de control por rol, con sus propias tareas'
  - valor: 'En producción'
    etiqueta: 'La plataforma llegó a publicarse'
aprendizaje: 'Diseñar “una pantalla que sirva para todos” habría sido más barato y peor: separar los paneles por rol fue justo lo que hizo el producto usable para los tres.'
destacado: true
orden: 2
fecha: 2025-01-31
borrador: false
---

<!--
  La plataforma se publicó, pero Estephany no siguió en el proyecto en las
  iteraciones posteriores, así que no hay datos de uso ni validación con usuarios
  finales. Lo único que se validó fue con el antiguo propietario de la
  plataforma, y su devolución fue cualitativa. No inventar métricas de uso aquí.

  TODO (Estephany): faltan pantallas — añade `portada` cuando las tengas.
-->

## Contexto y problema

Wedify es una plataforma SaaS para gestionar eventos, con tres perfiles muy
distintos usando el mismo producto.

- Un **superadministrador** que gobierna toda la plataforma.
- **Administradores de recintos**, que gestionan espacios y disponibilidad.
- **Clientes**, que sólo quieren organizar su evento sin entender el sistema.

Los tres necesitaban cosas distintas de la misma información, y meterlos en una
interfaz común convertía cada pantalla en un compromiso que no servía a nadie.

**La pregunta real:** ¿cuánto de este producto es una sola aplicación y cuánto son
tres productos que comparten datos?

## Proceso

1. **Mapa de la información**: qué datos existen y quién tiene derecho a ver y
   tocar cada uno, antes de dibujar ninguna pantalla.
2. **Flujos de usuario por rol**, en paralelo, para ver dónde se cruzaban de verdad
   y dónde sólo lo parecía.
3. **Sistema de acceso basado en roles** como decisión de diseño, no como detalle
   técnico: define qué ve cada quien desde el primer clic.
4. **Un panel de control por perfil**, cada uno construido alrededor de la tarea
   principal de ese rol.
5. **Interfaz adaptable y accesible**, verificando los recorridos en pantallas
   pequeñas y no sólo en escritorio.

## Mi rol

- Definí la arquitectura de información y los flujos de usuario de los tres roles.
- Diseñé el sistema de acceso por roles y los tres paneles de control.
- Diseñé la interfaz completa, adaptable y accesible.
- Documenté los criterios para que el equipo pudiera seguir añadiendo pantallas
  sin romper la lógica de permisos.

## Resultado e impacto

- Cada rol entra y ve directamente lo suyo, sin navegar por opciones que no puede usar.
- La lógica de permisos quedó resuelta en el diseño, así que las pantallas nuevas
  ya nacen sabiendo qué enseñar a quién.
- Separar los paneles costó más trabajo de diseño y evitó un producto que habría
  sido mediocre para los tres perfiles.
- **La plataforma llegó a publicarse.** La validación fue con el antiguo
  propietario, que destacó la mejora de usabilidad y que los flujos por fin se
  entendían. No hay datos de uso: no seguí en el proyecto en las iteraciones
  siguientes.
