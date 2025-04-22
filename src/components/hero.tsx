'use client';

import { ArrowDownTrayIcon } from './icons/arrow-down-tray';
import { ArrowRightIcon } from './icons/arrow-right';
import { HeroDoodle } from './icons/hero-doodle';
import Button from './ui/button';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SocialLinks from './strapi/social-links';
import HeroHeading from './strapi/hero-heading';
import HeroSubHeading from './strapi/hero-subheading';

export default function Hero({ data }: { data: DynamicZone | undefined }) {
  if (!data) {
    return null;
  }

  const { heading, subHeading, buttons, socialLinks } = data;

  return (
    <section className="relative -mt-20 overflow-hidden pb-24 pt-52">
      <HeroDoodle className="min-w-7xl absolute inset-0 right-1/2 -z-10 w-screen rotate-180 animate-pulse" />
      <img src="/patternBg.svg" alt="pattern" loading="lazy" decoding="async" width="1440" height="697" className="z-0h-full absolute left-0 top-0 w-[168%] animate-pulse select-none object-cover opacity-70"/>
      <div className='absolute inset-0 z-0 bg-gradient-to-t from-neutral-50 to-transparent to-45%' />
      <div className='absolute inset-0 -z-10 backdrop-blur-2xl' />
      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <HeroHeading body={heading?.body || ''} />
          <HeroSubHeading body={subHeading?.body || ''} />
          <div className="mt-8 flex items-center gap-4">
            {buttons?.[0] && (
              <Button
                href={buttons?.[0].href}
                size='lg'
                className='gap-0! hover:gap-2! focus:gap-2! group max-sm:px-4'
              >
                {buttons?.[0].label}
                <ArrowRightIcon className="h-4 w-0 touch-manipulation transition-all duration-150 ease-out group-hover:w-4 group-focus:w-4 group-active:w-4" />
              </Button>
            )}
            {buttons?.[1] && (
              <Button
                href={buttons?.[1].href}
                useLocaleForHref={false}
                size='lg'
                variant='outline'
                className='hover:bg-violet-100! border-violet-300! text-violet-400! max-sm:px-4'
              >
                {buttons?.[1].label} <ArrowDownTrayIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
          {socialLinks && <SocialLinks links={socialLinks} />}
        </div>
      </div>
    </section>
  );
}

