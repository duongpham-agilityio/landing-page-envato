import { defineStyleConfig } from '@chakra-ui/react';

export const Heading = defineStyleConfig({
  baseStyle: {
    color: 'text.primary',
    fontWeight: 'semibold',
    fontFamily: 'primary',
  },
  variants: {
    headingLg: {
      fontSize: 'lg',
      fontWeight: 'bold',
    },
    headingXl: {
      fontSize: 'xl',
      fontWeight: 'bold',
    },
    heading2Xl: {
      fontSize: '2xl',
    },
    heading3Xl: {
      fontSize: '3xl',
      lineHeight: '9',
    },
    heading4Xl: {
      fontSize: '4xl',
      lineHeight: '10',
    },
  },
  defaultProps: {
    variant: 'headingXl',
  },
});
