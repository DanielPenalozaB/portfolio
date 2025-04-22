import { Company } from './company';
import { ServiceItem } from './service';

export interface Education {
  id: number;
  documentId: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  techStack: ServiceItem[];
  company: Company;
}