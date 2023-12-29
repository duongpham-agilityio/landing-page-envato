import { defineStyleConfig } from '@chakra-ui/react';

// The default style for Checkbox component
export const Checkbox = defineStyleConfig({
  baseStyle: {
    control: {
      width: 5,
      height: 5,
      bg: 'white',
      _checked: {
        backgroundColor: 'primary.500',
        _hover: {
          backgroundColor: 'primary.500',
        },
        border: 'none',
      },
      borderRadius: 'md',
      borderColor: 'border.primary',
      borderWidth: '1px',
    },
    icon: {
      color: 'white',
      fontSize: 'xs',
    },
  },
  variants: {
    round: {
      control: {
        borderRadius: 'full',
      },
    },
  },
});
