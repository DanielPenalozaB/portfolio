import { Locale } from '@/i18n/locales';
import { Company } from './company';
import { Localization } from './strapi/global';
import { Tag } from './tag';

export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  githubUrl: null | string;
  demoUrl: null | string;
  size: Size;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
  images: Image[];
  tags: Tag[];
  category: Company;
  localizations: Localization[];
}

export enum Size {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}