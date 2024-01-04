export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  currency: string;
  imageURLs: string[];
  amount: number;
  stock: number;
  createdAt: number;
  updatedAt: number;
}
