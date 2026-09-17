---
titulo: 'Amaia Cuida — design systems para tres productos y proceso de QA'
titular: 'Optimizar la gestión de un SaaS y su QA'
descripcion: 'Dos años diseñando tres productos SaaS. Al montar el proceso de QA, las incidencias pasaron de tardar hasta dos semanas a resolverse en 24 h.'
tipo: Startup
rol: 'Única diseñadora de los tres productos: research, diseño, design systems y QA'
periodo: 'Oct 2023 — Sep 2025'
equipo: 'Con producto y desarrollo, en sprints sobre Jira y Linear'
herramientas: ['Figma', 'Jira', 'Linear', 'Notion', 'Slack']
metricas:
  - valor: '24 h'
    etiqueta: 'Resolución de una incidencia; antes, hasta dos semanas'
  - valor: '70 → 15'
    etiqueta: 'Bugs en el backlog, en menos de tres semanas'
  - valor: '3 productos'
    etiqueta: 'Con 2 design systems mantenidos en paralelo'
aprendizaje: 'Partir de Material Design en vez de inventar un sistema propio fue la decisión que más tiempo ahorró: lo valioso no era tener componentes, era tener claro cuáles había que adaptar y cuáles construir desde cero.'
destacado: true
orden: 1
fecha: 2025-09-30
borrador: false
---

<!--
  TODO (Estephany): la bio dice que aquí se diseñaron funcionalidades con IA
  (transformar información compleja en herramientas de trabajo). Al pulir este
  case study, contarlo aquí: qué funcionalidad, para quién y qué resolvía — la
  bio no puede afirmar nada que ningún proyecto respalde.

  Las cifras de aquí son reales y aproximadas a la baja. Si te preguntan en una
  entrevista, la respuesta es literalmente lo que está escrito abajo: antes no
  había sistema de priorización y todo entraba con la misma etiqueta.
-->

## Contexto y problema

**Amaia Cuida** es la startup, y no tiene un producto sino tres: **Amaia
Profesionales**, **Amaia Conecta** y **Amaia App**. Entré como única persona de
diseño de producto, con los tres en marcha.

- Cada producto había crecido por su lado: **la misma acción se resolvía distinto en
  cada uno**.
- No había una fuente de verdad de componentes, así que diseño y desarrollo
  renegociaban lo mismo en cada iteración.
- **Todos los bugs entraban con la misma prioridad.** Sin un criterio para
  ordenarlos, lo urgente y lo accesorio competían por la misma atención: una
  incidencia que no bloqueaba podía quedarse **dos semanas** sin tocar, y una que sí
  dificultaba el uso tardaba tres o cuatro días.
- El backlog acumulaba **más de 70 errores olvidados**, sin documentar y sin nadie
  siguiendo si llegaban a cerrarse.

**La pregunta real:** ¿hace falta inventar un sistema de diseño propio, o coger uno
que ya funciona y adaptarlo a lo que estos tres productos necesitan de verdad?

## Proceso

1. **Auditoría de interfaz**: inventario de lo que ya existía para ver cuántas
   versiones había de cada patrón antes de proponer nada nuevo.
2. **Material Design como base**, no como copia: adapté sus componentes a la marca y
   a los flujos de cada producto en lugar de construir un sistema desde cero. Lo
   que ya estaba resuelto por un sistema maduro no merecía mi tiempo.
3. **Componentes propios donde Material no llegaba**: las funcionalidades específicas
   de Amaia necesitaban piezas que ningún sistema genérico cubre, y esas sí las
   diseñé enteras, con sus estados y casos límite.
4. **Diseño atómico** para mantener los sistemas en paralelo sin que se separaran
   entre sí.
5. **Investigación de usuarios** para las funcionalidades nuevas, con prototipos
   antes de pasar nada a desarrollo.
6. **Historias de usuario y criterios de aceptación** escritos en Jira y Linear,
   para que el diseño llegara a desarrollo con las decisiones ya cerradas.
7. **Proceso de QA**: revisé el backlog entero, etiqueté cada error por prioridad y
   establecí que ninguno entra sin documentar — pasos para reproducirlo, alcance y
   criterio de cierre. Con eso, el ciclo de vida completo del error (reporte,
   priorización, verificación y cierre) por fin se podía seguir.

## Mi rol

- Mantuve los **dos design systems** que cubrían los tres productos: adapté los
  componentes de Material Design a cada marca y diseñé desde cero una quincena de
  componentes propios para las funcionalidades que ninguna librería genérica cubre.
- Diseñé las interfaces a partir de investigación, con prototipado y diseño de
  interacción.
- Lideré la planificación de sprints y definí las historias de usuario.
- Monté el proceso de QA y lo sostuve: no lo dejé documentado y ya está, lo llevé.
- Trabajé en equipo multifuncional, alineando diseño, desarrollo y negocio.

## Resultado e impacto

- **De hasta dos semanas a 24 h** para resolver una incidencia desde que se
  reporta. Lo que lo cambió no fue trabajar más rápido: fue que cada error llegaba
  ya priorizado y documentado.
- **El backlog pasó de más de 70 errores olvidados a unos 15** en menos de tres
  semanas, revisándolos, priorizándolos y documentándolos uno a uno.
- Los design systems redujeron la fricción entre diseño y desarrollo y unificaron
  la marca en los tres productos.
- Apoyarse en Material Design en lugar de inventar un sistema propio dejó el tiempo
  de diseño donde sí aportaba: en los componentes que no existían en ningún sitio.
- Asumir QA además de diseño no estaba en la descripción del puesto. Lo cogí porque
  el cuello de botella del equipo no era diseñar más pantallas, era que nadie sabía
  qué arreglar primero.
