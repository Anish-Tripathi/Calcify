/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#eef3ff',
          100: '#dbe5ff',
          200: '#bfd1ff',
          300: '#93b4ff',
          400: '#608eff',
          500: '#3b64ff',
          600: '#2244f3',
          700: '#1a34e3',
          800: '#1d2cb7',
          900: '#1e2b8f',
          950: '#141a54',
        },
        cyan: {
          50: '#edfcff',
          100: '#d6f6fc',
          200: '#b4eefa',
          300: '#81e2f8',
          400: '#44cff0',
          500: '#1eb5da',
          600: '#0e91b9',
          700: '#0f7396',
          800: '#135e7a',
          900: '#144e67',
          950: '#093345',
        },
      },
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};