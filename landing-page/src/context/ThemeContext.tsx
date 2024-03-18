// Libs
import { createContext, useState, type ReactNode, useEffect, useCallback } from 'react';

// Constant
import { THEMES } from './../../../dashboard/app/lib/constants/themes';
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

interface AppProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.LIGHT,
} as ThemeContextType);

const ThemeProvider = ({ children }: AppProps) => {
  const currentTheme =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

  const [theme, setTheme] = useState<string>(currentTheme || THEMES.DARK);

  const changeCurrentTheme = useCallback((newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}, [setTheme]);

  useEffect(() => {
    if (theme === THEMES.LIGHT) document.body.classList.remove(THEMES.DARK);
    else document.body.classList.add(THEMES.DARK);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
