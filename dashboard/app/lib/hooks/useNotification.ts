import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { MainHttpService } from '@/lib/services';

// Interfaces
import { TNotification } from '@/lib/interfaces';

export const useNotification = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data, ...query } = useQuery<{ data: TNotification[] }>({
    queryKey: [END_POINTS.NOTIFICATION],
    queryFn: () =>
      MainHttpService.get({
        path: END_POINTS.NOTIFICATION,
        userId: userId,
      }),
  });

  const notificationData: TNotification[] = data?.data || [];

  const { quantity, hasNewNotification } = notificationData.reduce(
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
        await MainHttpService.delete({
          path: END_POINTS.NOTIFICATION,
          data: {
            data: payload,
          },
        });
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.NOTIFICATION],
          (oldData: { data: TNotification[] }) => ({
            data: oldData.data.filter(
              (item) => item._id !== variables.notificationId,
            ),
          }),
        );
      },
    });

  const { mutate: updateNotification } = useMutation({
    mutationFn: async (
      transaction: Partial<
        TNotification & { userId: string; notificationId: string }
      >,
    ) =>
      await MainHttpService.put<TNotification>({
        path: END_POINTS.NOTIFICATION,
        data: transaction,
      }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.NOTIFICATION],
        (oldData: { data: TNotification[] }) => ({
          data: oldData.data.map((item) =>
            item._id === variables.notificationId
              ? { ...item, isMarkAsRead: true }
              : item,
          ),
        }),
      );
    },
  });

  return {
    ...query,
    data,
    notificationData,
    quantity,
    hasNewNotification,
    isDeleteNotification,
    deleteNotification,
    updateNotification,
  };
};
