export interface Skill {
  id: number;
  documentId: string;
  name: string;
  icon: string;
  href: string | null;
  startDate: string | null;
  years: string | null;
  projects: number | null;
}