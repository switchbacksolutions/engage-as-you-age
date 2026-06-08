import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    /** Post title — shown in listings, <title>, and OG tags */
    title: z.string(),

    /** Short description for SEO meta and post cards (aim for 150–160 chars) */
    description: z.string(),

    /** ISO 8601 publication date */
    pubDate: z.coerce.date(),

    /** ISO 8601 date of last meaningful edit — optional */
    updatedDate: z.coerce.date().optional(),

    /** Path to the hero image, relative to the content file */
    heroImage: image().optional(),

    /** Categorisation tags, e.g. ["astro", "typescript"] */
    tags: z.array(z.string()).default([]),

    /** When true the post is excluded from builds and the RSS feed */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
