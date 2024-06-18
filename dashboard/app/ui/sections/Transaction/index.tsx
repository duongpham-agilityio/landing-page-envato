'use client';

import { InView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

// Hooks
import { useSubmitPinCode } from '@/lib/hooks';

// lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const BoxChat = dynamic(() => import('@/ui/components/BoxChat'));

const Transaction = () => {
  // Pin Code
  const {
    isLoadingPinCode,
    userPinCode,
    isPinCodeModalOpen,
    onTogglePinCodeModal,
    isShowBalance,
    onToggleShowBalance,
    onSubmitPinCode,
  } = useSubmitPinCode();

  return (
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
          <TransactionTable />
        </Box>
      </GridItem>
      <InView>
        {({ inView, ref }) => (
          <GridItem mt={{ base: 6, '2xl': 0 }} ref={ref}>
            <Flex
              direction={{ base: 'column', lg: 'row', xl: 'column' }}
              gap={6}
            >
              {inView && (
                <CardPayment
                  isLoadingPinCode={isLoadingPinCode}
                  userPinCode={userPinCode}
                  onSubmitPinCodeForm={onSubmitPinCode}
                  isPinCodeModalOpen={isPinCodeModalOpen}
                  onTogglePinCodeModal={onTogglePinCodeModal}
                  isShowBalance={isShowBalance}
                  onToggleShowBalance={onToggleShowBalance}
                />
              )}
              {inView && <BoxChat />}
            </Flex>
          </GridItem>
        )}
      </InView>
    </Grid>
  );
};

export default Transaction;
