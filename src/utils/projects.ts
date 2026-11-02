import { getCollection } from "astro:content";
import type { Locale } from "../i18n";

/**
 * Projects for one locale, sorted by their `order` frontmatter field.
 * Collection order is not guaranteed (it changed between Astro 5 and 7), and the
 * first two entries render as featured cards, so the order must be explicit.
 */
export async function getProjects(locale: Locale) {
  const projects = await getCollection("projects", ({ id }) =>
    id.startsWith(`${locale}/`),
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}
