// libs
import { useContext, useMemo, useCallback } from 'react';

// Constant
import { THEMES } from '../../../../dashboard/app/lib/constants/themes';

// Components
import { SunIcon, MoonIcon } from '@app/components/icons';
import Button from '@app/components/Button/index';
import { ThemeContext } from '@app/context/ThemeContext';

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Assigning variable to determine if the theme is dark or light
  const isDarkTheme = useMemo(() => theme === THEMES.DARK, [theme]);

  // UseMemo is used to prevent unnecessary re-renders
  const icon = useMemo(() => !isDarkTheme ? <SunIcon /> : <MoonIcon />, [isDarkTheme]);

  // Handle theme change when clicked 
  const handleChange = useCallback(() => setTheme(isDarkTheme ? THEMES.LIGHT : THEMES.DARK), [setTheme, isDarkTheme]);

  return (
      <Button className="!p-0 bg-transparent" onClick={handleChange} aria-label="Switch Theme">
        {icon}
      </Button>
  );
};
export default SwitchTheme;
