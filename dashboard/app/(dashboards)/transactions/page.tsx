import dynamic from 'next/dynamic';

const TransactionSection = dynamic(() => import('@/ui/sections/Transaction'));

const Transactions = () => <TransactionSection />;

export default Transactions;
