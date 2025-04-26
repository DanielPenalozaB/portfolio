'use client';

import Link from 'next/link';
import { EnvelopeIcon } from '../icons/envelope';
import { LinkedInIcon } from '../icons/linkedin';
import FiverrIcon from '../icons/fiverr';
import { MapPinIcon } from '../icons/map-pin';
import { GithubIcon } from '../icons/github';
import Button from '../ui/button';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from '../strapi/section-heading';
import { Locale } from '@/i18n/locales';

export default function LetsWorkTogether({ data, locale }: { data: DynamicZone | undefined, locale: Locale }) {
  if (!data) {
    return null;
  }

  const { heading, description, email, location, socialLinks } = data;
  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className='flex items-center justify-center gap-10 max-md:flex-col'>
        <div className='md:max-w-80 flex flex-col gap-4'>
          <SectionHeading
            title={heading?.title || 'Testimonials'}
            description={heading?.description?.body}
          />
          {description && (
            <p className='text-neutral-500'>
              {description}
            </p>
          )}
          <ul className='mt-4 flex flex-col gap-4'>
            {email && (
              <li className='flex items-center gap-4'>
                <div className='rounded-full bg-neutral-200 p-2'>
                  <EnvelopeIcon className='h-5 w-5 text-violet-500' />
                </div>
                <Link href={`mailto:${email}`} title='Email' className='truncate text-neutral-600 hover:text-violet-500'>
                  {email}
                </Link>
              </li>
            )}
            { socialLinks?.find((link) => link.platform === 'linkedin') && (
              <li className='flex items-center gap-4'>
                <div className='rounded-full bg-neutral-200 p-2'>
                  <LinkedInIcon className='h-5 w-5 text-violet-500' />
                </div>
                <Link href="https://www.linkedin.com/in/juan-daniel-pe%C3%B1aloza-brito/" title='LinkedIn' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                LinkedIn
                </Link>
              </li>
            )}
            { socialLinks?.find((link) => link.platform === 'github') && (
              <li className='flex items-center gap-4'>
                <div className='rounded-full bg-neutral-200 p-2'>
                  <GithubIcon className='h-5 w-5 text-violet-500' />
                </div>
                <Link href="https://github.com/DanielPenalozaB/" title='Github' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                Github
                </Link>
              </li>
            )}
            { socialLinks?.find((link) => link.platform === 'fiverr') && (
              <li className='flex items-center gap-4'>
                <div className='rounded-full bg-neutral-200 p-2'>
                  <FiverrIcon className='h-5 w-5 text-violet-500' />
                </div>
                <Link href="https://www.fiverr.com/daniel_penaloza?public_mode=true" title='Fiverr' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                Fiverr
                </Link>
              </li>
            )}
            {location && (
              <li className='flex items-center gap-4'>
                <div className='rounded-full bg-neutral-200 p-2'>
                  <MapPinIcon className='h-5 w-5 text-violet-500' />
                </div>
                <p className='text-neutral-600'>
                  Cali, Colombia
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className='min-w-xs lg:min-w-lg w-full md:max-w-lg'>
          <form
            action="https://formsubmit.co/juandanielpenalozabrito@gmail.com"
            method="POST"
            className='flex w-full flex-col gap-6 rounded-3xl bg-neutral-200/70 p-6'
          >
            <input type="text" name="name" placeholder={locale === 'en' ? 'Name*' : 'Nombre*'} className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" required />
            <input type="email" name="email" placeholder="Email*" className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" required />
            <input type="text" name="subject" placeholder={locale === 'en' ? 'Subject*' : 'Asunto*'} className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" required />
            <textarea name="details" rows={4} placeholder={locale === 'en' ? 'Details*' : 'Detalles*'} className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" required />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://danielpenalozab.com/" />
            <Button type='submit' size='lg' className='rounded-xl! h-14'>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}