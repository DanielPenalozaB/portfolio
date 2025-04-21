import { Locale, defaultLocale, locales } from './locales';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocale = segments[0];

  if (possibleLocale && isValidLocale(possibleLocale)) {
    return possibleLocale;
  }

  return defaultLocale;
}

export function createLocalizedPath(path: string, locale: Locale): string {
  // Remove any existing locale from path
  const pathWithoutLocale = removeLocaleFromPath(path);

  // Don't add locale prefix for default locale
  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }

  return `/${locale}${pathWithoutLocale}`;
}

export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);

  if (segments.length && isValidLocale(segments[0])) {
    return `/${  segments.slice(1).join('/')}`;
  }

  return path.startsWith('/') ? path : `/${path}`;
}