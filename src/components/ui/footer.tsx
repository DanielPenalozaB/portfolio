import Link from 'next/link';
import { GithubIcon } from '../icons/github';
import { LinkedInIcon } from '../icons/linkedin';
import { EnvelopeIcon } from '../icons/envelope';
import FiverrIcon from '../icons/fiverr';
import { Footer as FooterType } from '@/types/strapi/shared/footer';

interface FooterProps {
  data: FooterType;
  locale: string;
}

export default function Footer({ data, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="h-5 w-5" />;
      case 'linkedin':
        return <LinkedInIcon className="h-5 w-5" />;
      case 'fiverr':
        return <FiverrIcon className="h-5 w-5" />;
      case 'email':
        return <EnvelopeIcon className="h-5 w-5 stroke-2" />;
      default:
        return null;
    }
  };

  const formatLink = (platform: string, href: string) => {
    if (platform.toLowerCase() === 'email' && !href.startsWith('mailto:')) {
      return `mailto:${href}`;
    }

    return href;
  };

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
              {data.socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={formatLink(link.platform, link.href)}
                  target={link.platform.toLowerCase() !== 'email' ? '_blank' : undefined}
                  rel={link.platform.toLowerCase() !== 'email' ? 'noopener noreferrer' : undefined}
                  className="text-neutral-500 transition-colors hover:text-violet-400"
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </Link>
              ))}
            </div>
            <p className="text-sm font-light text-neutral-500">© {currentYear} {data.logoText}. {locale === 'es' ? ' Todos los derechos reservados.' : ' All rights reserved.'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
