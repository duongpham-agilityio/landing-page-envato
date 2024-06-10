'use client';

// Libs
import dynamic from 'next/dynamic';

// Stores
import { authStore } from '@/lib/stores';

const CheckPinCode = dynamic(() => import('@/ui/providers/CheckPinCode'));

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = authStore((state) => state.user);

  return (
    <>
      {children}
      {!user?.pinCode && <CheckPinCode />}
    </>
  );
};

export default Layout;
