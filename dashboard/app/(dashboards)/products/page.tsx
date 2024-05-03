import dynamic from 'next/dynamic';

const ProductsSection = dynamic(() => import('@/ui/sections/Products'));

const ProductsPage = () => <ProductsSection />;

export default ProductsPage;
