// Source of truth: public/Daniel_Penaloza_CV.pdf. Keep both in sync.
export interface ExperienceEntry {
  company: string;
  role: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; omitted while the role is current. */
  end?: string;
  description: string;
  tags: string[];
  logo: string;
  companyUrl: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Globant",
    role: "Semi Senior Advanced Web UI Developer",
    start: "2025-11",
    description:
      "Design and implement accessible digital experiences for Disney with React and Hono: reusable UI components and pages, lightweight backend routes, WCAG-compliant UI refined with design and product in Figma, and bundle-size and design-system improvements.",
    tags: ["React", "Hono", "TypeScript", "Figma"],
    logo: "/icons/globant.svg",
    companyUrl: "https://globant.com",
  },
  {
    company: "Rootstack",
    role: "Mid Full Stack Developer",
    start: "2024-06",
    end: "2025-11",
    description:
      "Built scalable web applications with Next.js and NestJS, including an interface for managing ALS systems on ships integrated with onboard systems. Prototyped in Figma and worked in agile teams with peer reviews.",
    tags: ["Next.js", "NestJS", "TypeScript", "Figma"],
    logo: "/icons/rootstack.svg",
    companyUrl: "https://rootstack.com",
  },
  {
    company: "Sociedad Privada del Alquiler",
    role: "Junior Developer",
    start: "2022-04",
    end: "2024-06",
    description:
      "Supported internal business applications for a real estate group operating in Colombia and Spain: responsive features with React, Next.js and Astro, mobile support with Flutter, code-quality work through component patterns, docs and reviews, and mentoring new hires.",
    tags: ["React", "Next.js", "Astro", "Flutter"],
    logo: "/icons/spa.svg",
    companyUrl: "https://spagrupoinmobiliario.com/",
  },
];
