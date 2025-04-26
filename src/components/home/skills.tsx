import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import AngularIcon from '../icons/angular';
import AstroIcon from '../icons/astro';
import BootstrapIcon from '../icons/bootstrap';
import DockerIcon from '../icons/docker';
import EnglishIcon from '../icons/english';
import ExpressIcon from '../icons/express';
import FigmaIcon from '../icons/figma';
import FlaskIcon from '../icons/flask';
import FlutterIcon from '../icons/flutter';
import JestIcon from '../icons/jest';
import NestjsIcon from '../icons/nest-js';
import NextjsIcon from '../icons/nextjs';
import PHPIcon from '../icons/php';
import PiniaIcon from '../icons/pinia';
import ReactIcon from '../icons/react';
import ReactNativeIcon from '../icons/react';
import TailwindCSSIcon from '../icons/tailwindcss';
import TanstackQueryIcon from '../icons/tanstack-query';
import TestingLibraryIcon from '../icons/testing-library';
import ViteIcon from '../icons/vite-js';
import VueIcon from '../icons/vue';
import ZustandIcon from '../icons/zustand';
import SectionHeading from '../strapi/section-heading';
import Link from 'next/link';
import { Locale } from '@/i18n/locales';

// Icon mapping to select the correct icon component based on the string name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Angular: AngularIcon,
  Astro: AstroIcon,
  Bootstrap: BootstrapIcon,
  Docker: DockerIcon,
  English: EnglishIcon,
  Express: ExpressIcon,
  Figma: FigmaIcon,
  Flask: FlaskIcon,
  Flutter: FlutterIcon,
  Jest: JestIcon,
  Nestjs: NestjsIcon,
  Nextjs: NextjsIcon,
  PHP: PHPIcon,
  Pinia: PiniaIcon,
  React: ReactIcon,
  ReactNative: ReactNativeIcon,
  TailwindCSS: TailwindCSSIcon,
  TanstackQuery: TanstackQueryIcon,
  TestingLibrary: TestingLibraryIcon,
  Vite: ViteIcon,
  Vue: VueIcon,
  Zustand: ZustandIcon
};

export default function Skills({ data, locale }: { data: DynamicZone | undefined, locale: Locale }) {
  if (!data) {
    return null;
  }

  const { heading, skills } = data;

  const getExperienceString = (startDate: string | null): string => {
    if (!startDate) return '';

    const start = new Date(startDate);
    const now = new Date();
    const diffYears = now.getFullYear() - start.getFullYear();
    const diffMonths = now.getMonth() - start.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;

    if (totalMonths < 12) {
      return `<1 ${locale === 'en' ? 'year' : 'año'}`;
    } else if (totalMonths < 24) {
      return `1+ ${locale === 'en' ? 'year' : 'año'}`;
    } else if (totalMonths < 36) {
      return `2+ ${locale === 'en' ? 'years' : 'años'}`;
    }

    return `${Math.floor(totalMonths / 12)}+ ${locale === 'en' ? 'years' : 'años'}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <SectionHeading
        title={heading?.title || 'Skills'}
        description={heading?.description?.body}
      />
      <div className="mt-10 grid w-full max-w-6xl grid-cols-6 gap-4 sm:mt-16">
        {skills && skills.sort((a, b) => (b.projects ?? 0) - (a.projects ?? 0)).map((skill) => {
          const IconComponent = iconMap[skill.icon] || (() => null);

          if (skill.href) {
            return (
              <Link
                key={skill.id}
                title={skill.name}
                href={skill.href}
                target="_blank"
                className="col-span-3 flex touch-manipulation flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center outline outline-transparent transition-all duration-150 hover:scale-105 hover:bg-violet-200 hover:outline-4 hover:outline-violet-500 focus:scale-105 focus:bg-violet-200 focus:outline-4 active:scale-105 active:bg-violet-200 active:outline-4 md:col-span-2 xl:col-span-1"
              >
                <IconComponent className="h-6 w-6 text-violet-500" />
                <h3 className="line-clamp-1 font-semibold text-neutral-800">{skill.name}</h3>
                <div className='flex items-center justify-center gap-2 text-sm sm:text-xs'>
                  <p className="text-neutral-600">{skill.years || (skill.startDate ? getExperienceString(skill.startDate) : '')}</p>
                  {skill.projects && (
                    <p className="text-neutral-600">{skill.projects} {locale === 'en' ? 'projects' : 'proyectos'}</p>
                  )}
                </div>
              </Link>
            );
          }

          return (
            <div
              key={skill.id}
              title={skill.name}
              className="col-span-3 flex touch-manipulation flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center outline outline-transparent transition-all duration-150 hover:scale-105 hover:bg-violet-200 hover:outline-4 hover:outline-violet-500 focus:scale-105 focus:bg-violet-200 focus:outline-4 active:scale-105 active:bg-violet-200 active:outline-4 md:col-span-2 xl:col-span-1"
            >
              <IconComponent className="h-6 w-6 text-violet-500" />
              <h3 className="line-clamp-1 font-semibold text-neutral-800">{skill.name}</h3>
              <div className='flex items-center justify-center gap-2 text-sm sm:text-xs'>
                <p className="text-neutral-600">{skill.years || (skill.startDate ? getExperienceString(skill.startDate) : '')}</p>
                {skill.projects && (
                  <p className="text-neutral-600">{skill.projects} {locale === 'en' ? 'projects' : 'proyectos'}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}