import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un proyecto = un case study. El schema fuerza la estructura que espera
// un recruiter: qué problema, qué hiciste tú, qué impacto tuvo.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      // Una línea. Es lo único que se lee en la tarjeta: di el resultado,
      // no la categoría ("Rediseño que subió la activación un 34%").
      descripcion: z.string(),
      tipo: z.enum(['Startup', 'Freelance', 'Proyecto propio']),
      // Tu rol concreto: "Product Designer (único diseñador)".
      rol: z.string(),
      periodo: z.string(),
      equipo: z.string().optional(),
      herramientas: z.array(z.string()),
      // Máximo 3: se pintan como tira de impacto arriba del case study.
      // Si no hay métricas duras, usa cualitativas ("0 → 1", "12 entrevistas").
      metricas: z
        .array(z.object({ valor: z.string(), etiqueta: z.string() }))
        .max(3)
        .default([]),
      // Una frase. Si no cabe en una frase, no es el aprendizaje clave.
      aprendizaje: z.string(),
      // Imagen en src/assets/ o junto al .md; Astro la optimiza.
      portada: image().optional(),
      portadaAlt: z.string().optional(),
      demo: z.url().optional(),
      repo: z.url().optional(),
      destacado: z.boolean().default(false),
      // Orden manual en los listados (menor primero). Con tres proyectos
      // importa más el orden que la fecha: lo más fuerte va arriba.
      orden: z.number().default(99),
      fecha: z.coerce.date(),
      borrador: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { proyectos, blog };
