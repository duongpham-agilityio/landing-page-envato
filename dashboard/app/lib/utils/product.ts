import dayjs from 'dayjs';

// Types
import { TProduct } from '@/lib/interfaces';

// Utils
import {
  formatAmountNumber,
  formatDecimalNumber,
  formatUppercaseFirstLetter,
} from '.';

// Constants
import { IMAGES, PRODUCT_STATUS, TIME_FORMAT } from '../constants';

/**
 * Convert data show for home page
 * @param products
 * @returns
 */
export const formatProductResponse = (products: TProduct[] = []) =>
  products.map((product) => {
    const {
      _id,
      name,
      amount,
      currency,
      createdAt,
      description,
      imageURLs,
      stock,
    } = product;

    return {
      _id: _id,
      name: formatUppercaseFirstLetter(name),
      description: formatUppercaseFirstLetter(description),
      date: dayjs(createdAt).format(TIME_FORMAT),
      imageURLs: imageURLs || IMAGES.SIGN_UP.url,
      amount: `${currency}${formatDecimalNumber(+amount)}`,
      stock: `${formatAmountNumber(stock.toString())}`,
      productStatus: +stock > 0 ? PRODUCT_STATUS.IN_STOCK : PRODUCT_STATUS.SOLD,
      product: { ...product },
    };
  });
