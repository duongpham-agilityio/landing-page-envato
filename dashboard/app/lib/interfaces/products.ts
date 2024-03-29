import { PRODUCT_STATUS } from '../constants';

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  stock: string;
  amount: string;
  currency: string;
  createdAt: string;
  imageURLs: string[];
  productStatus: PRODUCT_STATUS;
};

export interface TProductRequest {
  _id: string;
  name: string;
  amount: string;
  stock: string;
  limit?: number;
  currentPage?: number;
  description?: string;
  currency?: string;
  createdAt?: string;
  imageURLs?: string[];
}

export interface TProductResponse extends TProduct {
  product: TProductRequest;
}
