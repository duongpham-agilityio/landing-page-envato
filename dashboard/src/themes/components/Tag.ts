import { defineStyleConfig } from '@chakra-ui/react';

const COLOR_PRIMARY = 'danger.500';
const BACKGROUND_PRIMARY = 'background.component.tagPrimary';
const BACKGROUND_SECONDARY = 'background.component.tagSecondary';

// The default style for Button component
export const Tag = defineStyleConfig({
  baseStyle: {
    border: 'none',
  },
  variants: {
    primary: {
      container: {
        color: 'primary.500',
        backgroundColor: BACKGROUND_PRIMARY,
      },
    },
    secondary: {
      container: {
        color: COLOR_PRIMARY,
        backgroundColor: BACKGROUND_PRIMARY,
      },
    },
    tertiary: {
      container: {
        color: 'warning.800',
        backgroundColor: BACKGROUND_SECONDARY,
      },
    },
    quaternary: {
      container: {
        color: COLOR_PRIMARY,
        backgroundColor: BACKGROUND_SECONDARY,
      },
    },
  },
  defaultProps: {
    size: 'xl',
    variant: 'primary',
  },
});
