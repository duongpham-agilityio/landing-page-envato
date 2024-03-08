import { ProductsSection } from '@/ui/sections';
import { memo } from 'react';

export const dynamic = 'force-dynamic';

const Products = () => <ProductsSection />;

const ProductsPage = memo(Products);

export default ProductsPage;
