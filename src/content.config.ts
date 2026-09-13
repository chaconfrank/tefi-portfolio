import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      descripcion: z.string(),
      // Imagen en src/assets/ o junto al .md; Astro la optimiza.
      portada: image().optional(),
      portadaAlt: z.string().optional(),
      stack: z.array(z.string()),
      repo: z.url().optional(),
      demo: z.url().optional(),
      destacado: z.boolean().default(false),
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
