'use client';

// Libs
import { useCallback, useMemo } from 'react';
import { Box, Flex, Grid, GridItem, useToast } from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import moment from 'moment';

// Hooks
import {
  useAddEvent,
  useGetEvents,
  useUpdateEvent,
  useDeleteEvent,
} from '@/lib/hooks';

// Store
import { authStore } from '@/lib/stores';

// Types
import { TEvent } from '@/lib/interfaces';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Utils
import { customToast } from '@/lib/utils';

// Components
import { Indicator } from '@/ui/components';

// dynamic loading components
const Calendar = dynamic(() => import('@/ui/components/Calendar'));
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));

const CalendarSection = () => {
  const toast = useToast();

  // Auth Store
  const { user } = authStore();

  // Fetch events
  const { data: events = [], isLoading: isLoadingEvents } = useGetEvents();

  // Add event
  const { isAddEvent, addEvent } = useAddEvent();

  // Update event
  const { isUpdateEvent, updateEvent } = useUpdateEvent();

  // Delete Event
  const { deleteEvent, isDeleteEvent } = useDeleteEvent();

  const { id: userId = '' } = user || {};

  const formattedEvents = useMemo(
    () =>
      events.map((event) => {
        const { eventName = '', startTime = '', endTime = '' } = event || {};

        return {
          ...event,
          title: eventName,
          start: moment(startTime).toDate(),
          end: moment(endTime).toDate(),
        };
      }),
    [events],
  );

  const handleAddEventSuccess = useCallback(() => {
    toast(
      customToast(
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      ),
    );
  }, [toast]);

  const handleAddEventError = useCallback(() => {
    toast(
      customToast(
        ERROR_MESSAGES.CREATE_EVENT_FAIL.title,
        ERROR_MESSAGES.CREATE_EVENT_FAIL.description,
        STATUS.ERROR,
      ),
    );
  }, [toast]);

  const handleAddEvent = useCallback(
    (data: Omit<TEvent, '_id'>) => {
      const payload = {
        ...data,
        userId,
      };

      addEvent(payload, {
        onSuccess: handleAddEventSuccess,
        onError: handleAddEventError,
      });
    },
    [addEvent, handleAddEventError, handleAddEventSuccess, userId],
  );

  const handleUpdateEventSuccess = useCallback(() => {
    toast(
      customToast(
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      ),
    );
  }, [toast]);

  const handleUpdateEventError = useCallback(() => {
    toast(
      customToast(
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.title,
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.description,
        STATUS.ERROR,
      ),
    );
  }, [toast]);

  const handleUpdateEvent = useCallback(
    (data: TEvent) => {
      const payload = {
        ...data,
        userId,
        eventId: data._id,
      };

      updateEvent(payload, {
        onSuccess: handleUpdateEventSuccess,
        onError: handleUpdateEventError,
      });
    },
    [handleUpdateEventError, handleUpdateEventSuccess, updateEvent, userId],
  );

  const handleDeleteEventSuccess = useCallback(() => {
    toast(
      customToast(
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      ),
    );
  }, [toast]);

  const handleDeleteEventError = useCallback(() => {
    toast(
      customToast(
        ERROR_MESSAGES.DELETE_EVENT_FAIL.title,
        ERROR_MESSAGES.DELETE_EVENT_FAIL.description,
        STATUS.ERROR,
      ),
    );
  }, [toast]);

  const handleDeleteEvent = useCallback(
    (eventId: string) => {
      const payload = {
        userId,
        eventId,
      };

      deleteEvent(payload, {
        onSuccess: handleDeleteEventSuccess,
        onError: handleDeleteEventError,
      });
    },
    [deleteEvent, handleDeleteEventError, handleDeleteEventSuccess, userId],
  );

  return (
    <Indicator
      isOpen={isLoadingEvents || isAddEvent || isUpdateEvent || isDeleteEvent}
    >
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
                    events={formattedEvents}
                    onAddEvent={handleAddEvent}
                    onEditEvent={handleUpdateEvent}
                    onDeleteEvent={handleDeleteEvent}
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
    </Indicator>
  );
};

export default CalendarSection;
