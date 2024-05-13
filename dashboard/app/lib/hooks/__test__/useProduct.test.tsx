import { waitFor, renderHook } from '@testing-library/react';

// Hooks
import { useProducts } from '@/lib/hooks';

// Services
import { mainHttpService } from '@/lib/services';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  PRODUCTS,
  MOCK_PRODUCTS_SUCCESS_RES,
  MOCK_ADD_PRODUCT_PAYLOAD,
  MOCK_UPDATE_SUCCESS_RES,
  MOCK_DELETE_PRODUCT_PAYLOAD,
  MOCK_UPDATE_PRODUCT_PAYLOAD,
  MOCK_ADD_PRODUCT_SUCCESS_RES,
} from '@/lib/mocks';

describe('useProducts', () => {
  beforeEach(() => {
    jest
      .spyOn(mainHttpService, 'get')
      .mockResolvedValue(MOCK_PRODUCTS_SUCCESS_RES);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(PRODUCTS));
  });

  it('should reset page successfully', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.setCurrentPage(2);
      result.current.resetPage();
    });

    await waitFor(() => expect(result.current.currentPage).toEqual(1));
  });

  it('should sort product successfully', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.sortBy('name');
    });

    await waitFor(() =>
      expect(result.current.data).toEqual(result.current.data),
    );
  });

  it('should add product successfully', async () => {
    jest
      .spyOn(mainHttpService, 'post')
      .mockResolvedValue(MOCK_ADD_PRODUCT_SUCCESS_RES);

    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    result.current.createProduct(MOCK_ADD_PRODUCT_PAYLOAD);

    await waitFor(() =>
      expect(jest.spyOn(mainHttpService, 'post')).toHaveBeenCalled(),
    );
  });

  it('should delete product successfully', async () => {
    jest
      .spyOn(mainHttpService, 'delete')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const expectedData = PRODUCTS.filter(
      (item) => item._id !== MOCK_DELETE_PRODUCT_PAYLOAD.productId,
    );

    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    result.current.deleteProduct(MOCK_DELETE_PRODUCT_PAYLOAD);

    await waitFor(() => expect(result.current.data).toEqual(expectedData));
  });

  it('should update transactions successfully if have that item in cache', async () => {
    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    result.current.updateProduct(MOCK_UPDATE_PRODUCT_PAYLOAD);

    await waitFor(() => expect(mainHttpService.put).toHaveBeenCalled());
  });

  it('should update product successfully if have that item not in cache', async () => {
    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useProducts(), {
      wrapper: queryProviderWrapper,
    });

    result.current.updateProduct({
      ...MOCK_UPDATE_PRODUCT_PAYLOAD,
      productId: '1',
    });

    await waitFor(() => expect(result.current.data).toEqual(PRODUCTS));
  });
});
