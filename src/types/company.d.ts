import { Locale } from '@/i18n/locales';

export interface Company {
  id: number;
  documentId: string;
  name?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug?: string;
  description?: null;
  title?: string;
  locale?: Locale;
}