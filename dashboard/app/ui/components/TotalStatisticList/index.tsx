'use client';

import { memo } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import {
  Fetching,
  TotalStatisticCard,
  TotalStatisticListSkeleton,
} from '@/ui/components';

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { INITIAL_TOTAL_STATISTICS } from '@/lib/mocks';

// Providers
import { QueryProvider } from '@/ui/providers';

// Hooks
import { useGetStatistic } from '@/lib/hooks';

// Constants
import { END_POINTS } from '@/lib/constants';

const queryClient = new QueryClient();

const TotalStatisticListComponent = () => {
  const {
    data = INITIAL_TOTAL_STATISTICS,
    isLoading,
    isError,
  } = useGetStatistic<ISpendingStatistics[]>(END_POINTS.STATISTICS);

  if (isLoading) return <TotalStatisticListSkeleton />;

  return (
    <Fetching isError={isError} errorMessage="Total statistic data error">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {data.map(
          ({ title, total, growth, weeklyIncome }: ISpendingStatistics) => (
            <GridItem key={title}>
              <TotalStatisticCard
                title={title}
                total={total}
                growth={growth}
                weeklyIncome={weeklyIncome}
              />
            </GridItem>
          ),
        )}
      </Grid>
    </Fetching>
  );
};

const WrappedTotalStatisticList = () => (
  <QueryProvider>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TotalStatisticListComponent />
    </HydrationBoundary>
  </QueryProvider>
);

const TotalStatisticList = memo(WrappedTotalStatisticList);

export default TotalStatisticList;
