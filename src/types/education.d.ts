import { Company } from './company';

export interface Education {
  id: number;
  documentId: string;
  gradeTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  url: null;
  company: Company;
}