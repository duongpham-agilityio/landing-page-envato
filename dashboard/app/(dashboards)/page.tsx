import lazy from 'next/dynamic';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Interface
import {
  IEfficiency,
  IRevenueFlow,
  ISpendingStatistics,
} from '@/lib/interfaces';

// Components
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';

// Utils
import { prefetchStatistical } from '@/lib/utils';

// Lazy load components
const CardPayment = lazy(() => import('@/ui/components/CardPayment'));
const BoxChat = lazy(() => import('@/ui/components/BoxChat'));
const TotalStatisticList = lazy(
  () => import('@/ui/components/TotalStatisticList'),
);
const RevenueFlow = lazy(() => import('@/ui/components/RevenueFlow'));
const Efficiency = lazy(() => import('@/ui/components/Efficiency'));
const TransactionTable = lazy(() => import('@/ui/components/TransactionTable'));

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  const queryClient = new QueryClient();
  // Prefetch total statistics, revenue and efficiency data

  await prefetchStatistical<ISpendingStatistics[]>(
    END_POINTS.STATISTICS,
    queryClient,
  );
  await prefetchStatistical<IRevenueFlow[]>(END_POINTS.REVENUE, queryClient);
  await prefetchStatistical<IEfficiency[]>(
    `${END_POINTS.EFFICIENCY}/weekly`,
    queryClient,
  );

  return (
    <Grid
      display={{ sm: 'block', md: 'grid' }}
      bg="background.body.primary"
      p={{ base: 6, xl: 12 }}
      templateColumns={{ base: 'repeat(1, 1fr)', '5xl': 'repeat(4, 1fr)' }}
      gap={0}
    >
      <GridItem colSpan={3}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TotalStatisticList />
        </HydrationBoundary>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          mt={6}
          gap={6}
        >
          <GridItem colSpan={{ base: 3, xl: 2 }}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <RevenueFlow />
            </HydrationBoundary>
          </GridItem>
          <GridItem display={{ base: 'none', xl: 'block' }}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Efficiency />
            </HydrationBoundary>
          </GridItem>
        </Grid>

        <Box
          mt={6}
          as="section"
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          {' '}
          <TransactionTable />
        </Box>
      </GridItem>
      <GridItem mt={{ base: 6, '5xl': 0 }} ml={{ '5xl': 12 }}>
        <Stack
          direction={{ base: 'column', lg: 'row', '2xl': 'column' }}
          spacing={{ base: 6, lg: 0 }}
        >
          <Box w="full">
            <CardPayment />
          </Box>

          <Box
            w="full"
            mt={{ base: 6, md: 0, '3xl': 6 }}
            ml={{ lg: 6, '2xl': 0 }}
          >
            <BoxChat />
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
