import cn from '@/utils/cn';
import { Education } from '@/types/education';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from './strapi/section-heading';
import Link from 'next/link';
import { LinkIcon } from './icons/link';
import ExpandableDescription from './ui/expandable-description';
import { Locale } from '@/i18n/locales';

const certifications: Education[] = [];

export default function EducationCertifications({ data, locale }: { data: DynamicZone | undefined, locale: Locale }) {
  if (!data) {
    return null;
  }

  const { heading, educations } = data;

  return (
    <div className="rounded-4xl mx-2 my-32 max-w-6xl bg-gradient-to-tl from-violet-500 to-violet-900 p-8 sm:rounded-2xl lg:mx-auto lg:p-12">
      <SectionHeading
        title={heading?.title || 'Services'}
        description={heading?.description?.body}
        isOposite
      />
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 max-md:gap-4 sm:mt-16 md:grid-cols-6">
        <div className='col-span-1 flex flex-col items-center gap-6 md:col-span-3'>
          <h3 className='w-fit text-xl text-violet-300'>{locale === 'en' ? 'Education' : 'Educación'}</h3>
          <div className='flex flex-col max-md:w-full'>
            {educations && educations.map((edu, idx) => (
              <div key={idx} className='flex gap-2 max-md:w-full'>
                <div className={cn(
                  'mb-4 flex w-full md:max-w-xs flex-col border-4 border-transparent gap-2 rounded-2xl p-4',
                  idx === 0 ? 'bg-violet-400/60' : 'border-violet-500'
                )}>
                  <p className={cn(
                    'text-sm mb-2 sm:text-xs self-end',
                    idx === 0 ? 'text-violet-200' : 'text-violet-400'
                  )}>
                    {`${edu.startDate} - ${edu.endDate}`}
                  </p>
                  <p className={cn(
                    'text-lg font-bold',
                    idx === 0 ? 'text-white' : 'text-violet-200'
                  )}>
                    {edu.gradeTitle}
                  </p>
                  {edu.url ? (
                    <Link href={edu.url} target='_blank' className={cn(
                      'text-sm font-bold',
                      idx === 0 ? 'text-violet-200' : 'text-violet-300'
                    )}>
                        /{edu.company?.name} <LinkIcon className='inline-block h-3.5 w-3.5' />
                    </Link>
                  ): (
                    <p className={cn(
                      'text-sm font-bold',
                      idx === 0 ? 'text-violet-200' : 'text-violet-300'
                    )}>
                      /{edu.company?.name}
                    </p>
                  )}
                  <ExpandableDescription
                    className={cn(
                      'text-sm',
                      idx === 0 ? 'text-violet-200' : 'text-violet-300'
                    )}
                    buttonClassName='text-violet-300 hover:text-violet-200'
                  >
                    {edu.description}
                  </ExpandableDescription>
                </div>
                <div className='min-w-8 relative flex flex-col items-center justify-center'>
                  <div className='min-h-5 min-w-5 h-5 w-5 rounded-full bg-violet-500' />
                  {educations.length > 1 && (
                    <div className={cn(
                      'min-h-1 absolute left-1/2 h-1/2 w-1 -translate-x-1/2 bg-violet-500',
                      idx === 0
                        ? 'top-1/2 bottom-0'
                        : idx === (educations.length - 1)
                          ? 'top-0 h-1/2!'
                          : 'top-1/2 -translate-y-1/2'
                    )} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-1 flex flex-col items-center gap-6 md:col-span-3'>
          <h3 className='w-fit text-xl text-violet-300'>{locale === 'en' ? 'Certifications' : 'Certificaciones'}</h3>
          <div className='flex flex-col max-md:w-full'>
            {certifications.length > 0
              ? certifications.map((cert, idx) => (
                <div key={idx} className='flex gap-2 max-md:w-full'>
                  <div className='min-w-8 relative flex flex-col items-center justify-center'>
                    <div className='min-h-5 min-w-5 h-5 w-5 rounded-full bg-violet-500' />
                    {certifications.length > 1 && (
                      <div className={cn(
                        'min-h-1 absolute left-1/2 h-1/2 w-1 -translate-x-1/2 bg-violet-500',
                        idx === 0
                          ? 'top-1/2 bottom-0'
                          : idx === (certifications.length - 1)
                            ? 'top-0 h-1/2!'
                            : 'top-1/2 -translate-y-1/2'
                      )} />
                    )}
                  </div>
                  <div className={cn(
                    'mb-4 flex w-full md:max-w-xs flex-col border-4 border-transparent gap-2 rounded-2xl p-4',
                    idx === 0 ? 'bg-fuchsia-400/60' : 'border-fuchsia-500'
                  )}>
                    <p className={cn(
                      'text-sm mb-2 sm:text-xs self-end',
                      idx === 0 ? 'text-fuchsia-200' : 'text-violet-400'
                    )}>
                      {`${cert.startDate} - ${cert.endDate}`}
                    </p>
                    <p className={cn(
                      'text-lg font-bold',
                      idx === 0 ? 'text-white' : 'text-violet-200'
                    )}>
                      {cert.gradeTitle}
                    </p>
                    {cert.url ? (
                      <Link href={cert.url} target='_blank' className={cn(
                        'text-sm font-bold',
                        idx === 0 ? 'text-fuchsia-200' : 'text-violet-300'
                      )}>
                        /{cert.company?.name} <LinkIcon className='inline-block h-4 w-4' />
                      </Link>
                    ): (
                      <p className={cn(
                        'text-sm font-bold',
                        idx === 0 ? 'text-fuchsia-200' : 'text-violet-300'
                      )}>
                      /{cert.company?.name}
                      </p>
                    )}
                    <p className={cn(
                      'text-sm line-clamp-4',
                      idx === 0 ? 'text-fuchsia-200' : 'text-violet-300'
                    )}>
                      {cert.description}
                    </p>
                  </div>
                </div>
              )) : (
                <p className='text-violet-300'>{locale === 'en' ? 'No certifications found' : 'No hay certificaciones'}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}