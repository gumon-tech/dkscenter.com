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
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-muted': 'var(--color-surface-muted)',
        'surface-glass': 'var(--color-surface-glass)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        soft: 'var(--color-text-soft)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          soft: 'var(--color-primary-soft)',
        },
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        panel: 'var(--shadow-md)',
        floating: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
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
        'section-sm': 'var(--space-section-sm)',
        'section-lg': 'var(--space-section-lg)',
      },
      fontFamily: {
        sans: [
          '"Inter"',
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
        content: '72rem',
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
