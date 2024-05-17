// Libs
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// Constants
import { END_POINTS, DEFAULT_PAGE } from '@/lib/constants';

// Types
import {
  AddEventPayload,
  AddEventResponse,
  EActivity,
  TEventsResponse,
} from '@/lib/interfaces';

// Utils
import { logActivity } from '@/lib/utils';

// Services
import { mainHttpService } from '@/lib/services';

// Stores
import { authStore } from '@/lib/stores';

export const useGetEvents = () => {
  const user = authStore((state) => state.user);

  const { id: userId = '' } = user || {};

  const { data: res, ...rest } = useQuery<AxiosResponse<TEventsResponse>>({
    queryKey: [END_POINTS.EVENT, userId],
    queryFn: () =>
      mainHttpService.get<TEventsResponse>({
        path: END_POINTS.EVENT,
        userId,
        page: DEFAULT_PAGE,
      }),
  });

  const { result = [], totalPage = 0 } = res?.data || {};

  return {
    data: result,
    totalPage,
    ...rest,
  };
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const { user } = authStore();

  const { id: userId = '' } = user || {};

  const {
    mutate: addEvent,
    isPending: isAddProduct,
    ...rest
  } = useMutation({
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
          const { data } = oldData || {};
          const { result = [] } = data || {};

          const dataUpdated = {
            ...data,
            result: [newData, ...result],
          };

          return { data: dataUpdated };
        },
      );
    },
  });

  return {
    ...rest,
    isAddProduct,
    addEvent,
  };
};
