import type { TTheme } from '.';

type TButtonTheme = {
  baseStyle: TTheme;
  variants: Record<string, TTheme>;
};

export const toast: TButtonTheme = {
  baseStyle: {
    display: 'flex',
    position: 'fixed',
    width: ' w-[80%] sm:w-[400px]',
    top: 'top-10',
    left: 'left-[50%]',
    padding: 'p-1',
    'justify-content': 'justify-between',
    'align-item': 'items-center',
    'z-index': 'z-50',
    'translate-x': 'translate-x-[-50%]',
    'box-shadow': 'shadow-2xl',
    'border-radius': 'rounded-md',
  },
  variants: {
    success: {
      toastBg: 'bg-green-400',
      button: '#fff',
    },

    error: {
      toastBg: 'bg-red-400',
      button: '#000',
      text: 'text-white',
    },
  },
};
