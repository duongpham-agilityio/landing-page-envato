import { defineStyleConfig } from '@chakra-ui/react';

const COLOR = {
  LIGHT: {
    PRIMARY: 'primary.200',
    SECONDARY: 'primary.900',
  },
  DARK: {
    PRIMARY: 'white',
    SECONDARY: 'primary.800',
    ALTERNATIVE: 'primary.600',
  },
};

const ACTIVE_LIGHT = {
  textDecoration: 'none',
  svg: {
    path: {
      '&.path-1': {
        fill: COLOR.LIGHT.PRIMARY,
      },
      '&.path-2': {
        fill: COLOR.LIGHT.SECONDARY,
      },
    },
    circle: {
      '&.path-2': {
        fill: COLOR.LIGHT.SECONDARY,
      },
    },
    ellipse: {
      '&.path-1': {
        fill: COLOR.LIGHT.PRIMARY,
      },
    },
  },
  '& p': {
    color: COLOR.LIGHT.PRIMARY,
  },
};

const IDLE_DARK = {
  path: {
    '&.path-1': {
      fill: COLOR.DARK.PRIMARY,
    },
    '&.path-2': {
      fill: COLOR.DARK.ALTERNATIVE,
    },
  },
  circle: {
    '&.path-1': {
      fill: COLOR.DARK.PRIMARY,
    },
  },
  ellipse: {
    '&.path-1': {
      fill: COLOR.DARK.PRIMARY,
    },
  },
};

const ACTIVE_DARK = {
  svg: {
    path: {
      '&.path-1': {
        fill: COLOR.DARK.SECONDARY,
      },
      '&.path-2': {
        fill: COLOR.DARK.ALTERNATIVE,
      },
    },
    circle: {
      '&.path-2': {
        fill: COLOR.DARK.ALTERNATIVE,
      },
    },
    ellipse: {
      '&.path-1': {
        fill: COLOR.DARK.SECONDARY,
      },
    },
  },
  '& p': {
    color: COLOR.LIGHT.PRIMARY,
  },
};

const ICON_TRANSITION = {
  path: {
    transition: 'all .25s ease-in-out',
  },
  circle: {
    transition: 'all .25s ease-in-out',
  },
  ellipse: {
    transition: 'all .25s ease-in-out',
  },
};

export const Link = defineStyleConfig({
  baseStyle: {
    textDecoration: 'none !important',
  },
  variants: {
    default: {
      _dark: {
        svg: IDLE_DARK,
      },
      sx: {
        svg: ICON_TRANSITION,
      },
    },

    primary: {
      _dark: Object.assign(
        {
          _hover: ACTIVE_DARK,
        },
        ACTIVE_DARK,
      ),
      _light: {
        ...ACTIVE_LIGHT,
      },
      sx: {
        svg: ICON_TRANSITION,
      },
    },
  },
});
