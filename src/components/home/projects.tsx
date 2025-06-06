'use client';

import Link from 'next/link';
import { GithubIcon } from '../icons/github';
import Button from '../ui/button';
import { ArrowTopRightOnSquareIcon } from '../icons/arrow-top-right-on-square';
import useScreenDimensions from '@/hooks/useScreenDimensions';
import cn from '@/utils/cn';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from '../strapi/section-heading';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

export default function Projects({ data }: { data: DynamicZone | undefined }) {
  const { width } = useScreenDimensions();

  if (!data) {
    return null;
  }

  const { heading, projects } = data;

  const isMobile = width < 1024;
  const displayedProjects = isMobile && projects ? projects.slice(0, 3) : projects;

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <SectionHeading
        title={heading?.title || 'Projects'}
        description={heading?.description?.body}
      />
      <div className="mt-10 grid w-full max-w-6xl grid-rows-3 gap-4 sm:mt-16 lg:max-h-[50rem] lg:grid-cols-12">
        {displayedProjects && displayedProjects.map((project) => (
          <div
            key={project.id}
            className={cn(
              project.size === 'large' && 'col-span-12 lg:col-span-8 row-span-1 lg:row-span-2',
              project.size === 'medium' && 'col-span-12 lg:col-span-8',
              project.size === 'small' && 'col-span-12 lg:col-span-4 row-span-1',
              'group h-64 lg:h-full lg:max-h-full row-span-1 overflow-hidden rounded-lg outline outline-transparent hover:outline-4 touch-manipulation hover:outline-violet-500 active:outline-violet-500 focus:outline-violet-500 bg-violet-200 backdrop-blur-sm transition-all duration-300'
            )}
          >
            <img
              src={API_URL + project.images?.[0]?.formats[project.size].url || '/placeholder.svg'}
              alt={'Work in progress'}
              width={800}
              height={600}
              className="tou h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
            />
            <div className="absolute inset-0 flex touch-manipulation flex-col justify-end bg-gradient-to-t from-violet-800 via-transparent to-transparent p-4 group-hover:gap-4 group-hover:via-violet-800/50 group-hover:backdrop-blur-md group-focus:gap-4 group-focus:via-violet-800/50 group-focus:backdrop-blur-md group-active:gap-4 group-active:via-violet-800/50 group-active:backdrop-blur-md">
              <Link
                href={`projects/${project.slug}`}
                className='group/title flex flex-col gap-2'
              >
                <h3 className="text-xl font-light text-white no-underline transition-all duration-300 ease-in-out group-hover/title:underline">
                  {project.title}
                </h3>
                <p className="line-clamp-2 max-h-0 touch-manipulation text-sm font-light text-neutral-300 no-underline opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-10 group-hover/title:underline group-hover:opacity-100 group-focus:max-h-10 group-focus:opacity-100 group-active:max-h-10 group-active:opacity-100">
                  {project.description}
                </p>
              </Link>
              <div className="flex max-h-0 touch-manipulation flex-wrap gap-2 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100 group-focus:max-h-10 group-focus:opacity-100 group-active:max-h-10 group-active:opacity-100">
                {project.tags.slice(0, 3).map((tag) => (
                  <div
                    key={tag.id}
                    className="rounded-full bg-[#7B51BE] px-2 py-1 text-xs font-light text-neutral-300"
                  >
                    {tag.label}
                  </div>
                ))}
                {project.tags.length > 3 && (
                  <div
                    className="rounded-full bg-[#7B51BE] px-2 py-1 text-xs font-light text-neutral-300"
                  >
                      +{project.tags.length - 3}
                  </div>
                )}
              </div>
              <div className="flex max-h-0 touch-manipulation gap-2 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100 group-focus:max-h-10 group-focus:opacity-100 group-active:max-h-10 group-active:opacity-100">
                {project.githubUrl && (
                  <Button
                    size='sm'
                    href={project.githubUrl}
                    useLocaleForHref={false}
                    target="_blank"
                    className="bg-violet-600/0! hover:text-violet-100! border-transparent! hover:bg-violet-700! h-8 touch-manipulation hover:backdrop-blur-sm focus:text-violet-100 focus:backdrop-blur-sm active:text-violet-100 active:backdrop-blur-sm"
                  >
                    <GithubIcon className="h-4 w-4" /> Code
                  </Button>
                )}
                <Button
                  size='sm'
                  href={project.slug}
                  useLocaleForHref={false}
                  className="bg-fuchsia-600/0! hover:text-fuchsia-100! border-transparent! hover:bg-fuchsia-800! h-8 touch-manipulation hover:backdrop-blur-sm focus:bg-fuchsia-800 focus:text-fuchsia-100 focus:backdrop-blur-sm active:bg-fuchsia-800 active:text-fuchsia-100 active:backdrop-blur-sm"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Info
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isMobile && projects && projects.length > 3 && (
        <div className="mt-8 text-center">
          <Button
            href="/projects"
            variant="outline"
            className="hover:text-whiteactive:bg-violet-500 mx-auto touch-manipulation border-violet-500 text-violet-500 hover:bg-violet-500 focus:bg-violet-500 focus:text-white active:text-white"
          >
            View All Projects
          </Button>
        </div>
      )}
    </div>
  );
}