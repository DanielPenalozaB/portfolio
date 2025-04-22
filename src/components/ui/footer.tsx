import Link from 'next/link';
import { Footer as FooterType } from '@/types/strapi/shared/footer';
import SocialLinks from '../strapi/social-links';

interface FooterProps {
  data: FooterType;
  locale: string;
}

export default function Footer({ data, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center border-t border-neutral-200 bg-neutral-100">
      <div className="container px-8 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-xl font-light tracking-wider">
              {data.logoText}
            </Link>
            {data.description && (
              <p className="text-center text-sm font-light text-neutral-500 md:text-left">
                {data.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4">
              {data.socialLinks && <SocialLinks links={data.socialLinks} />}
            </div>
            <p className="text-sm font-light text-neutral-500">© {currentYear} {data.logoText}. {locale === 'es' ? ' Todos los derechos reservados.' : ' All rights reserved.'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
