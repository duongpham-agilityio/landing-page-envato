import { defineStyleConfig } from '@chakra-ui/react';

export const Spinner = defineStyleConfig({
  variants: {
    center: {
      animation: 'spinner 0.5s linear infinite',
      position: 'fixed',
      top: '50%',
      left: '50%',
    },
  },
});
