import cn from '@/utils/cn';
import { CheckBadgeIcon } from '../icons/check-badge';
import Button from '../ui/button';
import { DynamicZone } from '@/types/strapi/shared/dynamic-zone';
import SectionHeading from '../strapi/section-heading';

export default function Services({ data }: { data: DynamicZone | undefined }) {
  if (!data) {
    return null;
  }

  const { heading, services } = data;

  return (
    <div className="mx-auto max-w-2xl px-8 py-32 lg:max-w-6xl lg:px-6">
      <SectionHeading
        title={heading?.title || 'Services'}
        description={heading?.description?.body}
      />
      <div className="mt-10 grid w-full max-w-6xl grid-cols-1 justify-center gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-1">
        {services && services.map((service) => (
          <div
            key={service.title}
            className={cn(
              'relative flex flex-col gap-2 justify-between overflow-hidden rounded-xl border border-neutral-300 p-6 text-neutral-800',
              service.title === 'Web Development' && 'bg-gradient-to-tr from-violet-400 to-fuchsia-400'
            )}
          >
            <div className='flex flex-col gap-2'>
              <div className={cn(
                'flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-lg font-semibold text-transparent z-10',
                service.title === 'Web Development' && 'text-white'
              )}>
                <svg viewBox="0 0 174 174" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn('h-5 w-5 stroke-violet-500')}>
                  <path d="M45.783 87.1704H9" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M45.783 87.1704H9" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M165.288 87.1704H128.557" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M165.288 87.1704H128.557" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M57.8875 116.4L31.917 142.423" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M57.8875 116.4L31.917 142.423" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M142.421 31.9185L116.398 57.889" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M142.421 31.9185L116.398 57.889" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M87.168 128.558V165.289" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M87.168 128.558V165.289" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M87.168 9V45.7831" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M87.168 9V45.7831" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M116.398 116.4L142.421 142.423" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M116.398 116.4L142.421 142.423" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M31.917 31.9185L57.8875 57.889" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                  <path d="M31.917 31.9185L57.8875 57.889" stroke={service.title === 'Web Development' ? '#FFF' : '#8e51ff'} strokeWidth="16.5549" strokeMiterlimit="10" strokeLinecap="round" fill={service.title === 'Web Development' ? '#FFF' : '#8e51ff'}></path>
                </svg>
                <h2>{service.title}</h2>
              </div>
              <p className={cn(
                'text-xl font-semibold text-inherit z-10',
                service.title === 'Web Development' && 'text-neutral-100'
              )}>{service.description}</p>
              <ul className={cn(
                'mt-4 flex flex-col gap-2 z-10',
                service.title === 'Web Development' && 'text-neutral-100'
              )}>
                {service.items && service.items.map((item) => (
                  <li key={item.id} className='flex items-start text-sm'>
                    <CheckBadgeIcon className={cn('min-h-5 min-w-5 mr-2 h-5 w-5', service.title === 'Web Development' ? 'text-violet-200' : 'text-violet-500')} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant='outline' className={cn(
              'z-10 mt-4',
              service.title === 'Web Development' ? 'border-white! bg-white! hover:bg-neutral-100!' : 'border-violet-500! hover:text-white! hover:bg-violet-500!'
            )}>
              {service.locale === 'en' ? 'Get a quote' : 'Obtener una cotización'}
            </Button>
            <svg viewBox="0 0 82 82" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='absolute -bottom-16 -right-16 z-0 h-64 w-64 opacity-5'>
              <path fillRule="evenodd" clipRule="evenodd" d="M35.3877 35.3708L4.37455 19.7856L33.7141 39.5853L19.3871 38.5181L32.9883 40.6041L0 51.526L34.7311 44.7833L23.8694 54.139L34.963 45.9957L19.3506 77.0631L39.1489 47.7256L38.0845 62.0153L40.1663 48.441L51.0909 81.4376L44.339 46.6589L53.7054 57.533L45.6039 46.4964L76.628 62.0871L47.2315 42.249L61.5816 43.3179L48.0793 41.2471L81.0026 30.3467L46.1728 37.1085L57.0993 27.697L46.0886 35.7794L61.652 4.80961L41.8125 34.2081L42.8842 19.8207L40.8093 33.3501L29.9117 0.435059L36.6642 35.2172L27.2633 24.303L35.3877 35.3708Z" fill={service.title === 'Web Development' ? '#FFF' : '#e12afb'} stroke={service.title === 'Web Development' ? '#FFF' : '#e12afb'}></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M35.3877 35.3708L4.37455 19.7856L33.7141 39.5853L19.3871 38.5181L32.9883 40.6041L0 51.526L34.7311 44.7833L23.8694 54.139L34.963 45.9957L19.3506 77.0631L39.1489 47.7256L38.0845 62.0153L40.1663 48.441L51.0909 81.4376L44.339 46.6589L53.7054 57.533L45.6039 46.4964L76.628 62.0871L47.2315 42.249L61.5816 43.3179L48.0793 41.2471L81.0026 30.3467L46.1728 37.1085L57.0993 27.697L46.0886 35.7794L61.652 4.80961L41.8125 34.2081L42.8842 19.8207L40.8093 33.3501L29.9117 0.435059L36.6642 35.2172L27.2633 24.303L35.3877 35.3708Z" fill={service.title === 'Web Development' ? '#FFF' : '#e12afb'} stroke={service.title === 'Web Development' ? '#FFF' : '#e12afb'}></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
