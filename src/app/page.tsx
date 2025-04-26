import { fetchGlobalData } from '@/api/global';
import { fetchHomeData } from '@/api/home';
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
import { defaultLocale } from '@/i18n/locales';
import { getComponentFromZone } from '@/utils/get-component-from-zone';
import { Metadata } from 'next';

const homeId = process.env.NEXT_PUBLIC_STRAPI_HOME_PAGE_ID || '';
const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchGlobalData(defaultLocale);
    const { defaultSeo } = data;

    return {
      title: defaultSeo.metaTitle,
      description: defaultSeo.metaDescription,
      keywords: defaultSeo.keywords,
      robots: defaultSeo.metaRobots,
      alternates: {
        canonical: defaultSeo.canonicalURL,
        languages: {
          'en': defaultSeo.canonicalURL,
          'es': `${defaultSeo.canonicalURL}/es`
        }
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
        alternateLocale: data.localizations.map((localization) => localization.locale)
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

    return {
      title: 'Daniel Peñaloza | Full Stack & UX/UI Developer',
      description: 'Full Stack Developer & UX/UI Designer'
    };
  }
}

export default async function Home() {
  const { data } = await fetchGlobalData(defaultLocale);
  const { navbar, footer } = data;

  const { data: homeData } = await fetchHomeData(homeId, defaultLocale);
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
      <Skills data={skills} locale={defaultLocale} />
      <Services data={services} />
      <Experience data={experience} />
      <EducationCertifications data={education} locale={defaultLocale} />
      <Testimonials data={testimonials} />
      <LetsWorkTogether data={contact} locale={defaultLocale} />
      <Footer data={footer} locale={defaultLocale} />
    </>
  );
}
