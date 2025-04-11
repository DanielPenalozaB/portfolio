import { SVGAttributes } from 'react';

export interface Tool {
  name: string;
  icon: (props: SVGAttributes<SVGElement>) => JSX.Element;
  link?: string;
  startDate?: string | Date;
  years?: string;
  projects?: number;
}