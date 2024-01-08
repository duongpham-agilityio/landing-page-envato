import dynamic from 'next/dynamic';
import { QueryProvider } from '@/ui/providers';
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';

// Lazy load components
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const BoxChat = dynamic(() => import('@/ui/components/BoxChat'));
const TotalStatisticList = dynamic(
  () => import('@/ui/components/TotalStatisticList'),
  { ssr: false },
);
const RevenueFlow = dynamic(() => import('@/ui/components/RevenueFlow'), {
  ssr: false,
});
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'), {
  ssr: false,
});
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);

const Dashboard = () => (
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
          <QueryProvider>
            <Efficiency />
          </QueryProvider>
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
        <QueryProvider>
          <TransactionTable />
        </QueryProvider>
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
export default Dashboard;
