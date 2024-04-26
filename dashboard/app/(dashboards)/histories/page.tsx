import { memo } from 'react';
import dynamic from 'next/dynamic';

const HistorySection = dynamic(() => import('@/ui/sections/History'));

const Histories = () => <HistorySection />;

const HistoryPage = memo(Histories);

export default HistoryPage;
