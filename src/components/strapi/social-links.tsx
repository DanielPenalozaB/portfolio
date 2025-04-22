import { SocialLink } from '@/types/strapi/shared/social-links';
import Link from 'next/link';
import { GithubIcon } from '../icons/github';
import { LinkedInIcon } from '../icons/linkedin';
import FiverrIcon from '../icons/fiverr';
import { EnvelopeIcon } from '../icons/envelope';

const iconsMap = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  fiverr: FiverrIcon,
  email: EnvelopeIcon
};

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="mt-8 flex gap-8">
      {links.map((link) => {
        const Icon = iconsMap[link.platform as keyof typeof iconsMap];

        let formatedLink = link.href;

        if (link.href.includes('@')) {
          formatedLink = `mailto:${link.href}`;
        }

        return (
          <Link
            key={link.id}
            href={formatedLink}
            target={link.platform !== 'email' ? '_blank' : undefined}
            className="text-neutral-500 transition-colors hover:text-violet-400"
            aria-label={link.platform}
            title={link.platform}
          >
            {Icon && <Icon className="h-5 w-5 stroke-2" />}
          </Link>
        );
      })}
    </div>
  );
}
