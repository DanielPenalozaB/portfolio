import { ApiResponse } from './strapi';

export interface SitemapProject {
  id:          number;
  documentId:  string;
  title:       string;
  description: string;
  githubUrl:   null | string;
  demoUrl:     null | string;
  size:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  locale:      string;
  slug:        string;
}

export type SitemapProjectResponse = ApiResponse<SitemapProject[]>