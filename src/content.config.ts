import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(160),
    pubDate: z.date(),
    author: z.string().min(1),
    readTime: z.number().int().positive(),
    cardImage: z.string().default('/og-default.png'),
    cardImageAlt: z.string().default(''),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
