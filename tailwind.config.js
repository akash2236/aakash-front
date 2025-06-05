/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEE8F8',
          100: '#D8C9EF',
          200: '#B69ADD',
          300: '#936BCC',
          400: '#7447BB',
          500: '#5A2CA9',
          600: '#4A248A',
          700: '#3A1F6D',
          800: '#2A174E',
          900: '#1A0F2F',
        },
        secondary: {
          50: '#E6F7FF',
          100: '#CCF0FF',
          200: '#99DAFF',
          300: '#66C4FF',
          400: '#33AEFF',
          500: '#0A84FF',
          600: '#086ACC',
          700: '#064F99',
          800: '#043566',
          900: '#021A33',
        },
        accent: {
          50: '#FFF5E6',
          100: '#FFEACC',
          200: '#FFD699',
          300: '#FFC166',
          400: '#FFAD33',
          500: '#FF9800',
          600: '#CC7A00',
          700: '#995C00',
          800: '#663D00',
          900: '#331F00',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        dark: {
          100: '#3A3A3C',
          200: '#2C2C2E',
          300: '#1C1C1E',
          400: '#0A0A0A',
        },
        light: {
          100: '#FFFFFF',
          200: '#F8FAFC',
          300: '#EFF1F5',
          400: '#E1E4EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.125rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'neumorphic-light': '10px 10px 20px #D1D9E6, -10px -10px 20px #FFFFFF',
        'neumorphic-dark': '8px 8px 16px #0D0D0D, -8px -8px 16px #292929',
        'glass-light': '0 8px 32px rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};