const siteUrlFromEnv = globalThis.process?.env?.NEXT_PUBLIC_SITE_URL;

export const SITE_NAME = 'DKS Center';
export const SITE_DESCRIPTION =
  'Digital Knowledge Sharing Center for practical technology training and community learning.';
export const SITE_URL = siteUrlFromEnv || 'https://dkscenter.gumon.io';

export const MAIN_NAVIGATION = [
  { key: 'home', href: '/' },
  { key: 'course', href: '/course' },
  { key: 'schedule', href: '/schedule' },
  { key: 'about-us', href: '/about-us' },
];

export const FOOTER_NAVIGATION = [
  { key: 'home', href: '/' },
  { key: 'course', href: '/course' },
  { key: 'schedule', href: '/schedule' },
];

export const LEGAL_NAVIGATION = [
  { key: 'about-us', href: '/about-us' },
  { key: 'privacy', href: '/privacy' },
];

export const SOCIAL_LINKS = [
  { key: 'facebook', href: 'https://www.facebook.com/dks.share' },
  { key: 'line', href: 'https://lin.ee/fnl0CuL' },
  { key: 'youtube', href: 'https://www.youtube.com/@dkscenter' },
  { key: 'email', href: 'mailto:sales@dkscenter.com' },
];
