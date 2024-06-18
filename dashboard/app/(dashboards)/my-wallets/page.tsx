import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import lazy from 'next/dynamic';

// Type
import { IEfficiency, TOverallBalance } from '@/lib/interfaces';

// Constants
import { END_POINTS } from '@/lib/constants';

// Utils
import { prefetch } from '@/lib/utils';

const MyWalletSection = lazy(() => import('@/ui/sections/MyWallet'));

const MyWallets = async () => {
  const queryClient = new QueryClient();

  await prefetch<IEfficiency[]>(`${END_POINTS.EFFICIENCY}/weekly`, queryClient);

  await prefetch<TOverallBalance>(END_POINTS.OVERALL_BALANCE, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyWalletSection />
    </HydrationBoundary>
  );
};

export default MyWallets;
