import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'text.primary',
    fontWeight: 'medium',
  },
  variants: {
    textXs: {
      fontSize: 'xs',
    },
    textSm: {
      fontSize: 'sm',
      color: 'text.secondary',
    },
    textMd: {
      fontSize: 'md',
    },
    textLg: {
      fontSize: 'lg',
      fontWeight: 'bold',
    },
    text3Xl: {
      fontSize: '3xl',
      fontWeight: 'bold',
      lineHeight: '12',
    },
    text4Xl: {
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: 'none',
      _hover: {
        color: 'primary.500',
      },
    },
    text5Xl: {
      whiteSpace: 'none',
      overflow: 'hidden',
      textOverflow: 'clip',
    },
  },
  defaultProps: {
    variant: 'textMd',
  },
});
