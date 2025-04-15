import EducationCertifications from '@/components/education-certifications';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Services from '@/components/services';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Services />
      <Experience />
      <EducationCertifications />
    </>
  );
}
