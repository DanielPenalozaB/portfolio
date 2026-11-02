import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		tags: z.array(z.string()),
		/** Display order; the first two render as featured cards. */
		order: z.number().int(),
		url: z.string().optional(),
		repo: z.string().optional(),
	}),
});

export const collections = { blog, projects };
