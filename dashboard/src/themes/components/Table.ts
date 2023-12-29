import { defineStyleConfig } from '@chakra-ui/react';

const BORDER_RADIUS = 'lg';
const BG_NO_COLOR = 'transparent';

export const Table = defineStyleConfig({
  variants: {
    secondary: {
      tr: {
        _odd: {
          bgColor: 'background.component.table.primary',
        },
        _even: {
          bgColor: BG_NO_COLOR,
        },

        'td:first-child': {
          borderTopLeftRadius: BORDER_RADIUS,
          borderBottomLeftRadius: BORDER_RADIUS,
        },

        'td:last-child': {
          borderTopRightRadius: BORDER_RADIUS,
          borderBottomRightRadius: BORDER_RADIUS,
        },
      },
      table: {
        bgColor: BG_NO_COLOR,
      },
    },
  },
});
