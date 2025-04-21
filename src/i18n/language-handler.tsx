'use client';

import React, { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguageStore, getLocaleFromPathname } from './store';
import { Locale } from './locales';

interface LanguageHandlerProps {
  children: React.ReactNode;
}

export default function LanguageHandler({ children }: LanguageHandlerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentLocale, setLocale, getLocalizedPath } = useLanguageStore();

  // Initialize locale from URL on mount and when pathname changes
  useEffect(() => {
    const pathLocale = getLocaleFromPathname(pathname);

    // Only update if the locale in the URL doesn't match the current state
    if (pathLocale !== currentLocale) {
      setLocale(pathLocale);
    }
  }, [ pathname, currentLocale, setLocale ]);

  // Export a function to change locale that can be used by components
  const changeLocale = useCallback((newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    setLocale(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  }, [ currentLocale, setLocale, getLocalizedPath, pathname, router ]);

  // Add the changeLocale function to the window for global access
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).changeLocale = changeLocale;
  }, [ changeLocale ]);

  return (
    <React.Fragment>{children}</React.Fragment>
  );
}

export function useLocaleChange() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLocale, setLocale, getLocalizedPath } = useLanguageStore();

  return {
    currentLocale,
    changeLocale: (newLocale: Locale) => {
      if (newLocale === currentLocale) return;

      setLocale(newLocale);
      const newPath = getLocalizedPath(pathname, newLocale);
      router.push(newPath);
    }
  };
}