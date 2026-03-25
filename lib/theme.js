export const THEME_STORAGE_KEY = 'dks-theme-preference';
export const THEME_OPTIONS = ['system', 'light', 'dark'];
export const DEFAULT_THEME = 'system';

export function normalizeThemePreference(value) {
  return THEME_OPTIONS.includes(value) ? value : DEFAULT_THEME;
}

export function resolveThemePreference(preference, prefersDark) {
  const normalized = normalizeThemePreference(preference);
  return normalized === 'system'
    ? prefersDark
      ? 'dark'
      : 'light'
    : normalized;
}

export function getThemeInitScript() {
  return `
    (function () {
      var storageKey = '${THEME_STORAGE_KEY}';
      var root = document.documentElement;
      var media = window.matchMedia('(prefers-color-scheme: dark)');

      function normalize(value) {
        return value === 'light' || value === 'dark' || value === 'system'
          ? value
          : '${DEFAULT_THEME}';
      }

      function apply(preference) {
        var resolved = preference === 'system'
          ? (media.matches ? 'dark' : 'light')
          : preference;

        root.dataset.themePreference = preference;
        root.dataset.theme = resolved;
        root.classList.toggle('dark', resolved === 'dark');
      }

      var stored = normalize(window.localStorage.getItem(storageKey));
      apply(stored);

      var handleChange = function () {
        if ((root.dataset.themePreference || stored) === 'system') {
          apply('system');
        }
      };

      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', handleChange);
      } else if (typeof media.addListener === 'function') {
        media.addListener(handleChange);
      }
    })();
  `;
}
