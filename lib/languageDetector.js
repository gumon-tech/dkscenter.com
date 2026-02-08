// lib/languageDetector.js

import createLanguageDetector from 'next-language-detector';
import i18nextConfig from '../next-i18next.config.js';

const COOKIE_NAME = 'locale';
const ONE_YEAR = 60 * 60 * 24 * 365;

// detector เดิมจาก next-language-detector
const baseDetector = createLanguageDetector({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale,
});

function toCookieValue(locale) {
  if (locale === 'th') return 'th_TH';
  return 'en_US';
}

function setCookie(name, value) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
}

const languageDetector = {
  /**
   * ใช้ตอน user กดเปลี่ยนภาษา
   * - เรียก logic เดิม
   * - เขียน cookie สำหรับ root redirect (/)
   */
  cache: (locale) => {
    // 1) behavior เดิม (สำคัญ: อย่าทิ้ง)
    if (baseDetector.cache) {
      baseDetector.cache(locale);
    }

    // 2) เขียน cookie ให้ STEP 1 ใช้
    setCookie(COOKIE_NAME, toCookieValue(locale));
  },

  /**
   * passthrough method อื่น ๆ (ถ้ามีการเรียกใช้)
   */
  detect: (...args) =>
    baseDetector.detect ? baseDetector.detect(...args) : null,
};

export default languageDetector;
