import { memo } from 'react';
import dynamic from 'next/dynamic';

const ProductsSection = dynamic(() => import('@/ui/sections/ProductsSection'));

const Products = () => <ProductsSection />;

const ProductsPage = memo(Products);

export default ProductsPage;
