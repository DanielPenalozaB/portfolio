'use client';

import Link from 'next/link';
import { ArrowDownTrayIcon } from './icons/arrow-down-tray';
import { ArrowRightIcon } from './icons/arrow-right';
import { DonutDoodle } from './icons/donut-doodle';
import { HeroDoodle } from './icons/hero-doodle';
import Button from './ui/button';
import { GithubIcon } from './icons/github';
import { LinkedInIcon } from './icons/linkedin';
import { EnvelopeIcon } from './icons/envelope';

export default function Hero() {
  return (
    <section className="relative -mt-20 overflow-hidden pb-24 pt-52">
      <HeroDoodle className="min-w-7xl absolute inset-0 right-1/2 -z-10 w-screen rotate-180 animate-pulse" />
      <img src="/patternBg.svg" alt="pattern" loading="lazy" decoding="async" width="1440" height="697" className="z-0h-full absolute left-0 top-0 w-[168%] animate-pulse select-none object-cover opacity-70"/>
      <div className='absolute inset-0 z-0 bg-gradient-to-t from-neutral-50 to-transparent to-45%' />
      <div className='absolute inset-0 -z-10 backdrop-blur-2xl' />
      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-neutral-800 sm:text-5xl md:text-6xl">
            <span className="block italic">
              <DonutDoodle className="mb-2 mr-2 inline-block h-7 w-7 text-violet-500 sm:h-8 sm:w-8 md:h-10 md:w-10" />
              Your Vision,
            </span>
            <span className="mt-2 block">
              My{' '}
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Expertise
              </span>
            </span>
            <span className="mt-2 block">Let&apos;s Build Together</span>
          </h1>
          <p className="mt-6 max-w-xl text-center text-lg text-neutral-500">
            <span className='font-semibold text-violet-400'>Full stack</span> & <span className='font-semibold text-fuchsia-400'>UX/UI</span> developer specializing in crafting beautiful, functional, and
            accessible digital experiences that drive <b>results.</b>
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button
              href="#services"
              size='lg'
              className='gap-0! hover:gap-2! focus:gap-2! group'
            >
              Explore services
              <ArrowRightIcon className="h-4 w-0 transition-all duration-150 ease-out group-hover:w-4 group-focus:w-4" />
            </Button>
            <Button
              href="/resume.pdf"
              size='lg'
              variant='outline'
              className='hover:bg-violet-100! border-violet-300! text-violet-400!'
            >
              Download Resume <ArrowDownTrayIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 flex gap-8">
            <Link
              href="https://github.com/DanielPenalozaB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors hover:text-violet-400"
              aria-label="GitHub"
              title='GitHub'
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/juan-daniel-pe%C3%B1aloza-brito-85b740251/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors hover:text-violet-400"
              aria-label="LinkedIn"
              title='LinkedIn'
            >
              <LinkedInIcon className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:juandanielpenalozabrito@gmail.com"
              className="text-neutral-500 transition-colors hover:text-violet-400"
              aria-label="Email"
              title='Email'
            >
              <EnvelopeIcon className="h-5 w-5 stroke-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

