import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { addMoneyToUser, sendMoneyToUser } from '@/lib/services';

// Types
import { EActivity, TAddMoney, TSendMoney } from '@/lib/interfaces';

// Constants
import { END_POINTS } from '@/lib/constants';

// Utils
import { handleLogActivity } from '../utils';

export const useMoney = () => {
  const queryClient = useQueryClient();

  const { mutate: addMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TAddMoney) => addMoneyToUser(userData),
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
    onSuccess: async () => {
      handleLogActivity('/', EActivity.ADD_MONEY);
    },
  });

  const { mutate: sendMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TSendMoney) => sendMoneyToUser(userData),
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
    onSuccess: async () => {
      handleLogActivity('/', EActivity.SEND_MONEY);
    },
  });

  return {
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
