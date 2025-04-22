import { Locale } from '@/i18n/locales';

export interface Service {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
}