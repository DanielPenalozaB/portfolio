import { Locale } from '@/i18n/locales';
import { Company } from './company';

export interface Education {
  id: number;
  documentId: string;
  gradeTitle?: string;
  description: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  url?: null | string;
  jobTitle?: string;
  company?: Company;
}