import { fetchGlobalData } from '@/api/global';
import { fetchHomeData } from '@/api/home';
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
import { defaultLocale } from '@/i18n/locales';
import { getComponentFromZone } from '@/utils/get-component-from-zone';

const homeId = process.env.NEXT_PUBLIC_STRAPI_HOME_PAGE_ID || '';

export default async function Home() {
  const { data } = await fetchGlobalData(defaultLocale);
  const { navbar, footer } = data;

  const { data: homeData } = await fetchHomeData(homeId, defaultLocale);
  const { content } = homeData;

  const hero = getComponentFromZone(content, 'sections.hero');
  const projects = getComponentFromZone(content, 'sections.projects');
  const skills = getComponentFromZone(content, 'sections.skills');

  return (
    <>
      <Navbar data={navbar} />
      <Hero data={hero} />
      <Projects data={projects} />
      <Skills data={skills} />
      <Services />
      <Experience />
      <EducationCertifications />
      <Testimonials />
      <LetsWorkTogether />
      <Footer data={footer} locale={defaultLocale} />
    </>
  );
}
