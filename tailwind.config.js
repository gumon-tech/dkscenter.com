const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
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
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
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
