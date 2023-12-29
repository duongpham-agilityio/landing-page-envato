import { defineStyleConfig } from '@chakra-ui/react';

export const skeletonSizes: Record<
  'xs' | 'sm' | 'md' | 'lg',
  Record<string, number>
> = {
  xs: {
    h: 14,
  },
  sm: {
    h: 180,
  },
  md: {
    h: 320,
  },
  lg: {
    h: 390,
  },
};

export const Skeleton = defineStyleConfig({
  sizes: skeletonSizes,

  defaultProps: {
    size: 'sm',
  },
});
