import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const text = z.string().min(1);

const ui = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/ui' }),
  schema: z.object({
    meta: z.object({
      title: text,
      description: text,
    }),
    aria: z.object({
      nav: text,
      lang: text,
      skip: text,
    }),
    nav: z.object({
      about: text,
      founder: text,
      services: text,
      portfolio: text,
      process: text,
      contact: text,
    }),
    hero: z.object({
      title: text,
      kicker: text,
      subtitle: text,
      work: text,
    }),
    about: z.object({
      heading: text,
      paragraphs: z.array(text).min(2).max(3),
    }),
    founder: z.object({
      link: text,
      title: text,
      description: text,
      paragraphs: z.array(text).min(2).max(4),
    }),
    services: z.object({
      heading: text,
      items: z
        .array(
          z.object({
            title: text,
            body: text,
          }),
        )
        .length(3),
    }),
    portfolio: z.object({
      heading: text,
      lede: text,
    }),
    process: z.object({
      heading: text,
      steps: z
        .array(
          z.object({
            title: text,
            body: text,
          }),
        )
        .length(4),
    }),
    contact: z.object({
      heading: text,
      body: text,
      button: text,
    }),
    footer: z.object({
      rights: text,
    }),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title_ko: text,
    title_en: text,
    summary_ko: text,
    summary_en: text,
    order: z.number().int().positive(),
  }),
});

export const collections = { ui, projects };
