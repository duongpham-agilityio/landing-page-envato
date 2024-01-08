export type TTheme = Record<string, string | Record<string, string>>;

type TButtonTheme = {
  baseStyle: TTheme;
  variants: Record<string, TTheme>;
};

export const button: TButtonTheme = {
  baseStyle: {
    fontFamily: 'font-primary',
    fontSize: 'text-lg',
    border: 'border-none',
    borderRadius: 'rounded-none',
    px: 'px-[7px]',
    backgroundColor: 'bg-sun',
    cursor: 'cursor-pointer',
  },
  variants: {
    primary: {
      lineHeight: 'leading-14',
      pt: 'pt-[25px]',
      pb: 'pb-5',
    },

    secondary: {
      lineHeight: 'leading-20',
      width: 'w-[280px]',
      height: 'h-[80px]',
    },
  },
};
