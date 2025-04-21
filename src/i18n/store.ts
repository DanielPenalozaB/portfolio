import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Locale, defaultLocale, locales } from './locales';

interface LanguageState {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  getLocalizedPath: (path: string, targetLocale?: Locale) => string;
}

export const useLanguageStore = create<LanguageState>()(persist(
  (set, get) => ({
    currentLocale: defaultLocale,

    setLocale: (locale: Locale) => {
      if (locales.includes(locale)) {
        set({ currentLocale: locale });
      }
    },

    getLocalizedPath: (path: string, targetLocale?: Locale) => {
      const locale = targetLocale || get().currentLocale;

      // Remove any existing locale from path
      const cleanPath = removeLocaleFromPath(path);

      // Don't add locale prefix for default locale
      if (locale === defaultLocale) {
        return cleanPath;
      }

      return `/${locale}${cleanPath}`;
    }
  }),
  {
    name: 'language-store',
    storage: createJSONStorage(() => sessionStorage)
  }
));

// Helper function to remove locale from path
function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);

  if (segments.length && locales.includes(segments[0] as Locale)) {
    return `/${  segments.slice(1).join('/')}`;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

// Export utility functions that can be used independently
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocale = segments[0];

  if (possibleLocale && locales.includes(possibleLocale as Locale)) {
    return possibleLocale as Locale;
  }

  return defaultLocale;
}