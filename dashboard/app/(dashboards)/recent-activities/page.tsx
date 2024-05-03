import dynamic from 'next/dynamic';

const RecentActivitiesSection = dynamic(
  () => import('@/ui/sections/RecentActivities'),
);

const RecentActivitiesPage = () => <RecentActivitiesSection />;

export default RecentActivitiesPage;
