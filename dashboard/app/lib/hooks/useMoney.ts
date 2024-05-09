import { useMutation, useQueryClient } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Hook
import { authStore } from '../stores';

// Services
import { MainHttpService } from '@/lib/services';

// Types
import {
  EActivity,
  TAddMoney,
  TRecentActivities,
  TSendMoney,
} from '@/lib/interfaces';

export const useMoney = () => {
  const { user } = authStore();
  const queryClient = useQueryClient();

  const { mutate: addMoneyToUserWallet } = useMutation({
    mutationFn: async (userData: TAddMoney) => {
      await MainHttpService.post<TRecentActivities>({
        path: END_POINTS.RECENT_ACTIVITIES,
        data: {
          userId: user?.id,
          actionName: EActivity.ADD_MONEY,
        },
      });

      return MainHttpService.put({
        path: END_POINTS.ADD_MONEY,
        data: userData,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.MY_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.NOTIFICATION],
      });
    },
  });

  const { mutate: sendMoneyToUserWallet } = useMutation({
    mutationFn: async (userData: TSendMoney) => {
      await MainHttpService.post<TRecentActivities>({
        path: END_POINTS.RECENT_ACTIVITIES,
        data: {
          userId: user?.id,
          actionName: EActivity.SEND_MONEY,
        },
      });

      return MainHttpService.put({
        path: END_POINTS.SEND_MONEY,
        data: userData,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.MY_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.NOTIFICATION],
      });
    },
  });

  return {
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
