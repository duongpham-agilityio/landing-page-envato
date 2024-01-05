import { Grid, GridItem, Skeleton } from '@chakra-ui/react';

type TotalListSkeletonProps = {
  quality?: number;
};

const TotalStatisticListSkeleton = ({
  quality = 3,
}: TotalListSkeletonProps) => (
  <Grid
    templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
    gap={6}
  >
    {Array.from({ length: quality }).map((_, index: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <GridItem key={`skeleton-${index}`}>
        <Skeleton bg="background.component.primary" rounded="lg" />
      </GridItem>
    ))}
  </Grid>
);

export default TotalStatisticListSkeleton;
