import { useQuery } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { getUserWallet } from '@/lib/services';

export const useWallet = (id?: string) => {
  const { data: currentWalletMoney, ...query } = useQuery({
    queryKey: [END_POINTS.MY_WALLET, id],
    queryFn: () => getUserWallet(id),
  });

  return {
    ...query,
    currentWalletMoney,
  };
};
