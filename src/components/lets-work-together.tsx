'use client';

import Link from 'next/link';
import { EnvelopeIcon } from './icons/envelope';
import { TitleShapeIcon } from './icons/title-shape';
import { LinkedInIcon } from './icons/linkedin';
import FiverrIcon from './icons/fiverr';
import { MapPinIcon } from './icons/map-pin';
import { GithubIcon } from './icons/github';
import Button from './ui/button';

export default function LetsWorkTogether() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className='flex items-center justify-center gap-10 max-md:flex-col'>
        <div className='md:max-w-80 flex flex-col gap-4'>
          <div>
            <div className="flex items-center">
              <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
              <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">Let&apos;s Build Something Amazing</h2>
            </div>
            <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
              Get{' '}
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                in touch!
              </span>
            </p>
          </div>
          <p className='text-neutral-500'>
            Need a <span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-semibold text-transparent'>stunning website</span> or <span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-semibold text-transparent'>web app?</span> Let&apos;s collaborate to turn your vision into reality with clean code and intuitive design.
          </p>
          <ul className='mt-4 flex flex-col gap-4'>
            <li className='flex items-center gap-4'>
              <div className='rounded-full bg-neutral-200 p-2'>
                <EnvelopeIcon className='h-5 w-5 text-violet-500' />
              </div>
              <Link href="mailto:juandanielpenalozabrito@gmail.com" title='Email' className='truncate text-neutral-600 hover:text-violet-500'>
                juandanielpenalozabrito@gmail.com
              </Link>
            </li>
            <li className='flex items-center gap-4'>
              <div className='rounded-full bg-neutral-200 p-2'>
                <LinkedInIcon className='h-5 w-5 text-violet-500' />
              </div>
              <Link href="https://www.linkedin.com/in/juan-daniel-pe%C3%B1aloza-brito/" title='LinkedIn' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                LinkedIn
              </Link>
            </li>
            <li className='flex items-center gap-4'>
              <div className='rounded-full bg-neutral-200 p-2'>
                <GithubIcon className='h-5 w-5 text-violet-500' />
              </div>
              <Link href="https://github.com/DanielPenalozaB/" title='Github' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                Github
              </Link>
            </li>
            <li className='flex items-center gap-4'>
              <div className='rounded-full bg-neutral-200 p-2'>
                <FiverrIcon className='h-5 w-5 text-violet-500' />
              </div>
              <Link href="https://www.fiverr.com/daniel_penaloza?public_mode=true" title='Fiverr' target='_blank' className='text-neutral-600 hover:text-violet-500'>
                Fiverr
              </Link>
            </li>
            <li className='flex items-center gap-4'>
              <div className='rounded-full bg-neutral-200 p-2'>
                <MapPinIcon className='h-5 w-5 text-violet-500' />
              </div>
              <p className='text-neutral-600'>
                Cali, Colombia
              </p>
            </li>
          </ul>
        </div>
        <div className='min-w-xs lg:min-w-lg w-full md:max-w-lg'>
          <form
            action="https://formsubmit.co/mesogoga@mailgolem.com"
            method="POST"
            className='flex w-full flex-col gap-6 rounded-3xl bg-neutral-200/70 p-6'
          >
            <input type="text" name="name" placeholder="Name*" className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" id="name" />
            <input type="email" name="email" placeholder="Email*" className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" id="email" />
            <input type="text" name="subject" placeholder="Subject*" className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" id="subject" />
            <textarea name="details" rows={4} placeholder="Details*" className="w-full rounded-xl bg-neutral-50 p-4 focus:outline-violet-300" id="details" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="/" />
            <Button type='submit' size='lg' className='rounded-xl! h-14'>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}