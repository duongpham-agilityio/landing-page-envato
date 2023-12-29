import { ThemeOverride } from '@chakra-ui/react';

export const fonts = {
  primary: 'Urbanist, sans-serif',
  secondary: 'Poppins, sans-serif',
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
