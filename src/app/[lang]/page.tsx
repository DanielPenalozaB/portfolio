import EducationCertifications from '@/components/home/education-certifications';
import Experience from '@/components/home/experience';
import Hero from '@/components/home/hero';
import LetsWorkTogether from '@/components/home/lets-work-together';
import Projects from '@/components/home/projects';
import Services from '@/components/home/services';
import Skills from '@/components/home/skills';
import Testimonials from '@/components/home/testimonials';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { defaultLocale, Locale, locales } from '@/i18n/locales';
import { isValidLocale } from '@/i18n/utils';
import { fetchGlobalData } from '@/api/global';
import { notFound } from 'next/navigation';
import { fetchHomeData } from '@/api/home';
import { getComponentFromZone } from '@/utils/get-component-from-zone';

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

const getFallbackMetadata = () => ({
  title: 'Daniel Peñaloza | Full Stack & UX/UI Developer',
  description: 'Full Stack Developer & UX/UI Designer'
});

export interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const awaitedParams = await params;
  const locale = awaitedParams.lang ?? defaultLocale;

  if (!isValidLocale(locale)) return getFallbackMetadata();

  try {
    const { data } = await fetchGlobalData(locale as Locale);
    const { defaultSeo } = data;
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

    const canonicalUrls = Object.fromEntries(locales.map((loc) => [
      loc,
      loc === defaultLocale ? defaultSeo.canonicalURL : `${defaultSeo.canonicalURL}/${loc}`
    ]));

    return {
      title: defaultSeo.metaTitle,
      description: defaultSeo.metaDescription,
      keywords: defaultSeo.keywords,
      robots: defaultSeo.metaRobots,
      alternates: {
        canonical: canonicalUrls[locale],
        languages: canonicalUrls
      },
      icons: {
        icon: API_URL + defaultSeo.metaImage?.formats.thumbnail.url,
        apple: API_URL + defaultSeo.metaImage?.formats.thumbnail.url
      },
      openGraph: {
        type: 'website',
        url: defaultSeo.structuredData.url,
        title: defaultSeo?.metaSocial?.[0].title,
        description: defaultSeo?.metaSocial?.[0].description,
        siteName: defaultSeo.structuredData.name,
        locale: data.locale,
        images: [
          {
            url: API_URL + defaultSeo.metaImage?.formats.medium.url,
            width: 750,
            height: 750,
            alt: defaultSeo.structuredData.name
          }
        ],
        alternateLocale: data.localizations.map((l) => l.locale)
      },
      authors: {
        name: defaultSeo.structuredData.name,
        url: defaultSeo.structuredData.url
      },
      creator: defaultSeo.structuredData.name,
      twitter: {
        card: 'summary_large_image',
        site: defaultSeo.structuredData.url,
        creator: defaultSeo.structuredData.name,
        title: defaultSeo?.metaSocial?.[0].title,
        description: defaultSeo?.metaSocial?.[0].description,
        images: [ API_URL + defaultSeo.metaImage?.formats.thumbnail.url ]
      }
    };
  } catch (error) {
    console.error('Failed to fetch SEO data:', error);
    return getFallbackMetadata();
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

const homeId = process.env.NEXT_PUBLIC_STRAPI_HOME_PAGE_ID || '';

export default async function LocaleHome({ params }: PageProps) {
  const awaitedParams = await params;
  const locale = awaitedParams.lang ?? defaultLocale;

  if (!isValidLocale(locale)) notFound();

  const { data } = await fetchGlobalData(locale);
  const { navbar, footer } = data;

  const { data: homeData } = await fetchHomeData(homeId, locale);
  const { content } = homeData;

  const hero = getComponentFromZone(content, 'sections.hero');
  const projects = getComponentFromZone(content, 'sections.projects');
  const skills = getComponentFromZone(content, 'sections.skills');
  const services = getComponentFromZone(content, 'sections.services');
  const experience = getComponentFromZone(content, 'sections.experience');
  const education = getComponentFromZone(content, 'sections.education');
  const testimonials = getComponentFromZone(content, 'sections.testimonials');
  const contact = getComponentFromZone(content, 'sections.contact');

  return (
    <>
      <Navbar data={navbar} />
      <Hero data={hero} />
      <Projects data={projects} />
      <Skills data={skills} locale={locale} />
      <Services data={services} />
      <Experience data={experience} />
      <EducationCertifications data={education} locale={locale} />
      <Testimonials data={testimonials} />
      <LetsWorkTogether data={contact} locale={locale} />
      <Footer data={footer} locale={locale} />
    </>
  );
}

