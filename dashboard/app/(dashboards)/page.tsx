import {
  BoxChat,
  CardPayment,
  Efficiency,
  RevenueFlow,
  TotalStatisticList,
  TransactionTable,
} from '@/ui/components';
import { QueryProvider } from '@/ui/providers';
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';

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

      {/* Transactions table */}
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
