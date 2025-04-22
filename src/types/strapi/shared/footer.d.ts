import { SocialLink } from './social-links';

export interface Footer {
  id: number;
  logoText: string;
  description: string;
  socialLinks: SocialLink[];
}