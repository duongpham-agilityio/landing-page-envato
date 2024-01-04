import { ThemeOverride } from '@chakra-ui/react';
import { Urbanist, Poppins } from 'next/font/google';

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-urbanist',
});

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const fontFamilies = {
  urbanist,
  poppins,
};

export const fonts = {
  primary: `${urbanist.style.fontFamily}, sans-serif`,
  secondary: `${poppins.style.fontFamily}, sans-serif`,
};

export const fontSizes: ThemeOverride['fontSizes'] = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '36px',
};

export const fontWeights: ThemeOverride['fontWeights'] = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeights: ThemeOverride['lineHeights'] = {
  '4.5': '18px',
  '5': '20px',
  '6': '24px',
  '6.25': '25px',
  '7': '28px',
  '9': '36px',
  '10': '40px',
  '12': '48px',
};

export const letterSpacings: ThemeOverride['letterSpacings'] = {
  wide: '0.4px',
};
