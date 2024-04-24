// Libs
import { extendTheme, Tooltip } from '@chakra-ui/react';

// Bases
import {
  radii,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  colors,
  sizes,
  breakpoints,
} from './bases';

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
  Link,
  Select,
} from './components';

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
      Link,
      Menu: Select,
    },
  }),

  styles: {
    global: {
      'html, body': {
        fontFamily: 'primary',
      },
    },
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Override the default properties of Tooltip component
Tooltip.defaultProps = { ...Tooltip.defaultProps, openDelay: 400 };
