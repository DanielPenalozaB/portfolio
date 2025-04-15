import cn from '@/utils/cn';
import { TitleShapeIcon } from './icons/title-shape';
import { EducationCertification } from '@/types/education-certifications';

const education: EducationCertification[] = [
  {
    educationTitle: 'Systems engineering',
    description: 'Software development, systems architecture, and project management.',
    institution: 'UNIAJC',
    startDate: 'January 2023',
    endDate: 'January 2026'
  }, {
    educationTitle: 'TADSI',
    description: 'Practical training in software development and database design.',
    institution: 'SENA',
    startDate: 'April 2020',
    endDate: 'March 2022'
  }
];

const certifications: EducationCertification[] = [];

export default function EducationCertifications() {
  return (
    <div className="rounded-4xl mx-2 max-w-6xl bg-gradient-to-tl from-violet-500 to-violet-900 p-8 sm:rounded-2xl lg:mx-auto lg:p-12">
      <div className="flex items-center">
        <TitleShapeIcon className="mr-2 h-6 w-6 text-violet-400" />
        <h2 className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-lg font-semibold text-transparent">
          Always Learning
        </h2>
      </div>
      <p className="text-pretty mt-2 text-2xl font-semibold tracking-tight text-neutral-200 sm:text-5xl">
        Degrees, courses, and skills that{' '}
        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          fuel my work.
        </span>
      </p>
      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-6 sm:mt-16">
        <div className='col-span-3 flex flex-col items-center gap-6'>
          <h3 className='w-fit text-xl text-violet-300'>Education</h3>
          <div className='flex flex-col'>
            {education.map((edu, idx) => (
              <div key={idx} className='flex w-full gap-2'>
                <div className={cn(
                  'mb-4 flex w-full max-w-xs flex-col border-4 border-transparent gap-2 rounded-2xl p-4',
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
                    {edu.educationTitle}
                  </p>
                  <p className={cn(
                    'text-sm font-bold',
                    idx === 0 ? 'text-violet-200' : 'text-violet-300'
                  )}>
                    /{edu.institution}
                  </p>
                  <p className={cn(
                    'text-sm',
                    idx === 0 ? 'text-violet-200' : 'text-violet-300'
                  )}>
                    {edu.description}
                  </p>
                </div>
                <div className='min-w-8 relative flex flex-col items-center justify-center'>
                  <div className='min-h-5 min-w-5 h-5 w-5 rounded-full bg-violet-500' />
                  <div className={cn(
                    'min-h-1 absolute left-1/2 h-full w-1 -translate-x-1/2 bg-violet-500',
                    idx === 0
                      ? 'top-1/2 bottom-0'
                      : idx === (education.length - 1)
                        ? 'top-0 h-1/2!'
                        : 'top-1/2 -translate-y-1/2'
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-3 flex flex-col items-center gap-6'>
          <h3 className='w-fit text-xl text-violet-300'>Certifications</h3>
          <div className='flex flex-col'>
            {certifications.length > 0
              ? certifications.map((cert, idx) => (
                <div key={idx} className='flex w-full gap-2'>
                  <div className='min-w-8 relative flex flex-col items-center justify-center'>
                    <div className='min-h-5 min-w-5 h-5 w-5 rounded-full bg-violet-500' />
                    <div className={cn(
                      'min-h-1 absolute left-1/2 h-full w-1 -translate-x-1/2 bg-violet-500',
                      idx === 0
                        ? 'top-1/2 bottom-0'
                        : idx === (certifications.length - 1)
                          ? 'top-0 h-1/2!'
                          : 'top-1/2 -translate-y-1/2'
                    )} />
                  </div>
                  <div className={cn(
                    'mb-4 flex w-full max-w-xs flex-col border-4 border-transparent gap-2 rounded-2xl p-4',
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
                      {cert.educationTitle}
                    </p>
                    <p className={cn(
                      'text-sm font-bold',
                      idx === 0 ? 'text-fuchsia-200' : 'text-violet-300'
                    )}>
                    /{cert.institution}
                    </p>
                    <p className={cn(
                      'text-sm',
                      idx === 0 ? 'text-fuchsia-200' : 'text-violet-300'
                    )}>
                      {cert.description}
                    </p>
                  </div>
                </div>
              )) : (
                <p className='text-violet-300'>No certifications yet.</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}