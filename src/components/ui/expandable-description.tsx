'use client';

import { useState } from 'react';
import cn from '@/utils/cn';
import { ChevronIcon } from '../icons/chevron';
import { Locale } from '@/i18n/locales';

interface ExpandableDescriptionProps {
  children: string | undefined;
  className?: string;
  buttonClassName?: string;
  maxLength?: number;
  maxLines?: number;
  expandButtonClassName?: string;
  locale?: Locale;
}

export default function ExpandableDescription({
  children,
  className,
  buttonClassName,
  maxLength = 150,
  maxLines = 4,
  expandButtonClassName,
  locale
}: ExpandableDescriptionProps) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  if (!children) return null;

  const shouldShowButton = children.length > maxLength;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <p className={cn(
        !isExpanded && `line-clamp-${maxLines}`,
        className
      )}>
        {children}
      </p>
      {shouldShowButton && (
        <button
          onClick={toggleExpand}
          className={cn(
            'flex items-center mt-1 text-xs font-medium cursor-pointer',
            expandButtonClassName || 'text-neutral-600 hover:text-neutral-900',
            buttonClassName
          )}
        >
          {isExpanded ? (
            <>{locale === 'en' ? 'View less' : 'Ver menos'} <ChevronIcon className="ml-1 h-3 w-3" /></>
          ) : (
            <>{locale === 'en' ? 'View more' : 'Ver más'} <ChevronIcon className="ml-1 h-3 w-3 rotate-180" /></>
          )}
        </button>
      )}
    </div>
  );
}