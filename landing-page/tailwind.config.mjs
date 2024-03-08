import plugin from 'tailwindcss/plugin';

// Themes
import {
  animation,
  boxShadow,
  colors,
  container,
  fontFamily,
  keyframes,
  lineHeight,
  screens,
  spacings,
} from './src/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      ...animation,
      ...boxShadow,
      ...colors,
      ...container,
      ...fontFamily,
      ...keyframes,
      ...lineHeight,
      ...screens,
      ...spacings,
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        '@font-face': {
          fontFamily: 'Helvetica',
          fontWeight: '400',
          src: 'url(/assets/fonts/HelveticaNeueRoman.woff2)',
          fontDisplay: 'swap',
        },
        '*, input': {
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.normal'),
        },
      });
    }),
  ],
};
