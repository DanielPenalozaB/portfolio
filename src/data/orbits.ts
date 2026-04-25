export interface OrbitItem {
  label: string;
  icon: string;
}

export interface OrbitRing {
  radius: number;
  speed: number;
  direction: 1 | -1;
  items: OrbitItem[];
}

const LANGUAGES: OrbitItem[] = [
  { label: "Python", icon: "/icons/python.svg" },
  { label: "TypeScript", icon: "/icons/typescript.svg" },
  { label: "JavaScript", icon: "/icons/javascript.svg" },
  { label: "Vue", icon: "/icons/vue.svg" },
  { label: "React", icon: "/icons/react.svg" },
  { label: "Next.js", icon: "/icons/nextjs.svg" },
  { label: "SvelteKit", icon: "/icons/svelte.svg" },
  { label: "Astro", icon: "/icons/astro.svg" },
  { label: "Spring Boot", icon: "/icons/spring.svg" },
  { label: "Go", icon: "/icons/go.svg" },
  { label: "Flask", icon: "/icons/flask.svg" },
  { label: "Django", icon: "/icons/django.svg" },
  { label: "React Native", icon: "/icons/react.svg" },
  { label: "Flutter", icon: "/icons/flutter.svg" },
  { label: "Angular", icon: "/icons/angular.svg" },
  { label: "Express.js", icon: "/icons/express.svg" },
  { label: "PHP", icon: "/icons/php.svg" },
  { label: "Redux", icon: "/icons/redux.svg" },
  { label: "Java", icon: "/icons/java.svg" },
];

const DEVOPS: OrbitItem[] = [
  { label: "Linux", icon: "/icons/linux.svg" },
  { label: "Dokploy", icon: "/icons/dokploy.svg" },
  { label: "Coolify", icon: "/icons/coolify.svg" },
  { label: "Node.js", icon: "/icons/nodejs.svg" },
  { label: "AWS", icon: "/icons/aws.svg" },
  { label: "GitHub", icon: "/icons/github.svg" },
  { label: "PostgreSQL", icon: "/icons/postgresql.svg" },
  { label: "TailwindCSS", icon: "/icons/tailwind.svg" },
  { label: "Jest", icon: "/icons/jest.svg" },
];

const APPS: OrbitItem[] = [
  { label: "Git", icon: "/icons/git.svg" },
  { label: "Docker", icon: "/icons/docker.svg" },
  { label: "Notion", icon: "/icons/notion.svg" },
  { label: "Jira", icon: "/icons/jira.svg" },
  { label: "Figma", icon: "/icons/figma.svg" },
  { label: "Vite", icon: "/icons/vite.svg" },
];

export const ORBIT_RINGS: OrbitRing[] = [
  {
    radius: 353,
    speed: 25,
    direction: 1,
    items: APPS,
  },
  {
    radius: 478,
    speed: 35,
    direction: -1,
    items: DEVOPS,
  },
  {
    radius: 608,
    speed: 50,
    direction: 1,
    items: LANGUAGES,
  },
];
