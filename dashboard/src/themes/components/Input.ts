import { defineStyleConfig } from '@chakra-ui/react';

const FOCUS_COLOR = 'primary.600';
const NO_COLOR = 'transparent';
const COLOR_TEXT = 'secondary.450';
const BG_DARK_THEME = 'background.component.secondary';
const ERROR_COLOR = 'red';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      height: '56px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: NO_COLOR,
      fontFamily: 'inherit',
      borderRadius: 'lg',
      color: 'text.secondary',
      fontSize: 'sm',
      fontWeight: 'medium',
      backgroundColor: BG_DARK_THEME,
      _invalid: {
        borderColor: ERROR_COLOR,
        _focus: {
          borderColor: ERROR_COLOR,
        },
        _dark: {
          borderColor: ERROR_COLOR,
          _focus: {
            borderColor: ERROR_COLOR,
          },
        },
      },
      _focus: {
        borderColor: FOCUS_COLOR,
      },
      _dark: {
        color: COLOR_TEXT,
        borderColor: BG_DARK_THEME,
        _focus: {
          borderColor: FOCUS_COLOR,
        },
      },
      _placeholder: {
        color: 'inherit',
      },
    },
  },

  variants: {
    primary: {
      field: {
        _placeholder: {
          fontWeight: 'bold',
        },
        _light: {
          color: COLOR_TEXT,
          backgroundColor: 'secondary.150',
          borderColor: NO_COLOR,
          _focus: {
            borderColor: FOCUS_COLOR,
          },
        },
      },
    },
    secondary: {
      field: {
        _placeholder: {
          fontWeight: 'bold',
        },
        color: COLOR_TEXT,
      },
    },

    authentication: {
      field: {
        borderColor: 'gray.200',
        color: 'secondary.450',
        backgroundColor: NO_COLOR,
        fontSize: 'md',
        _dark: {
          boxShadow: '0 0 0.8px',
          borderColor: 'secondary.450',
        },
      },
    },
    'no-focus': {
      field: {
        fontSize: 'md',
        px: 3,
        _focus: {
          borderColor: NO_COLOR,
        },
        _dark: {
          borderColor: NO_COLOR,
          _focus: {
            borderColor: NO_COLOR,
          },
        },
        backgroundColor: NO_COLOR,
      },
    },
  },

  defaultProps: {
    variant: 'primary',
  },
});
