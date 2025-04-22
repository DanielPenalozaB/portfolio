import cn from '@/utils/cn';
import RootstackIcon from './icons/rootstack';
import SPAIcon from './icons/spa';
import Link from 'next/link';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from './strapi/section-heading';

// Icon mapping to select the correct icon component based on the string name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Rootstack: RootstackIcon,
  SPA: SPAIcon
};

export default function Experience({ data }: { data: DynamicZone | undefined }) {
  if (!data) {
    return null;
  }

  const { heading, experiences } = data;

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <SectionHeading
        title={heading?.title || 'Services'}
        description={heading?.description?.body}
      />
      <div className="mx-auto mt-10 flex w-full max-w-xl flex-col sm:mt-16">
        {experiences && experiences.map((exp, idx) => {
          const IconComponent = iconMap[exp.company?.name || ''] || (() => null);

          return (
            <div key={idx} className="flex gap-4">
              <div className={cn('flex flex-col items-center min-w-8', idx === 0 && 'pt-[3.75rem]')}>
                {idx > 0 && (
                  <div className={cn(
                    'min-h-5 h-[6.75rem] w-1 bg-neutral-200',
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
                  {exp.startDate} - {exp.endDate ? exp.endDate : exp.locale === 'en' ? 'Present' : 'Presente'}
                </div>
                <div className='flex flex-col'>
                  <h3 className="w-fit bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-2xl font-semibold text-transparent">
                    {exp.jobTitle}
                  </h3>
                  <Link
                    href={exp.company?.url || ''}
                    target='_blank'
                    title={exp.company?.name}
                    className='flex w-fit items-center gap-2 hover:underline'
                  >
                    <IconComponent className="h-5 w-5" />
                    <p className='text-neutral-600'>{exp.company?.name}</p>
                  </Link>
                </div>
                <p className='line-clamp-4 text-neutral-600'>{exp.description}</p>
                {exp.techStack && (
                  <div className="mb-4">
                    <h4 className="mb-2 font-medium text-neutral-600">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <div
                          key={tech.id}
                          className='inline-flex items-center rounded-full border border-transparent bg-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 transition-colors hover:bg-neutral-200/80'
                        >
                          {tech.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}