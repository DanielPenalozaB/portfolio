import { fetchGlobalData } from '@/api/global';
import { fetchProjectsData } from '@/api/projects';
import ProjectsList from '@/components/projects/projects-list';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { defaultLocale } from '@/i18n/locales';
import { getComponentFromZone } from '@/utils/get-component-from-zone';
import { Metadata } from 'next';

const homeId = process.env.NEXT_PUBLIC_STRAPI_PROJECTS_PAGE_ID || '';
const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchProjectsData(homeId, defaultLocale);
    const { seo } = data;

    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.keywords,
      robots: seo.metaRobots,
      alternates: {
        canonical: seo.canonicalURL,
        languages: {
          'en': `/${seo.canonicalURL}`,
          'es': `/es/${seo.canonicalURL}`
        }
      },
      icons: {
        icon: API_URL + seo?.metaImage?.url,
        apple: API_URL + seo?.metaImage?.url
      },
      openGraph: {
        type: 'website',
        url: seo.structuredData.url,
        title: seo?.metaSocial?.[0].title,
        description: seo?.metaSocial?.[0].description,
        siteName: seo.structuredData.name,
        locale: data.locale,
        images: [
          {
            url: API_URL + seo?.metaImage?.url,
            width: 750,
            height: 750,
            alt: seo.structuredData.name
          }
        ],
        alternateLocale: data.localizations.map((localization) => localization.locale)
      },
      authors: {
        name: seo.structuredData.name,
        url: seo.structuredData.url
      },
      creator: seo.structuredData.name,
      twitter: {
        card: 'summary_large_image',
        site: seo.structuredData.url,
        creator: seo.structuredData.name,
        title: seo?.metaSocial?.[0].title,
        description: seo?.metaSocial?.[0].description,
        images: [ API_URL + seo.metaImage?.url ]
      }
    };
  } catch (error) {
    console.error('Failed to fetch SEO data:', error);

    return {
      title: 'My projects | Daniel Peñaloza',
      description: 'My projects'
    };
  }
}

export default async function Projects() {
  const { data } = await fetchGlobalData(defaultLocale);
  const { navbar, footer } = data;

  const { data: projectsData } = await fetchProjectsData(homeId, defaultLocale);
  const { content } = projectsData;

  const projects = getComponentFromZone(content, 'sections.projects');

  return (
    <>
      <Navbar data={navbar} />
      <ProjectsList data={projects} locale={defaultLocale} />
      <Footer data={footer} locale={defaultLocale} />
    </>
  );
}
