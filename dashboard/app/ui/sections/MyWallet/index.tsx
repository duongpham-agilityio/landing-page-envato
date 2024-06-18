'use client';

import dynamic from 'next/dynamic';
import { InView } from 'react-intersection-observer';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';

// Hooks
import { useSubmitPinCode } from '@/lib/hooks';

// Components
import { CardPayment, TotalBalance } from '@/ui/components';

// Lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
const OverallBalance = dynamic(() => import('@/ui/components/OverallBalance'));

const MyWallet = () => {
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
      px={{ base: 6, md: 12 }}
      py={12}
      templateColumns={{ base: 'repeat(1, 1fr)', '3xl': 'repeat(4, 1fr)' }}
      gap={{ base: 0, '2xl': 6 }}
      display={{ sm: 'block', xl: 'grid' }}
      minH="100vh"
    >
      <GridItem colSpan={1}>
        <Flex w="full" direction="column" gap={6}>
          <TotalBalance />
          <CardPayment
            isLoadingPinCode={isLoadingPinCode}
            userPinCode={userPinCode}
            onSubmitPinCodeForm={onSubmitPinCode}
            isPinCodeModalOpen={isPinCodeModalOpen}
            onTogglePinCodeModal={onTogglePinCodeModal}
            isShowBalance={isShowBalance}
            onToggleShowBalance={onToggleShowBalance}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 1, xl: 3 }} mt={{ base: 6, '3xl': 0 }}>
        <InView>
          {({ inView, ref }) => (
            <Flex direction="column" gap={6} ref={ref}>
              <Flex
                flex={1}
                gap={6}
                direction={{ base: 'column', xl: 'row' }}
                boxSizing="border-box"
                w="100%"
              >
                <Box w={{ '3xl': '65%' }} flex={2}>
                  {inView && <OverallBalance />}
                </Box>
                <Box w={{ '3xl': '35%' }} flex={1}>
                  {inView && <Efficiency />}
                </Box>
              </Flex>
              <Box>
                <Box
                  as="section"
                  bgColor="background.component.primary"
                  borderRadius={8}
                  px={6}
                  py={5}
                >
                  {inView && <TransactionTable />}
                </Box>
              </Box>
            </Flex>
          )}
        </InView>
      </GridItem>
    </Grid>
  );
};

export default MyWallet;
