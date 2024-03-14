// Services
import { getProducts, productsHttpService } from '@/lib/services';

// Mocks
import { PRODUCTS } from '@/lib/mocks';

describe('Product service', () => {
  it('Get Product (resolve)', async () => {
    jest
      .spyOn(productsHttpService, 'get')
      .mockResolvedValue({ data: PRODUCTS });

    const products = await getProducts();

    expect(products).toEqual(products);
  });

  it('Get product (reject)', async () => {
    try {
      jest.spyOn(productsHttpService, 'get').mockRejectedValue({
        data: {
          isError: true,
        },
      });

      await getProducts();
    } catch (error) {
      const err = (error as unknown as { data: unknown }).data;

      expect(err).toEqual({
        isError: true,
      });
    }
  });
});
