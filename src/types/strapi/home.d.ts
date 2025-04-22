import { Locale } from '@/i18n/locales';
import { Localization } from './global';
import { DynamicZone } from './shared/dynamic-zone';
import { Seo } from './shared/seo';
import { ApiResponse } from './strapi';

export interface Home {
  id: number;
  documentId: string;
  slug: string | null;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
  seo: Seo;
  localizations: Localization[];
  content: DynamicZone[];
}

export type HomeResponse = ApiResponse<Home>