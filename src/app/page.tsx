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
import { fetchGlobalData } from '@/lib/api/global';

export default async function Home() {
  const { data } = await fetchGlobalData(defaultLocale);
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
      <Footer data={footer} locale={defaultLocale} />
    </>
  );
}
