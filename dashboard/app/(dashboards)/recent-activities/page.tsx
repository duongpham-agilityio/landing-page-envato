import dynamic from 'next/dynamic';
import { memo } from 'react';

const RecentActivitiesSection = dynamic(
  () => import('@/ui/sections/RecentActivities'),
);

const RecentActivities = () => <RecentActivitiesSection />;

const RecentActivitiesPage = memo(RecentActivities);

export default RecentActivitiesPage;
