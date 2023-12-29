import { defineStyleConfig } from '@chakra-ui/react';

const COLOR_PRIMARY = 'danger.500';
const BACKGROUND_PRIMARY = 'background.component.tagPrimary';
const BACKGROUND_SECONDARY = 'background.component.tagSecondary';

export const Badge = defineStyleConfig({
  baseStyle: {
    px: 3,
    py: 1,
    textTransform: 'capitalize',
    fontSize: 'sm',
    fontWeight: 'medium',
    rounded: 'lg',
  },

  variants: {
    primary: {
      color: 'primary.500',
      backgroundColor: BACKGROUND_PRIMARY,
    },
    secondary: {
      color: COLOR_PRIMARY,
      backgroundColor: BACKGROUND_PRIMARY,
    },
    tertiary: {
      color: 'warning.800',
      backgroundColor: BACKGROUND_SECONDARY,
    },
    quaternary: {
      color: COLOR_PRIMARY,
      backgroundColor: BACKGROUND_SECONDARY,
    },
  },
});
