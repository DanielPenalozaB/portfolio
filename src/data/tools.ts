export type ToolCategory =
  | "language"
  | "frontend"
  | "backend"
  | "devops"
  | "tool";

export interface Tool {
  label: string;
  icon: string;
  category: ToolCategory;
}

export const CATEGORY_META: Record<
  ToolCategory,
  { label: string; color: string }
> = {
  language: { label: "Language", color: "#6366f1" },
  frontend: { label: "Frontend", color: "#0ea5e9" },
  backend: { label: "Backend", color: "#10b981" },
  devops: { label: "DevOps", color: "#f59e0b" },
  tool: { label: "Tool", color: "#8b5cf6" },
};

export const TOOLS: Tool[] = [
  { label: "TypeScript", icon: "/icons/typescript.svg", category: "language" },
  { label: "Next.js", icon: "/icons/nextjs.svg", category: "frontend" },
  { label: "JavaScript", icon: "/icons/javascript.svg", category: "language" },
  { label: "React", icon: "/icons/react.svg", category: "frontend" },
  { label: "Vue", icon: "/icons/vue.svg", category: "frontend" },
  { label: "Astro", icon: "/icons/astro.svg", category: "frontend" },
  { label: "TailwindCSS", icon: "/icons/tailwind.svg", category: "frontend" },
  { label: "Spring Boot", icon: "/icons/spring.svg", category: "backend" },
  { label: "Python", icon: "/icons/python.svg", category: "language" },
  { label: "Figma", icon: "/icons/figma.svg", category: "tool" },
  { label: "Git", icon: "/icons/git.svg", category: "tool" },
  { label: "Docker", icon: "/icons/docker.svg", category: "devops" },
  { label: "Vite", icon: "/icons/vite.svg", category: "tool" },
  { label: "SvelteKit", icon: "/icons/svelte.svg", category: "frontend" },
  { label: "AWS", icon: "/icons/aws.svg", category: "devops" },
  { label: "GitHub", icon: "/icons/github.svg", category: "tool" },
  { label: "Linux", icon: "/icons/linux.svg", category: "devops" },
  { label: "Jira", icon: "/icons/jira.svg", category: "tool" },
  { label: "Angular", icon: "/icons/angular.svg", category: "frontend" },
  { label: "NestJS", icon: "/icons/nestjs.svg", category: "backend" },
  { label: "Express.js", icon: "/icons/express.svg", category: "backend" },
  { label: "Flask", icon: "/icons/flask.svg", category: "backend" },
  { label: "React Native", icon: "/icons/react.svg", category: "frontend" },
  { label: "Flutter", icon: "/icons/flutter.svg", category: "frontend" },
  { label: "Redux", icon: "/icons/redux.svg", category: "frontend" },
  { label: "PostgreSQL", icon: "/icons/postgresql.svg", category: "backend" },
  { label: "PHP", icon: "/icons/php.svg", category: "language" },
  { label: "Go", icon: "/icons/go.svg", category: "language" },
  { label: "Django", icon: "/icons/django.svg", category: "backend" },
  { label: "GraphQL", icon: "/icons/graphql.svg", category: "backend" },
  { label: "Java", icon: "/icons/java.svg", category: "language" },
];
