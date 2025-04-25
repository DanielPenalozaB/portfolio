import { fetchGlobalData } from '@/api/global';
import { defaultLocale } from '@/i18n/locales';
import { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  try {
    const { data } = await fetchGlobalData(defaultLocale);
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

    const icons: MetadataRoute.Manifest['icons'] = [];

    if (data?.defaultSeo?.metaImage?.formats) {
      Object.values(data.defaultSeo.metaImage.formats).forEach((format) => {
        if (format.url && format.width && format.height && format.mime) {
          icons.push({
            src: API_URL + format.url,
            sizes: `${format.width  }x${  format.height}`,
            type: format.mime
          });
        }
      });
    } else {
      icons.push({
        src: 'https://cms.danielpenalozab.com/uploads/thumbnail_favicon_0f6715a2c1.png',
        sizes: '156x156',
        type: 'image/png'
      });
    }

    return {
      name: data?.defaultSeo?.metaTitle || 'Daniel Peñaloza Portfolio',
      short_name: 'DP Portfolio',
      description: data?.defaultSeo?.metaDescription || 'Web developer portfolio',
      start_url: '/',
      display: 'standalone',
      icons,
      background_color: '#FAFAFA',
      theme_color: '#8554FD',
      lang: 'en',
      prefer_related_applications: false,
      related_applications: [],
      scope: '/',
      dir: 'ltr',
      orientation: 'any'
    };
  } catch (error) {
    console.error('Failed to generate manifest:', error);

    return {
      name: 'Daniel Peñaloza Portfolio',
      short_name: 'DP Portfolio',
      description: 'Web developer portfolio',
      start_url: '/',
      display: 'standalone',
      icons: [ {
        src: 'https://cms.danielpenalozab.com/uploads/thumbnail_favicon_0f6715a2c1.png',
        sizes: '156x156',
        type: 'image/png'
      } ],
      background_color: '#FAFAFA',
      theme_color: '#8554FD',
      lang: 'en',
      prefer_related_applications: false,
      related_applications: [],
      scope: '/',
      dir: 'ltr',
      orientation: 'any'
    };
  }
}