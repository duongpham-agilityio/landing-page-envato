import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export const renderQueryProviderTest = (component: JSX.Element) => {
  const { render } = testLibReactUtils;
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

export const queryProviderWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
