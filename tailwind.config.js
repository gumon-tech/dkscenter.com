const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        soft: 'var(--color-text-soft)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-muted': 'var(--color-surface-muted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        background: {
          light: '#f9fafb',
          dark: '#0f172a', // slate-900 느낌
        },
        surface: {
          light: '#f9fafb', // card / section
          dark: '#111827',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          dark: '#3b82f6',
        },
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        panel: 'var(--shadow-md)',
        floating: 'var(--shadow-lg)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      spacing: {
        section: 'var(--space-section)',
      },
      fontFamily: {
        sans: [
          '"IBM Plex Sans Thai Looped"',
          '"IBM Plex Sans"',
          'Noto Sans Thai',
          'system-ui',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        layout: '80rem',
      },
    },
    fontFamily: {
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-fontawesome'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
