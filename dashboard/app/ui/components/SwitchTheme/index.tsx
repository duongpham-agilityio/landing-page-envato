'use client';

import { ReactElement, memo } from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';

// Components
import { IconButton } from '@/ui/components';
import { DarkTheme, LightTheme } from '@/ui/components/Icons';

// Constants
import { THEMES } from '@/lib/constants';

// Themes
import { colors } from '@/ui/themes/bases';

const SwitchThemeComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icons: Record<ColorMode, ReactElement> = {
    light: <LightTheme color={colors.text.primary.default} />,
    dark: <DarkTheme color={colors.common.white} />,
  };

  const handleToggleColorMode = () => {
    toggleColorMode();
    document.cookie = `colormode=${
      colorMode === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    }`;
  };

  return (
    <IconButton ariaLabel="switch-theme" onClick={handleToggleColorMode}>
      {icons[colorMode]}
    </IconButton>
  );
};

const SwitchTheme = memo(SwitchThemeComponent);

export default SwitchTheme;
