'use client';

import { Project } from '@/types/project';
import { Locale } from '@/i18n/locales';
import cn from '@/utils/cn';
import Button from '../ui/button';
import { GithubIcon } from '../icons/github';
import { ArrowTopRightOnSquareIcon } from '../icons/arrow-top-right-on-square';
import { ChevronIcon } from '../icons/chevron';
import Link from 'next/link';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

export default function ProjectCard({ project, locale }: { project: Project, locale: Locale }) {
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
  const [ images ] = useState(project.images);

  const handleNextImage = () => {
    const nextImageIndex = currentImageIndex + 1;

    if (nextImageIndex >= images.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(nextImageIndex);
    }
  };

  const handlePrevImage = () => {
    const prevImageIndex = currentImageIndex - 1;

    if (prevImageIndex < 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(prevImageIndex);
    }
  };

  return (
    <div
      key={project.id}
      className={cn('relative col-span-6 flex flex-col row-span-1 overflow-hidden rounded-lg outline outline-transparent bg-violet-100 backdrop-blur-sm transition-all duration-300')}
    >
      <div className="absolute right-0 top-0 z-10 m-4 flex gap-2 rounded-md bg-white/20 p-2 backdrop-blur-md transition-all duration-300">
        {project.githubUrl && (
          <Button
            size='sm'
            href={project.githubUrl}
            useLocaleForHref={false}
            target="_blank"
            className="bg-violet-600/0! hover:text-violet-100! text-neutral-500! border-transparent! hover:bg-violet-700! h-8 rounded-sm hover:backdrop-blur-sm focus:text-violet-100 focus:backdrop-blur-sm active:text-violet-100 active:backdrop-blur-sm"
          >
            <GithubIcon className="h-4 w-4" /> {locale === 'en' ? 'Code' : 'Código'}
          </Button>
        )}
        <Button
          size='sm'
          href={`projects/${project.slug}`}
          className="bg-fuchsia-600/0! hover:text-fuchsia-100! text-neutral-500! border-transparent! hover:bg-fuchsia-800! h-8 rounded-sm hover:backdrop-blur-sm focus:bg-fuchsia-800 focus:text-fuchsia-100 focus:backdrop-blur-sm active:bg-fuchsia-800 active:text-fuchsia-100 active:backdrop-blur-sm"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Info
        </Button>
      </div>
      <div className='group relative h-full max-h-[19rem] w-full'>
        <span className='absolute bottom-2 left-1/2 z-10 -translate-x-1/2 select-none rounded-md bg-white/20 px-3 py-2 text-sm text-neutral-500 backdrop-blur-md'>
          {currentImageIndex + 1} / {images?.length}
        </span>
        <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 justify-between px-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            size='sm'
            onClick={handlePrevImage}
            title={locale === 'en' ? 'Previous image' : 'Imagen anterior'}
            className="text-neutral-500! border-transparent! p-2! hover:bg-white/40! rounded-lg bg-white/20 backdrop-blur-md focus:bg-white/20"
          >
            <ChevronIcon className="h-6 w-6 -rotate-90" />
          </Button>
          <Button
            size='sm'
            onClick={handleNextImage}
            title={locale === 'en' ? 'Next image' : 'Imagen siguiente'}
            className="text-neutral-500! border-transparent! p-2! hover:bg-white/40! rounded-lg bg-white/20 backdrop-blur-md focus:bg-white/20"
          >
            <ChevronIcon className="h-6 w-6 rotate-90" />
          </Button>
        </div>
        <img
          src={API_URL + images?.[currentImageIndex]?.formats[project.size].url || '/placeholder.svg'}
          alt={images?.[currentImageIndex]?.alternativeText || project.title}
          width={800}
          height={600}
          className="z-0 h-full max-h-[19rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="z-10 flex flex-col justify-end gap-4 bg-violet-100 p-6">
        <Link
          href={`projects/${project.slug}`}
          className='group/title flex flex-col gap-2'
        >
          <h3 className="text-xl font-light text-violet-500 no-underline transition-all duration-300 ease-in-out group-hover/title:underline">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm font-light text-neutral-500 no-underline transition-all duration-300 ease-in-out group-hover/title:underline">
            {project.description}
          </p>
        </Link>
        <div className="flex flex-wrap gap-2 transition-all duration-300">
          {project.tags.slice(0, 3).map((tag) => (
            <div
              key={tag.id}
              className="rounded-full bg-violet-200 px-2 py-1 text-xs font-light text-violet-400"
            >
              {tag.label}
            </div>
          ))}
          {project.tags.length > 3 && (
            <div
              className="rounded-full bg-violet-200 px-2 py-1 text-xs font-light text-violet-400"
            >
              +{project.tags.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
