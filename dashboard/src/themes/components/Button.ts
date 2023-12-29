import { defineStyleConfig } from '@chakra-ui/react';

// The default style for Button component
export const Button = defineStyleConfig({
  baseStyle: {
    py: 3,
    borderRadius: 'lg',
    _focus: {
      outline: 'none',
    },
  },
  sizes: {
    xs: {
      py: 3.5,
      px: 4,
      fontSize: 'md',
    },
    sm: {
      px: 7,
      fontSize: 'md',
    },
    md: {
      px: 10,
      fontSize: 'md',
      borderRadius: 'xl',
    },
    lg: {
      px: 11,
      fontSize: 'md',
      borderRadius: 'xl',
    },
    xl: {
      py: 4,
      fontSize: 'md',
      width: '100%',
    },
  },
  variants: {
    solid: {
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      backgroundColor: 'primary.500',
      _hover: {
        backgroundColor: 'primary.600',
      },
    },
    outline: {
      color: 'text.primary',
      fontWeight: 'medium',
      borderColor: 'border.primary',
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'transparent',
        borderColor: 'border.primary',
        outline: 'none',
      },
    },
    iconPrimary: {
      borderWidth: '1px',
      borderRadius: 'xl',
      _light: {
        borderColor: 'primary.600',
      },
      _dark: {
        borderColor: 'secondary.950',
      },
    },
    iconSecondary: {
      bg: 'transparent',
      w: 'fit-content',
      border: 'none',
      _hover: {
        bg: 'transparent',
        borderColor: 'none',
      },
    },
  },
  defaultProps: {
    size: 'xl',
    variant: 'solid',
  },
});
