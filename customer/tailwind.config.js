/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [require('@headlessui/tailwindcss')],
};
