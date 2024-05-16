'use client';

// Libs
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

// Mocks
import { MOCK_EVENTS } from '@/lib/mocks';

// dynamic loading components
const Calendar = dynamic(() => import('@/ui/components/Calendar'));
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));

const CalendarSection = () => {
  // TODO: Update later
  const mockEvents = [...MOCK_EVENTS];

  // TODO: Update later
  const handleAddEvent = () => {};

  // TODO: Update later
  const handleUpdateEvent = () => {};

  return (
    <Grid
      bg="background.body.primary"
      py={12}
      px={{ base: 6, xl: 12 }}
      templateColumns={{ base: 'repeat(1, 1fr)', '2xl': 'repeat(4, 1fr)' }}
      display={{ sm: 'block', md: 'grid' }}
      gap={{ base: 0, '2xl': 12 }}
    >
      <InView>
        {({ inView, ref }) => (
          <GridItem colSpan={3} ref={ref}>
            {inView && (
              <Box
                as="section"
                bgColor="background.component.primary"
                borderRadius={8}
                px={10}
                py={5}
              >
                <Calendar
                  events={mockEvents}
                  onAddEvent={handleAddEvent}
                  onEditEvent={handleUpdateEvent}
                />
              </Box>
            )}
          </GridItem>
        )}
      </InView>
      <InView>
        {({ inView, ref }) => (
          <GridItem mt={{ base: 6, '2xl': 0 }} ref={ref}>
            {inView && (
              <Flex
                direction={{ base: 'column', lg: 'row', xl: 'column' }}
                gap={6}
              >
                <CardPayment />
              </Flex>
            )}
          </GridItem>
        )}
      </InView>
    </Grid>
  );
};

export default CalendarSection;
