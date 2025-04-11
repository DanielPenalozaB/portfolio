import { Tool } from '@/types/tool';
import { TitleShapeIcon } from './icons/title-shape';
import NextjsIcon from './icons/nextjs';
import ReactIcon from './icons/react';
import TanstackQueryIcon from './icons/tanstack-query';
import ZustandIcon from './icons/zustand';
import AngularIcon from './icons/angular';
import ViteIcon from './icons/vite-js';
import VueIcon from './icons/vue';
import PiniaIcon from './icons/pinia';
import AstroIcon from './icons/astro';
import ExpressIcon from './icons/express';
import NestjsIcon from './icons/nest-js';
import FlaskIcon from './icons/flask';
import PHPIcon from './icons/php';
import TailwindCSSIcon from './icons/tailwindcss';
import BootstrapIcon from './icons/bootstrap';
import JestIcon from './icons/jest';
import TestingLibraryIcon from './icons/testing-library';
import FlutterIcon from './icons/flutter';
import DockerIcon from './icons/docker';
import FigmaIcon from './icons/figma';
import EnglishIcon from './icons/english';

const tools: Tool[] = [
  {
    name: 'Next.js',
    icon: NextjsIcon,
    link: 'https://nextjs.org/',
    startDate: '2022-01-01',
    projects: 13
  },
  {
    name: 'React',
    icon: ReactIcon,
    link: 'https://react.dev/',
    startDate: '2021-01-01',
    projects: 4
  },
  {
    name: 'Tanstack Query',
    icon: TanstackQueryIcon,
    link: 'https://tanstack.com/query',
    startDate: '2024-01-01',
    projects: 1
  },
  {
    name: 'Zustand',
    icon: ZustandIcon,
    link: 'https://zustand-demo.pmnd.rs/',
    startDate: '2023-06-01',
    projects: 3
  },
  {
    name: 'Angular',
    icon: AngularIcon,
    link: 'https://angular.io/',
    startDate: '2023-01-01',
    projects: 3
  },
  {
    name: 'Vite',
    icon: ViteIcon,
    link: 'https://vitejs.dev/',
    startDate: '2022-01-01',
    projects: 4
  },
  {
    name: 'Vue.js',
    icon: VueIcon,
    link: 'https://vuejs.org/',
    startDate: '2024-01-01',
    projects: 1
  },
  {
    name: 'Pinia',
    icon: PiniaIcon,
    link: 'https://pinia.vuejs.org/',
    startDate: '2021-01-01',
    years: '1+ years',
    projects: 1
  },
  {
    name: 'Astro',
    icon: AstroIcon,
    link: 'https://astro.build/',
    startDate: '2023-01-01',
    projects: 3
  },
  {
    name: 'Express.js',
    icon: ExpressIcon,
    link: 'https://expressjs.com/',
    startDate: '2023-01-01',
    projects: 2
  },
  {
    name: 'Nestjs',
    icon: NestjsIcon,
    link: 'https://nestjs.com/',
    startDate: '2023-01-01',
    projects: 4
  },
  {
    name: 'Flask',
    icon: FlaskIcon,
    link: 'https://flask.palletsprojects.com/',
    startDate: '2024-09-01',
    projects: 1
  },
  {
    name: 'PHP',
    icon: PHPIcon,
    link: 'https://www.php.net/',
    startDate: '2021-01-01',
    projects: 3
  },
  {
    name: 'TailwindCSS',
    icon: TailwindCSSIcon,
    link: 'https://tailwindcss.com/',
    startDate: '2022-01-01',
    projects: 17
  },
  {
    name: 'Bootstrap',
    icon: BootstrapIcon,
    link: 'https://getbootstrap.com/',
    startDate: '2021-01-01',
    projects: 5
  },
  {
    name: 'Jest',
    icon: JestIcon,
    link: 'https://jestjs.io/',
    startDate: '2024-01-01',
    projects: 4
  },
  {
    name: 'Testing Library',
    icon: TestingLibraryIcon,
    link: 'https://testing-library.com/',
    startDate: '2023-01-01',
    projects: 2
  },
  {
    name: 'React Native',
    icon: ReactIcon,
    link: 'https://reactnative.dev/',
    startDate: '2024-01-01',
    projects: 1
  },
  {
    name: 'Flutter',
    icon: FlutterIcon,
    link: 'https://flutter.dev/',
    startDate: '2024-01-01',
    projects: 1
  },
  {
    name: 'Docker',
    icon: DockerIcon,
    link: 'https://www.docker.com/',
    startDate: '2023-01-01',
    projects: 6
  },
  {
    name: 'Figma',
    icon: FigmaIcon,
    link: 'https://www.figma.com/',
    startDate: '2022-01-01',
    projects: 7
  },
  {
    name: 'English',
    icon: EnglishIcon,
    years: 'Fluent'
  }
];

export default function Skills() {
  const getExperienceString = (startDate: Date | string): string => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const now = new Date();
    const diffYears = now.getFullYear() - start.getFullYear();
    const diffMonths = now.getMonth() - start.getMonth();

    const totalMonths = diffYears * 12 + diffMonths;

    if (totalMonths < 12) {
      return '<1 year';
    } else if (totalMonths < 24) {
      return '1+ years';
    } else if (totalMonths < 36) {
      return '2+ years';
    }

    return `${(totalMonths / 12).toFixed(0)}+ years`;
  };

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className="flex items-center">
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
        <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">Code + Design = Magic</h2>
      </div>
      <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
        The{' '}
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          tools
        </span>
        {' '}I wield.
      </p>
      <div className="mt-10 grid w-full max-w-6xl grid-cols-6 gap-4 sm:mt-16">
        {tools.map((tool, index) => (
          <div
            key={index}
            title={tool.name}
            className="col-span-3 flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center outline outline-transparent transition-all duration-150 hover:scale-105 hover:bg-violet-200 hover:outline-4 hover:outline-violet-500 md:col-span-2 xl:col-span-1"
          >
            <tool.icon className="h-6 w-6 text-violet-500" />
            <h3 className="line-clamp-1 font-semibold text-neutral-800">{tool.name}</h3>
            <div className='flex items-center justify-center gap-2'>
              <p className="text-sm text-neutral-600">{tool.years || (tool.startDate ? getExperienceString(tool.startDate) : '')}</p>
              {tool.projects && (
                <p className="text-sm text-neutral-600">{tool.projects} projects</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
