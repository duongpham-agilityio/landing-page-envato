import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { getNotifications, notificationHttpRequest } from '@/lib/services';

// Interfaces
import { TNotification } from '@/lib/interfaces';

export const useNotification = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.NOTIFICATION],
    queryFn: () => getNotifications(userId),
  });

  const { quantity, hasNewNotification } = data.reduce(
    (result, notification) => {
      if (!notification?.isMarkAsRead) {
        result.quantity += 1;
        result.hasNewNotification = true;
      }
      return result;
    },
    { quantity: 0, hasNewNotification: false },
  );

  const { mutate: deleteNotification, isPending: isDeleteNotification } =
    useMutation({
      mutationFn: async (
        payload: Partial<
          TNotification & { userId: string; notificationId: string }
        >,
      ) => {
        await notificationHttpRequest.delete(END_POINTS.NOTIFICATION, {
          data: payload,
        });
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.NOTIFICATION],
          (oldData: TNotification[]) =>
            oldData.filter((item) => item._id !== variables.notificationId),
        );
      },
    });

  const { mutate: updateNotification } = useMutation({
    mutationFn: async (
      transaction: Partial<
        TNotification & { userId: string; notificationId: string }
      >,
    ) =>
      await notificationHttpRequest.put<TNotification>(
        END_POINTS.NOTIFICATION,
        transaction,
      ),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.NOTIFICATION],
        (oldData: TNotification[]) => {
          const dataUpdated = oldData.map((item) =>
            item._id === variables.notificationId
              ? { ...item, isMarkAsRead: true }
              : item,
          );
          return dataUpdated;
        },
      );
    },
  });

  return {
    ...query,
    data,
    quantity,
    hasNewNotification,
    isDeleteNotification,
    deleteNotification,
    updateNotification,
  };
};
