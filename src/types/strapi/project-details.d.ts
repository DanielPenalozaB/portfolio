import { Category } from '../category';
import { Tag } from '../tag';
import { Seo } from './shared/seo';
import { ApiResponse } from './strapi';

export interface ProjectDetails {
  id: number;
  documentId: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  slug: string;
  images?: Image[];
  tags?: Tag[];
  category?: Category;
  localizations?: ProjectDetails[];
  seo: Seo;
}

export type ProjectDetailsResponse = ApiResponse<ProjectDetails[]>