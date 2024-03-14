import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useProducts } from '@/lib/hooks';

// Services
import * as services from '@/lib/services';

// Mocks
import { PRODUCTS } from '@/lib/mocks';

jest.mock('@/lib/services', () => ({
  getProducts: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('@/lib/hooks', () => {
  const originalModule = jest.requireActual('@/lib/hooks');
  return {
    ...originalModule,
    handleSort: jest.fn(),
  };
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProducts', () => {
  it('should fetch products and apply sorting and filtering', async () => {
    const getProductsSpy = jest.spyOn(services, 'getProducts');
    getProductsSpy.mockResolvedValue(PRODUCTS);

    const { result, rerender } = renderHook(
      () => useProducts({ name: 'Xbox one' }),
      { wrapper },
    );
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await rerender();

    expect(getProductsSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.sortBy('name');
    });

    expect(getProductsSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
  });
});
