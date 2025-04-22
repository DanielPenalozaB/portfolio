import { Image } from './image';

export interface Seo {
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

export interface StructuredData {
  url: string;
  name: string;
  '@type': string;
  sameAs: string[];
  '@context': string;
  jobTitle: string;
}

export interface MetaSocial {
  id:            number;
  socialNetwork: string;
  title:         string;
  description:   string;
  image:         Image;
}