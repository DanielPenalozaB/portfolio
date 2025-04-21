'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { LoaderIcon } from '../icons/loader';
import { Locale } from '@/i18n/locales';
import { useLanguageStore } from '@/i18n/store';

const variantStyles = {
  fill: 'bg-violet-500 text-white hover:bg-violet-400 focus:bg-violet-600 disabled:bg-neutral-300 disabled:text-neutral-500',
  outline: 'border border-violet-500 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900 dark:border-violet-900 focus:bg-violet-200 disabled:border-violet-300 disabled:text-violet-300 dark:disabled:border-violet-900 dark:disabled:text-violet-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent',
  shades: 'bg-neutral-50 text-violet-500 hover:bg-violet-100 dark:bg-dark dark:hover:bg-violet-900 disabled:border-violet-300 disabled:text-violet-300 dark:disabled:border-violet-900 dark:disabled:text-violet-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent',
  text: 'text-violet-500hover:text-violet-400 focus:text-violet-600 disabled:text-violet-300',
  link: 'text-violet-500 hover:text-violet-400 focus:text-violet-600 disabled:text-violet-300'
};

const sizeStyles = {
  xs: 'px-3 py-2 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-base',
  xl: 'px-6 py-4 text-lg'
};

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: React.ReactNode;
	variant?: keyof typeof variantStyles;
	size?: keyof typeof sizeStyles;
	isLoading?: boolean;
	isDisabled?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	href?: string;
  locale?: Locale;
}

export default function Button({
  children,
  variant = 'fill',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  href,
  locale,
  ...props
}: ButtonProps) {
  const { currentLocale, getLocalizedPath } = useLanguageStore();
  const targetLocale = locale || currentLocale;
  const localizedHref = getLocalizedPath(href || '', targetLocale);
  const className = 'inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed';

  const { type = 'button', ...restProps } = props;

  if (typeof children === 'string') {
    restProps.title = restProps.title || children.toString();
  }

  if (href) {
    return (
      <Link
        href={localizedHref}
        className={`${className} ${variantStyles[variant]} ${sizeStyles[size]} ${restProps.className}`}
        title={restProps.title}
        rel="noopener noreferrer"
      >
        {isLoading && (
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <>{leftIcon}</>
        )}
        {children}
        {!isLoading && rightIcon && (
          <>{rightIcon}</>
        )}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      {...restProps}
      className={`${className} ${variantStyles[variant]} ${sizeStyles[size]} ${restProps.className}`}
    >
      {isLoading && (
        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!isLoading && leftIcon && (
        <>{leftIcon}</>
      )}
      {children}
      {!isLoading && rightIcon && (
        <>{rightIcon}</>
      )}
    </button>
  );
}