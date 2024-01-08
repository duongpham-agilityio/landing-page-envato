// Themes
import { type TTheme } from '@app/themes/components';

export const getStyles = (objStyle?: TTheme): string => {
  const DARK_KEY = '_dark';
  const LIGHT_KEY = '_light';
  const lightPrefix: string = 'light:';
  const darkPrefix: string = 'dark:';

  const baseStyle: string = Object.entries(objStyle ?? {})
    .map(([styleKey, styleValue]) => {
      const convertStyle = (prefix: string): string =>
        `${prefix}${Object.values(styleValue).join(` ${prefix}`)}`;

      if (typeof styleValue === 'object') {
        if (styleKey === LIGHT_KEY) return convertStyle(lightPrefix);

        if (styleKey === DARK_KEY) return convertStyle(darkPrefix);
        return '';
      }

      return styleValue;
    })
    .join(' ');

  return baseStyle;
};
