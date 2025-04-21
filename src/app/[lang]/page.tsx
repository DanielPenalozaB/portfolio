import EducationCertifications from '@/components/education-certifications';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import LetsWorkTogether from '@/components/lets-work-together';
import Projects from '@/components/projects';
import Services from '@/components/services';
import Skills from '@/components/skills';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { defaultLocale, Locale, locales } from '@/i18n/locales';
import { isValidLocale } from '@/i18n/utils';
import { fetchGlobalData } from '@/lib/api/global';
import { notFound } from 'next/navigation';

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

const getFallbackMetadata = () => ({
  title: 'Daniel Peñaloza | Full Stack & UX/UI Developer',
  description: 'Full Stack Developer & UX/UI Designer'
});

export async function generateMetadata({ params }: { params: { lang: string } }) {
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

export default async function LocaleHome({ params }: { params: { lang: string } }) {
  const awaitedParams = await params;
  const locale = awaitedParams.lang ?? defaultLocale;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const { data } = await fetchGlobalData(locale);
  const { navbar, footer } = data;

  return (
    <>
      <Navbar data={navbar} />
      <Hero />
      <Projects />
      <Skills />
      <Services />
      <Experience />
      <EducationCertifications />
      <Testimonials />
      <LetsWorkTogether />
      <Footer data={footer} locale={locale} />
    </>
  );
}

