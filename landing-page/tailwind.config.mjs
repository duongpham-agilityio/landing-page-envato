import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screen: {
        xs: "320px",
        // => @media (min-width: 375px) { ... }
      },
      fontFamily: {
        primary: ['Helvetica', 'sans-serif'],
      },
      lineHeight: {
        xs: "13px", 
        sm: "18px",  
        base: "21px", 
        md: "23px", 
        lg: "26px", 
        xl: "30px", 
        huge: "31px", 
        giant: "47px", 

      },
      colors: {
        primary: "#242424",
        secondary: "#131212",
        elementary: "#6b6b6b",
        average: "#252525",
        sparingly: "#6d6d6d",
        little: "#b3b1b1",
        once: "#212529",
        onceAll: "#6c757d",

      },
      backgroundColor: {
        sun: "#fbb710",
        iridium: "#3c3c3c",
        desertStorm: "#f5f7fa",
        few: "#3c3c3cb3",
      },

    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'Helvetica',
          fontWeight: '400',
          src: 'url(/assets/fonts/Helvetica-Neue-Regular.woff2)',
          fontDisplay: 'swap',
        },
      });
    }),
  ],
};
