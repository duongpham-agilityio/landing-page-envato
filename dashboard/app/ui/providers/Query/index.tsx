'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { memo, ReactNode } from 'react';
import { useState } from 'react';

// Constants
import { DEFAULT_STALE_TIME } from '@/lib/constants';

type TQueryProvider = {
  children: ReactNode;
};

const QueryProviderComponent = ({ children }: TQueryProvider) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: DEFAULT_STALE_TIME,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const QueryProvider = memo(QueryProviderComponent);

export default QueryProvider;
