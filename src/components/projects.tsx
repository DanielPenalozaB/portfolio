'use client';

import { Project } from '@/types/project';
import Link from 'next/link';
import { GithubIcon } from './icons/github';
import { TitleShapeIcon } from './icons/title-shape';
import Button from './ui/button';
import { ArrowTopRightOnSquareIcon } from './icons/arrow-top-right-on-square';
import useScreenDimensions from '@/hooks/useScreenDimensions';
import cn from '@/utils/cn';

const projects: Project[] = [
  {
    id: 1,
    title: 'Fullstack & UX/UI Portfolio',
    description: 'A showcase of my skills with sleek design and seamless interactions.',
    image: '/placeholder.svg?height=600&width=800',
    tags: [ 'Next.js', 'TypeScript', 'TailwindCSS', 'Responsive Design' ],
    category: 'fullstack',
    github: 'https://github.com',
    demo: 'https://yourportfolio.com',
    size: 'large'
  },
  {
    id: 2,
    title: 'SaveSphere',
    description: 'Expense tracker with budget insights and financial goal tracking.',
    image: '/placeholder.svg?height=600&width=800',
    tags: [ 'Next.js', 'Nestjs', 'Docker', 'Mobile-First Design' ],
    category: 'fullstack',
    github: 'https://github.com',
    demo: 'https://savesphere.com',
    size: 'small'
  },
  {
    id: 3,
    title: 'Casa de Restauración',
    description: 'Modern church website with event management and live streaming.',
    image: '/placeholder.svg?height=600&width=800',
    tags: [ 'Next.js', 'Strapi', 'TailwindCSS' ],
    category: 'frontend',
    github: 'https://github.com',
    demo: 'https://casadrestauracion.com',
    size: 'small'
  },
  {
    id: 4,
    title: 'DailyRecipes',
    description: 'Recipe discovery app with AI-powered meal recommendations.',
    image: '/placeholder.svg?height=600&width=800',
    tags: [ 'Next.js', 'Nestjs', 'AI Integration' ],
    category: 'fullstack',
    github: 'https://github.com',
    demo: 'https://dailyrecipes.app',
    size: 'small'
  },
  {
    id: 5,
    title: 'Family Games',
    description: 'Multiplayer game hub with real-time leaderboards and chat.',
    image: '/placeholder.svg?height=600&width=800',
    tags: [ 'Socket.io', 'Nestjs', 'Vue', 'UX Optimization' ],
    category: 'fullstack',
    github: 'https://github.com',
    demo: 'https://familygames.fun',
    size: 'medium'
  }
];

export default function Projects() {
  const { width } = useScreenDimensions();
  const isMobile = width < 1024;
  const displayedProjects = isMobile ? projects.slice(0, 3) : projects;

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className="flex items-center">
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
        <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">Build. Ship. Repeat.</h2>
      </div>
      <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
        My work, from idea to{' '}
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          launch.
        </span>
      </p>
      <div className="mt-10 grid w-full max-w-6xl grid-rows-3 gap-4 sm:mt-16 lg:max-h-[50rem] lg:grid-cols-12">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className={cn(
              project.size === 'large' && 'col-span-12 lg:col-span-8 row-span-1 lg:row-span-2',
              project.size === 'medium' && 'col-span-12 lg:col-span-8',
              project.size === 'small' && 'col-span-12 lg:col-span-4 row-span-1',
              'group h-64 lg:h-full row-span-1 overflow-hidden rounded-lg outline outline-transparent hover:outline-4 hover:outline-violet-500 bg-violet-200 backdrop-blur-sm transition-all duration-300'
            )}
          >
            <img
              src={project.image || '/placeholder.svg'}
              alt={'Work in progress'}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-violet-800 via-transparent to-transparent p-6 group-hover:gap-4 group-hover:via-violet-800/50 group-hover:backdrop-blur-md">
              <Link
                href={`projects/${project.id}`}
                className='group/title flex flex-col gap-2'
              >
                <h3 className="text-xl font-light text-white no-underline transition-all duration-300 ease-in-out group-hover/title:underline">{project.title}</h3>
                <p className="line-clamp-2 max-h-0 text-sm font-light text-neutral-300 no-underline opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-10 group-hover/title:underline group-hover:opacity-100">
                  {project.description}
                </p>
              </Link>
              <div className="flex max-h-0 flex-wrap gap-2 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
                {project.tags.slice(0, 3).map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-[#7B51BE] px-2 py-1 text-xs font-light text-neutral-300"
                  >
                    {tag}
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
              <div className="flex max-h-0 gap-2 opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
                {project.github && (
                  <Button
                    size='sm'
                    href={project.github}
                    className="bg-violet-600/0! hover:text-violet-100! border-transparent! hover:bg-violet-700! h-8 hover:backdrop-blur-sm"
                  >
                    <GithubIcon className="h-4 w-4" /> Code
                  </Button>
                )}
                {project.demo && (
                  <Button
                    size='sm'
                    href={project.demo}
                    className="bg-fuchsia-600/0! hover:text-fuchsia-100! border-transparent! hover:bg-fuchsia-800! h-8 hover:backdrop-blur-sm"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Info
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isMobile && projects.length > 3 && (
        <div className="mt-8 text-center">
          <Button
            href="/projects"
            variant="outline"
            className="mx-auto border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white"
          >
            View All Projects
          </Button>
        </div>
      )}
    </div>
  );
}