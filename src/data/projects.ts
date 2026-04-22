export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Portfolio",
    description:
      "Personal portfolio built with Astro, TailwindCSS, and GSAP animations. Features i18n, orbital skill showcase, and Docker deployment.",
    image: "https://placehold.co/900x500",
    tags: ["Astro", "TailwindCSS", "GSAP", "Docker"],
    repo: "https://github.com/danielpenalozab/portfolio",
    url: "/projects/portfolio",
  },
  {
    title: "Project Name",
    description: "What it does and why it matters.",
    image: "https://placehold.co/900x500",
    tags: ["Tech1", "Tech2", "Tech3"],
    url: "https://live-url.com",
    repo: "https://github.com/...",
  },
  {
    title: "Project Name",
    description: "What it does and why it matters.",
    image: "https://placehold.co/900x500",
    tags: ["Tech1", "Tech2", "Tech3"],
    url: "https://live-url.com",
    repo: "https://github.com/...",
  },
  {
    title: "Project Name",
    description: "What it does and why it matters.",
    image: "https://placehold.co/900x500",
    tags: ["Tech1", "Tech2", "Tech3"],
    url: "https://live-url.com",
    repo: "https://github.com/...",
  },
];
