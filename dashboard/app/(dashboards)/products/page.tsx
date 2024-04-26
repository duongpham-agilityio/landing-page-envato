import { memo } from 'react';
import dynamic from 'next/dynamic';

const ProductsSection = dynamic(() => import('@/ui/sections/Products'));

const Products = () => <ProductsSection />;

const ProductsPage = memo(Products);

export default ProductsPage;
