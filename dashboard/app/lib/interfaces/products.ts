import { PRODUCT_STATUS } from '../constants';

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  stock: number;
  amount: string;
  currency: string;
  createdAt: string;
  imageURLs: string;
  productStatus: PRODUCT_STATUS;
};

export interface TProductRequest {
  _id: string;
  name: string;
  price: number;
  amount: number;
  stock: number;
  description?: string;
  currency?: string;
  createdAt?: string;
  imageURLs: string[];
}
