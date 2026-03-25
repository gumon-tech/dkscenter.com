import React, { useEffect, useState } from 'react';
import {
  DEFAULT_THEME,
  normalizeThemePreference,
  resolveThemePreference,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
} from '../lib/theme';

function applyThemePreference(preference) {
  if (typeof window === 'undefined') return;

  const normalized = normalizeThemePreference(preference);
  const resolved = resolveThemePreference(
    normalized,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const root = document.documentElement;

  root.dataset.themePreference = normalized;
  root.dataset.theme = resolved;
  root.classList.toggle('dark', resolved === 'dark');
  window.localStorage.setItem(THEME_STORAGE_KEY, normalized);
}

export default function ThemeSwitcher({ language = 'th' }) {
  const [themePreference, setThemePreference] = useState(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const syncFromStorage = () => {
      const stored = normalizeThemePreference(
        window.localStorage.getItem(THEME_STORAGE_KEY),
      );
      setThemePreference(stored);
    };

    const handleMediaChange = () => {
      const stored = normalizeThemePreference(
        window.localStorage.getItem(THEME_STORAGE_KEY),
      );

      if (stored === 'system') {
        applyThemePreference('system');
      }
    };

    syncFromStorage();
    setMounted(true);

    window.addEventListener('storage', syncFromStorage);

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleMediaChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(handleMediaChange);
    }

    return () => {
      window.removeEventListener('storage', syncFromStorage);

      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleMediaChange);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(handleMediaChange);
      }
    };
  }, []);

  const copy =
    language === 'th'
      ? {
          options: {
            system: 'Default',
            light: 'Light',
            dark: 'Dark',
          },
        }
      : {
          options: {
            system: 'Default',
            light: 'Light',
            dark: 'Dark',
          },
        };

  return (
    <div className="flex items-start md:items-end">
      <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border/70 bg-surface/85 p-1.5 shadow-soft backdrop-blur-xl">
        {THEME_OPTIONS.map((option) => {
          const active = mounted && themePreference === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setThemePreference(option);
                applyThemePreference(option);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                active
                  ? 'bg-surface-elevated text-text shadow-soft ring-1 ring-primary/20'
                  : 'text-muted hover:bg-surface-elevated hover:text-text'
              }`}
              aria-pressed={active}
            >
              {copy.options[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
