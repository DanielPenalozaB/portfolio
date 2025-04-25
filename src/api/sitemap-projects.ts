import { fetchAPI } from '@/lib/api-client';
import { SitemapProjectResponse } from '@/types/strapi/sitemap-projects';

/**
 * Fetches the projects to structure the sitemap
 */
export async function fetchProjectsSitemapData() {
  try {
    return await fetchAPI<SitemapProjectResponse>('projects');
  } catch (error) {
    console.error('Failed to fetch projects sitemap data', error);

    return {} as SitemapProjectResponse;
  }
}
