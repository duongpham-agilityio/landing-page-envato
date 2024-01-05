import { Heading, Skeleton as SkeletonChakra } from '@chakra-ui/react';
import { ReactElement, ReactNode, useMemo } from 'react';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

// Themes
import { skeletonSizes } from '@/ui/themes/components';

type TVariant = 'primary' | 'secondary';
type TFetchingProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  quality?: number;
  size?: keyof typeof skeletonSizes;
  variant?: TVariant;
  children?: ReactNode;
};

const PrimarySkeleton = ({
  size,
  quality,
}: {
  size: TFetchingProps['size'];
  quality: number;
}) =>
  Array.from({ length: quality }).map(
    (_, index: number): ReactElement => (
      <SkeletonChakra
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        bg="background.component.primary"
        rounded="lg"
        size={size}
        mt={3}
      />
    ),
  );

const Fetching = ({
  isLoading = false,
  isError = false,
  errorMessage = ERROR_MESSAGES.SOMETHING_ERROR,
  quality = 5,
  size = 'xs',
  variant = 'primary',
  children,
}: TFetchingProps): JSX.Element => {
  const skeleton: Record<TVariant, ReactElement> = useMemo(
    () => ({
      primary: <PrimarySkeleton size={size} quality={quality} />,
      secondary: (
        <SkeletonChakra
          bg="background.component.primary"
          rounded="lg"
          size={size}
        />
      ),
    }),
    [quality, size],
  );

  if (isError) {
    return (
      <Heading
        as="h3"
        color="text.primary"
        bgColor="background.body.secondary"
        rounded="lg"
        boxShadow="sm"
        p={4}
      >
        {errorMessage}
      </Heading>
    );
  }

  if (isLoading) {
    return skeleton[variant];
  }

  return <>{children}</>;
};

export default Fetching;
