export interface Heading {
  id: number;
  body?: string;
  title?: string;
  hrefId?: string;
  description?: SubHeading;
}

export interface SubHeading {
  id: number;
  body: string;
}