import dynamic from 'next/dynamic';
import { memo } from 'react';

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
import { prefetchStatistical } from '@/lib/utils';

// Lazy load components
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const BoxChat = dynamic(() => import('@/ui/components/BoxChat'));
const TotalStatisticList = dynamic(
  () => import('@/ui/components/TotalStatisticList'),
);
const RevenueFlow = dynamic(() => import('@/ui/components/RevenueFlow'));
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);

const DashboardPage = async () => {
  // Prefetch total statistics, revenue and efficiency data
  await prefetchStatistical<ISpendingStatistics[]>(END_POINTS.STATISTICS);
  await prefetchStatistical<IRevenueFlow[]>(END_POINTS.REVENUE);
  await prefetchStatistical<IEfficiency[]>(`${END_POINTS.EFFICIENCY}/weekly`);

  return (
    <Grid
      display={{ sm: 'block', md: 'grid' }}
      bg="background.body.primary"
      p={{ base: 6, xl: 12 }}
      templateColumns={{ base: 'repeat(1, 1fr)', '5xl': 'repeat(4, 1fr)' }}
      gap={0}
    >
      <GridItem colSpan={3}>
        <TotalStatisticList />

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          mt={6}
          gap={6}
        >
          <GridItem colSpan={{ base: 3, xl: 2 }}>
            <RevenueFlow />
          </GridItem>
          <GridItem display={{ base: 'none', xl: 'block' }}>
            <Efficiency />
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
            mt={{ base: 6, md: 0, '2xl': 6 }}
            ml={{ lg: 6, '2xl': 0 }}
          >
            <BoxChat />
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

const Dashboard = memo(DashboardPage);

export default Dashboard;
