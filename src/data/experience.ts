export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  logo: string;
  companyUrl: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Globant",
    role: "Ssr Web UI Developer",
    period: "Nov 2025 — Present",
    description:
      "Led the development of customer-facing web applications using React and Next.js. Implemented CI/CD pipelines and improved deploy times by 40%.",
    tags: ["React", "Next.js", "AWS", "CI/CD"],
    logo: "/icons/globant.svg",
    companyUrl: "https://globant.com",
  },
  {
    company: "Rootstack",
    role: "Mid Full Stack Developer",
    period: "Jun 2024 — Nov 2025",
    description:
      "Built and maintained RESTful APIs with Django and Node.js. Designed responsive UIs with Vue.js and TailwindCSS.",
    tags: ["Vue", "Django", "Node.js", "PostgreSQL"],
    logo: "/icons/rootstack.svg",
    companyUrl: "https://rootstack.com",
  },
  {
    company: "SPA Grupo Inmobiliario",
    role: "Junior Developer",
    period: "Oct 2023 — Jun 2024",
    description:
      "Developed internal tools and contributed to the main product frontend. Gained experience with Docker, Linux servers, and agile workflows.",
    tags: ["JavaScript", "Docker", "Linux", "Figma"],
    logo: "/icons/spa.svg",
    companyUrl: "https://spagrupoinmobiliario.com/",
  },
];
