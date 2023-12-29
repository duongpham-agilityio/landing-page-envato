// Libs
import { extendTheme, Tooltip } from '@chakra-ui/react';

// Bases theme
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from './bases';
// colors
import { colors } from './bases/colors';
// Metrics
import { radii, sizes, space } from './bases/metric';

// Components
import {
  Tag,
  Button,
  Checkbox,
  Drawer,
  FormError,
  Heading,
  Input,
  Text,
  Table,
  Badge,
  Skeleton,
  Spinner,
} from './components';
import { breakpoints } from './bases/breakpoints';

export const configThemes = {
  ...extendTheme({
    semanticTokens: {
      radii,
      space,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      colors,
      sizes,
    },
    breakpoints,
    components: {
      Tag,
      Text,
      Button,
      Checkbox,
      Heading,
      Input,
      FormError,
      Drawer,
      Table,
      Badge,
      Skeleton,
      Spinner,
    },
  }),
  styles: {
    global: {
      'html, body': {
        fontFamily: 'primary',
      },
    },
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
};

// Override the default properties of Tooltip component
Tooltip.defaultProps = { ...Tooltip.defaultProps, openDelay: 400 };
