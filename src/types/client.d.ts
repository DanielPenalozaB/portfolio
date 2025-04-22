import { Locale } from '@/i18n/locales';

export interface Client {
  id: number;
  documentId: string;
  name: string;
  jobTitle: string;
  testimonial: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
  email: string;
}