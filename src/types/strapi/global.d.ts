import { Footer } from './shared/footer';
import { Navbar } from './shared/navbar';
import { Seo } from './shared/seo';
import { ApiResponse } from './strapi';

export interface Localization {
  id:          number;
  documentId:  string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  locale:      string;
}

export interface Global {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  defaultSeo: Seo;
  navbar: Navbar;
  footer: Footer;
  localizations: Localization[];
}

export type GlobalResponse = ApiResponse<Global>