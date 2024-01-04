'use client';

import { MouseEvent, ReactNode, memo, useMemo } from 'react';
import { Link } from '@chakra-ui/next-js';
import { usePathname } from 'next/navigation';
import { useColorMode } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// constants
import { THEMES } from '@app/constants/themes';

export type TNavigationProps = {
  children: ReactNode;
  destination?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const COLOR = {
  LIGHT: {
    PRIMARY: 'primary.500',
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

const Navigation = ({
  children,
  destination = '/',
  onClick = () => {},
}: TNavigationProps) => {
  const pathname = usePathname();

  const { colorMode } = useColorMode();

  const activeStyle = useMemo(
    () =>
      `/${pathname?.slice(1)}` === destination
        ? colorMode === THEMES.LIGHT
          ? ACTIVE_LIGHT
          : ACTIVE_DARK
        : '',
    [colorMode, destination, pathname],
  );

  return (
    <>
      <Link
        href={destination}
        onClick={onClick}
        aria-label="navigate-item"
        _hover={ACTIVE_LIGHT}
        _dark={{
          svg: IDLE_DARK,
          _hover: ACTIVE_DARK,
          ...activeStyle,
        }}
        sx={{
          svg: ICON_TRANSITION,
          ...activeStyle,
        }}
      >
        {children}
      </Link>
    </>
  );
};

const NavigationComponent = memo(Navigation, isEqual);

export default NavigationComponent;
