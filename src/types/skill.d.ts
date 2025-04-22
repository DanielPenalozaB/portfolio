import { Locale } from '@/i18n/locales';

export interface Skill {
  id: number;
  documentId: string;
  name: string;
  icon: string;
  href: null | string;
  startDate: Date | null;
  years: null | string;
  projects: number | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
}