import { fetchAPI } from '@/lib/api-client';
import { ProjectResponse } from '@/types/strapi/projects';

/**
 * Fetches a specific page by ID from the Strapi API
 */
export async function fetchProjectsData(id: string, locale: string = 'en') {
  try {
    const queryParams = 'populate[seo][populate][metaImage]=true&populate[seo][populate][metaSocial][populate]=image&populate[localizations]=true&populate[content][on][sections.projects][populate][heading][populate]=description&populate[content][on][sections.projects][populate][projects][populate]=*';

    return await fetchAPI<ProjectResponse>(`pages/${id}`, locale, queryParams);
  } catch (error) {
    console.error(`Failed to fetch page data for ID ${id}:`, error);

    return {} as ProjectResponse;
  }
}
