import EducationCertifications from '@/components/education-certifications';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import LetsWorkTogether from '@/components/lets-work-together';
import Projects from '@/components/projects';
import Services from '@/components/services';
import Skills from '@/components/skills';
import Testimonials from '@/components/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Services />
      <Experience />
      <EducationCertifications />
      <Testimonials />
      <LetsWorkTogether />
    </>
  );
}
