import { variantStyles } from '@/components/ui/button';

export interface Button {
  id:      number;
  label:   string;
  href:    string;
  variant: keyof typeof variantStyles;
}