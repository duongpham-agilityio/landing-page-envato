import { PRODUCT_STATUS } from '../constants';

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  stock: number;
  amount: number;
  currency: string;
  createdAt: string;
  imageURLs: string[];
  productStatus: PRODUCT_STATUS;
};

export interface TProductRequest {
  currentPage: number | undefined;
  limit: number | undefined;
  _id: string;
  name: string;
  amount: number;
  stock: number;
  description?: string;
  currency?: string;
  createdAt?: string;
  imageURLs: string[];
}

export interface TProductResponse extends TProduct {
  product: TProductRequest;
}
