import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const partners = defineCollection({
  schema: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

const bonds = defineCollection({
  schema: z.object({
    metric: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { services, partners, bonds };
