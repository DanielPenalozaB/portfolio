import { Client } from '@/types/client';
import { Education } from '@/types/education';
import { Project } from '@/types/project';
import { Service } from '@/types/service';
import { Skill } from '@/types/skill';
import { Button } from './button';
import { Heading, SubHeading } from './heading';
import { SocialLink } from './social-links';
import { Experience } from '@/types/experience';

export interface DynamicZone {
  __component: string;
  id: number;
  heading: Heading;
  subHeading?: SubHeading;
  buttons?: Button[];
  socialLinks?: SocialLink[];
  projects?: Project[];
  skills?: Skill[];
  services?: Service[];
  experiences?: Experience[];
  educations?: Education[];
  clients?: Client[];
  email?: string;
  location?: string;
  description?: string;
}