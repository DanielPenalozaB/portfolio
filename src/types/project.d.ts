export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  size?: 'small' | 'medium' | 'large';
}