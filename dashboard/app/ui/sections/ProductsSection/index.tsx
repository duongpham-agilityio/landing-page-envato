'use client';
import { InView } from 'react-intersection-observer';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import lazy from 'next/dynamic';

// dynamic loading components
const ProductsTable = dynamic(() => import('@/ui/components/ProductsTable'));

// lazy loading components
const CardPayment = lazy(() => import('@/ui/components/CardPayment'));
const BoxChat = lazy(() => import('@/ui/components/BoxChat'));

const ProductsSection = () => (
  <Grid
    bg="background.body.primary"
    py={12}
    px={{ base: 6, xl: 12 }}
    templateColumns={{ base: 'repeat(1, 1fr)', '2xl': 'repeat(4, 1fr)' }}
    display={{ sm: 'block', md: 'grid' }}
    gap={{ base: 0, '2xl': 12 }}
  >
    <GridItem colSpan={3}>
      <Box
        as="section"
        bgColor="background.component.primary"
        borderRadius={8}
        px={6}
        py={5}
      >
        <ProductsTable />
      </Box>
    </GridItem>
    <InView>
      {({ inView, ref }) => (
        <GridItem mt={{ base: 6, '2xl': 0 }} ref={ref}>
          <Flex direction={{ base: 'column', lg: 'row', xl: 'column' }} gap={6}>
            {inView && <CardPayment />}
            {inView && <BoxChat />}
          </Flex>
        </GridItem>
      )}
    </InView>
  </Grid>
);

export default ProductsSection;
