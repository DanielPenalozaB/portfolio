import { ApiResponse } from './strapi';

export interface StructuredData {
  url: string;
  name: string;
  '@type': string;
  sameAs: string[];
  '@context': string;
  jobTitle: string;
}

export interface DefaultSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: StructuredData;
  metaViewport: string;
  canonicalURL: string;
  metaImage?: Image;
  metaSocial?: MetaSocial[];
}

export interface MetaSocial {
  id:            number;
  socialNetwork: string;
  title:         string;
  description:   string;
  image:         Image;
}

export interface Image {
  id:                number;
  documentId:        string;
  name:              string;
  alternativeText:   string;
  caption:           null;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               EXT;
  mime:              MIME;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
  publishedAt:       Date;
}

export enum EXT {
  PNG = '.png',
}

export interface Formats {
  large:     Large;
  small:     Large;
  medium:    Large;
  thumbnail: Large;
}

export interface Large {
  ext:         EXT;
  url:         string;
  hash:        string;
  mime:        MIME;
  name:        string;
  path:        null;
  size:        number;
  width:       number;
  height:      number;
  sizeInBytes: number;
}

export enum MIME {
  ImagePNG = 'image/png',
}

export interface MenuItem {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
}

export interface Navbar {
  id: number;
  logoText: string;
  menuItems: MenuItem[];
}

export interface SocialLink {
  id: number;
  platform: string;
  href: string;
}

export interface Footer {
  id: number;
  logoText: string;
  description: string;
  socialLinks: SocialLink[];
}

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
  defaultSeo: DefaultSeo;
  navbar: Navbar;
  footer: Footer;
  localizations: Localization[];
}

export type GlobalResponse = ApiResponse<Global>