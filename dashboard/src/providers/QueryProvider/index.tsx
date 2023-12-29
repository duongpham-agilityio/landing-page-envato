'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { memo, ReactNode } from 'react';

// Constants
import { DEFAULT_STALE_TIME } from '@app/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

type TQueryProvider = {
  children: ReactNode;
};

const QueryProviderComponent = ({ children }: TQueryProvider) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const QueryProvider = memo(QueryProviderComponent);

export default QueryProvider;
