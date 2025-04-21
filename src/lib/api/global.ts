import { fetchAPI } from '@/lib/api-client';
import { GlobalResponse } from '@/types/global';

/**
 * Fetches global data from the Strapi API
 */
export async function fetchGlobalData(locale: string = 'en') {
  try {
    const populateParams = [
      'defaultSeo.metaImage',
      'defaultSeo.metaSocial.image',
      'navbar.menuItems',
      'footer.socialLinks',
      'localizations'
    ];

    return await fetchAPI<GlobalResponse>('global', locale, {
      populate: populateParams
    });
  } catch (error) {
    console.error('Failed to fetch global data:', error);

    return {
      data: {
        id: 7,
        documentId: '',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        locale: '',
        navbar: {
          id: 1,
          logoText: 'Daniel Peñaloza',
          menuItems: []
        },
        footer: {
          id: 1,
          logoText: 'Daniel Peñaloza',
          description: 'Full Stack & UX/UI Developer',
          socialLinks: []
        },
        defaultSeo: {
          id: 1,
          metaTitle: 'Daniel Peñaloza | Full Stack & UX/UI Developer',
          metaDescription: 'Full Stack Developer & UX/UI Designer',
          canonicalURL: 'https://danielpenaloza.com',
          keywords: '',
          metaRobots: '',
          structuredData: {
            '@type': 'Person',
            '@context': 'https://schema.org',
            url: 'https://danielpenaloza.com',
            name: 'Daniel Peñaloza',
            jobTitle: 'Full Stack & UX/UI Developer',
            sameAs: []
          },
          metaViewport: ''
        },
        localizations: []
      },
      meta: {}
    } as GlobalResponse;
  }
}