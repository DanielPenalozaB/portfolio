export const defaultLocale = 'en';
export const locales = [ 'en', 'es' ] as const;
export type Locale = typeof locales[number];