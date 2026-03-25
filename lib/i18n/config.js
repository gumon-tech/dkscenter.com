import i18nextConfig from '../../next-i18next.config';

export const i18nConfig = i18nextConfig.i18n;
export const locales = i18nConfig.locales;
export const defaultLocale = i18nConfig.defaultLocale;

export function normalizeLocale(locale) {
  return locales.includes(locale) ? locale : defaultLocale;
}

export function toOpenGraphLocale(locale) {
  return normalizeLocale(locale) === 'th' ? 'th_TH' : 'en_US';
}

export function getAlternateLocales(locale) {
  return locales.filter((item) => item !== normalizeLocale(locale));
}
