import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];

export const defaultLocale: Locale = 'zh';
export const locales: Locale[] = ['zh', 'en'];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
