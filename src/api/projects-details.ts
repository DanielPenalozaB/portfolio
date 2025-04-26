import { fetchAPI } from '@/lib/api-client';
import { ProjectDetailsResponse } from '@/types/strapi/project-details';

/**
 * Fetches a specific page by ID from the Strapi API
 */
export async function fetchProjectsDetailsData(slug: string, locale: string = 'en') {
  try {
    const queryParams = `?filters[slug][$eq]=${slug}&populate=*`;

    return await fetchAPI<ProjectDetailsResponse>('projects', locale, queryParams);
  } catch (error) {
    console.error(`Failed to fetch page data for ID ${slug}:`, error);

    return {} as ProjectDetailsResponse;
  }
}
