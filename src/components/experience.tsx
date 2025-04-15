import cn from '@/utils/cn';
import RootstackIcon from './icons/rootstack';
import SPAIcon from './icons/spa';
import { TitleShapeIcon } from './icons/title-shape';
import Link from 'next/link';

const experiences = [
  {
    jobTitle: 'Mid Fullstack Developer',
    company: 'Rootstack',
    companyLogo: RootstackIcon,
    companyUrl: 'https://rootstack.com',
    startDate: 'June 2024',
    endDate: 'Present',
    description: 'Developing and maintaining web applications using Next.js, TypeScript, and TailwindCSS.',
    technologies: [ 'Next.js', 'TypeScript', 'TailwindCSS' ]
  }, {
    jobTitle: 'Web Developer',
    company: 'SPA',
    companyLogo: SPAIcon,
    companyUrl: 'https://spagrupoinmobiliario.com/',
    startDate: 'April 2022',
    endDate: 'June 2024',
    description: 'Developing and maintaining web applications using Next.js, TypeScript, and TailwindCSS.',
    technologies: [ 'Next.js', 'TypeScript', 'TailwindCSS' ]
  }
];

export default function Experience() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <div className="flex items-center">
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-500" />
        <h2 className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent">
          From Pixels to Performance
        </h2>
      </div>
      <p className="text-pretty mt-2 max-w-lg text-2xl font-semibold tracking-tight text-neutral-700 sm:text-5xl">
        My journey in{' '}
        <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          tech.
        </span>
      </p>
      <div className="mx-auto mt-10 flex w-full max-w-xl flex-col sm:mt-16">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex gap-4">
            <div className={cn('flex flex-col items-center min-w-8', idx === 0 && 'pt-[3.75rem]')}>
              {idx > 0 && (
                <div className={cn(
                  'min-h-5 h-[7.5rem] w-1 bg-neutral-200',
                  idx === 1 ? 'bg-gradient-to-t from-neutral-200 to-violet-400' : 'bg-neutral-200'
                )} />
              )}
              <div className={cn(
                'relative rounded-full',
                idx === 0 ? 'bg-violet-400 max-w-8 min-h-8 min-w-8 h-8 max-h-8 w-8' : 'bg-neutral-200 max-w-6 min-h-6 min-w-6 h-6 max-h-6 w-6'
              )}>
                {idx === 0 && (
                  <div className="max-w-8 min-h-8 min-w-8 absolute left-1/2 top-1/2 h-8 max-h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-transparent outline-4 outline-offset-4 outline-violet-400" />
                )}
              </div>
              <div className={cn(
                'min-h-5 h-full w-1',
                idx === 0 ? 'bg-violet-400'
                  :  idx === experiences.length - 1
                    ? 'bg-gradient-to-t! from-transparent! to-neutral-200!'
                    : 'bg-neutral-200'
              )} />
            </div>
            <div className={cn(
              'flex flex-col gap-4 rounded-xl border border-neutral-300 p-6',
              idx > 0 && 'mt-4'
            )}>
              <div className='focus:ring-ring inline-flex w-fit items-center rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-normal text-neutral-500'>
                {exp.startDate} - {exp.endDate}
              </div>
              <div className='flex flex-col'>
                <h3 className="w-fit bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-2xl font-semibold text-transparent">{exp.jobTitle}</h3>
                <Link href={exp.companyUrl} target='_blank' title={exp.company} className='flex w-fit items-center gap-2 hover:underline'>
                  <exp.companyLogo className="h-5 w-5" />
                  <p className='text-neutral-600'>{exp.company}</p>
                </Link>
              </div>
              <p>{exp.description}</p>
              <div className="mb-4">
                <h4 className="mb-2 font-medium">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <div key={tech} className='inline-flex items-center rounded-full border border-transparent bg-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-200/80'>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}