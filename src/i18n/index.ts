import en from "./locales/en";
import es from "./locales/es";

export const languages = { en, es } as const;
export const defaultLocale = "en" as const;
export type Locale = keyof typeof languages;
export type TranslationKey = keyof typeof en;

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split("/");
  if (segment in languages) return segment as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return languages[locale][key] ?? languages[defaultLocale][key] ?? key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(en|es)/, "");
  if (locale === defaultLocale) return cleanPath || "/";
  return `/${locale}${cleanPath || ""}`;
}
