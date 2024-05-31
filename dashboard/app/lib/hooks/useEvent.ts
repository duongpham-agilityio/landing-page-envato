// Libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { END_POINTS, DEFAULT_PAGE } from '@/lib/constants';

// Types
import {
  AddEventPayload,
  AddEventResponse,
  DeleteEventPayload,
  EActivity,
  TEventsResponse,
  UpdateEventPayload,
} from '@/lib/interfaces';

// Utils
import { logActivity } from '@/lib/utils';

// Services
import { mainHttpService } from '@/lib/services';

// Stores
import { authStore } from '@/lib/stores';

export const useEvents = () => {
  const queryClient = useQueryClient();
  const user = authStore((state) => state.user);

  const { id: userId = '' } = user || {};

  // Get events
  const { data: res, ...query } = useQuery<AxiosResponse<TEventsResponse>>({
    queryKey: [END_POINTS.EVENT, userId],
    queryFn: () =>
      mainHttpService.get<TEventsResponse>({
        path: END_POINTS.EVENT,
        userId,
        page: DEFAULT_PAGE,
      }),
  });

  const { result = [], totalPage = 0 } = res?.data || {};

  // Add an event
  const { mutate: addEvent, isPending: isAddEvent } = useMutation({
    mutationFn: async (eventData: AddEventPayload) =>
      (
        await mainHttpService.post<AddEventResponse>({
          path: END_POINTS.EVENT,
          data: eventData,
          userId,
          actionName: EActivity.ADD_EVENT,
          onActivity: logActivity,
        })
      ).data,
    onSuccess: (dataResponse: AddEventResponse) => {
      const newData = dataResponse;

      queryClient.setQueryData(
        [END_POINTS.EVENT, userId],
        (oldData: AxiosResponse<TEventsResponse>) => {
          const { data } = oldData;
          const { result } = data;

          const dataUpdated = {
            ...data,
            result: [newData, ...result],
          };

          return { data: dataUpdated };
        },
      );
    },
  });

  // Update event
  const { mutate: updateEvent, isPending: isUpdateEvent } = useMutation({
    mutationFn: (eventData: UpdateEventPayload) =>
      mainHttpService.put({
        path: END_POINTS.EVENT,
        data: eventData,
        userId,
        actionName: EActivity.UPDATE_EVENT,
        onActivity: logActivity,
      }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.EVENT, userId],
        (oldData: AxiosResponse<TEventsResponse>) => {
          const { data } = oldData;
          const { result: events } = data;

          const updatedEvents = events.map((item) => {
            const { _id: itemId } = item;
            const { eventId, eventName, startTime, endTime } = variables;

            return itemId === eventId
              ? {
                  ...item,
                  eventName,
                  startTime,
                  endTime,
                }
              : item;
          });

          const updatedData = {
            ...data,
            result: updatedEvents,
          };

          return { data: updatedData };
        },
      );
    },
  });

  // Delete event
  const { mutate: deleteEvent, isPending: isDeleteEvent } = useMutation({
    mutationFn: (payload: DeleteEventPayload) =>
      mainHttpService.delete({
        path: END_POINTS.EVENT,
        data: { data: payload },
        userId,
        actionName: EActivity.DELETE_EVENT,
        onActivity: logActivity,
      }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.EVENT, userId],
        (oldData: AxiosResponse<TEventsResponse>) => {
          const { data } = oldData;
          const { result: events } = data;

          const updatedEvents = events.filter((item) => {
            const { _id: itemId } = item;
            const { eventId } = variables;

            return itemId !== eventId;
          });

          const updatedData = {
            ...data,
            result: updatedEvents,
          };

          return { data: updatedData };
        },
      );
    },
  });

  return {
    ...query,
    data: result,
    totalPage,
    isAddEvent,
    addEvent,
    isUpdateEvent,
    updateEvent,
    isDeleteEvent,
    deleteEvent,
  };
};
