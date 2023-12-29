import { defineStyleConfig } from '@chakra-ui/react';

export const Drawer = defineStyleConfig({
  variants: {
    clickThrough: {
      overlay: {
        pointerEvents: 'none',
        background: 'transparent',
        display: 'none',
      },

      dialogContainer: {
        pointerEvents: 'none',
        background: 'transparent',
      },

      dialog: {
        pointerEvents: 'auto',
      },
    },
  },
});
