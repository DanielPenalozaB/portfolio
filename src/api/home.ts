import { fetchAPI } from '@/lib/api-client';
import { HomeResponse } from '@/types/strapi/home';

/**
 * Fetches a specific page by ID from the Strapi API
 */
export async function fetchHomeData(id: string, locale: string = 'en') {
  try {
    const queryParams = 'populate[seo]=true&populate[localizations]=true&populate[content][on][sections.hero][populate]=*&populate[content][on][sections.projects][populate][heading][populate]=description&populate[content][on][sections.projects][populate][projects][populate]=*&populate[content][on][sections.skills][populate]=*&populate[content][on][sections.services][populate]=*&populate[content][on][sections.experience][populate]=*&populate[content][on][sections.education][populate][heading][populate]=description&populate[content][on][sections.education][populate][educations][populate]=company&populate[content][on][sections.testimonials][populate][heading][populate]=description&populate[content][on][sections.testimonials][populate]=clients&populate[content][on][sections.contact][populate][heading][populate]=description&populate[content][on][sections.contact][populate]=socialLinks';

    return await fetchAPI<HomeResponse>(`pages/${id}`, locale, queryParams);
  } catch (error) {
    console.error(`Failed to fetch page data for ID ${id}:`, error);

    return {} as HomeResponse;
  }
}
