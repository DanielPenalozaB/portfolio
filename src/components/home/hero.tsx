'use client';

import { AngularIcon, AstroIcon, AzureIcon, CSSIcon, FigmaIcon, GithubIcon, GitIcon, HTMLIcon, JavaScriptIcon, LinkedInIcon, NodejsIcon, NpmIcon, PHPIcon, PythonIcon, ReactIcon, SassIcon, TailwindIcon, VercelIcon } from '@/assets/svg';
import { GITHUB_URL, LINKEDIN_URL } from '@/constants';
import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import Button from '../ui/button';
import GrainOverlay from '../ui/grain-overlay';
import StackList from './stack-list';
import gsap from 'gsap';

export default function Hero() {
  const t = useTranslations('home.hero');

  // Refs for GSAP animations
  const linkedInRef = useRef(null);
  const githubRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // LinkedIn Icon Animation
    gsap.from(linkedInRef.current, {
      x: 200,
      opacity: 0,
      duration: 2,
      ease: 'back.out(1.7)',
      delay: 0.5,
    });

    // GitHub Icon Animation
    gsap.from(githubRef.current, {
      x: 200,
      opacity: 0,
      duration: 2,
      ease: 'back.out(1.7)',
      delay: 1,
    });
  }, []);

  return (
    <>
      <section id="hero" className="relative flex items-center justify-between gap-20 px-24 py-10">
        <div className="flex flex-col gap-10">
          <h1 className="text-7xl font-bold text-neutral-800 dark:text-neutral-200">
            {t.rich('title', {
              mark: () => <StackList />
            })}
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {t('description')}
          </p>
          <div className="flex gap-4">
            <Button
              href="/projects"
              rel="noopener noreferrer"
              variant="outline"
            >
              View projects
            </Button>
            <Button
              href="#work-with-me"
              rel="noopener noreferrer"
              variant="fill"
            >
              Contact me
            </Button>
          </div>
        </div>
        <div>
          <div className="relative mr-[70px] h-[400px] w-[400px]">
            <div className="h-[400x] w-[400x] overflow-hidden rounded-3xl bg-waikawa dark:bg-waikawa-800">
              <img src="https://avatars.githubusercontent.com/u/118763939?v=4" alt="Daniel Pe&ntilde;aloza" height={400} width={400} />
            </div>
            <div className="absolute left-[calc(100%_+_1.5rem)] top-0 flex w-10 flex-col gap-6">
              <a
                ref={linkedInRef}
                href={LINKEDIN_URL}
                target={"_blank"}
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-[#0077B5] hover:text-[#0077B5]/80 dark:text-neutral-200 hover:dark:text-white"
              >
                <LinkedInIcon className="h-10 w-10" />
              </a>
              <a
                ref={githubRef}
                href={GITHUB_URL}
                target={"_blank"}
                rel="noopener noreferrer"
                title="Github"
                className="text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 hover:dark:text-white"
              >
                <GithubIcon className="h-10 w-10" />
              </a>
            </div>
            <GrainOverlay
              className="!absolute -bottom-12 -right-16 -z-10 h-[300px] w-[300px] overflow-hidden rounded-3xl bg-gradient-to-br from-waikawa-100 to-waikawa-600 dark:from-waikawa-400 dark:to-waikawa-900"
              intensity="heavy"
            />
          </div>
        </div>
      </section>
      <div className='relative mt-24 flex w-screen flex-col overflow-hidden'>
        <div className='absolute bottom-0 left-0 top-0 z-10 w-1/4 select-none bg-gradient-to-r from-light from-20% to-transparent' />
        <div className='absolute bottom-0 right-0 top-0 z-10 w-1/4 select-none bg-gradient-to-l from-light from-20% to-transparent' />
        <Marquee className='py-8' pauseOnHover autoFill>
          <div title='Figma' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <FigmaIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Figma</span>
          </div>
          <div title='Npm' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <NpmIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Npm</span>
          </div>
          <div title='Git' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <GitIcon className={`max-h-12 min-h-12 min-w-12 max-w-12 fill-[#D3462D]`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Git</span>
          </div>
          <div title='JavaScript' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <JavaScriptIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>JavaScript</span>
          </div>
          <div title='React' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <ReactIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>React</span>
          </div>
          <div title='PHP' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <PHPIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>PHP</span>
          </div>
          <div title='Vercel' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <VercelIcon className={`max-h-10 min-h-10 min-w-10 max-w-10`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Vercel</span>
          </div>
          <div title='Python' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <PythonIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Python</span>
          </div>
          <div title='Nodejs' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <NodejsIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Nodejs</span>
          </div>
          <div title='HTML' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <HTMLIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>HTML</span>
          </div>
          <div title='CSS' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <CSSIcon className={`max-h-12 min-h-12 min-w-12 max-w-12 scale-125`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>CSS</span>
          </div>
          <div title='Sass' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <SassIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Sass</span>
          </div>
          <div title='TailwindCSS' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <TailwindIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>TailwindCSS</span>
          </div>
          <div title='Astro' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <AstroIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Astro</span>
          </div>
          <div title='Angular' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <AngularIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Angular</span>
          </div>
          <div title='Azure' className='group relative mr-10 flex max-w-24 items-center rounded-full transition-all duration-150 ease-out'>
            <AzureIcon className={`max-h-12 min-h-12 min-w-12 max-w-12`} />
            <span className='absolute max-w-0 bg-transparent from-60% to-transparent py-4 pr-6 text-2xl font-semibold text-transparent group-hover:left-[calc(100%_+_0.75rem)] group-hover:z-10 group-hover:max-w-max group-hover:bg-gradient-to-r group-hover:from-light group-hover:text-neutral-700'>Azure</span>
          </div>
        </Marquee>
      </div>
    </>
  );
}