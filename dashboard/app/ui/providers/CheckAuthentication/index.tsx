'use client';

import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/lib/constants';
import { TAuthStoreData, authStore } from '@/lib/stores';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Utils
import { getCookie } from '@/lib/utils';

// Hooks
import { useAuth } from '@/lib/hooks';

type TValidateRoute = {
  id?: number;
  path?: string;
};

const CheckAuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const user = authStore((state): TAuthStoreData['user'] => state.user);
  const { signOut } = useAuth();

  const { role = '' } = user || {};

  const isMatchPrivateRoute: boolean = PRIVATE_ROUTES(role).some(
    (route: TValidateRoute) =>
      pathname === ROUTES.ROOT || `/${route.path}` === pathname,
  );
  const isMatchPublicRoute: boolean = PUBLIC_ROUTES.some(
    (route: TValidateRoute) => `/${route.path}` === pathname,
  );

  useEffect(() => {
    const userId = getCookie('userId');

    if (!!user && (isMatchPublicRoute || !isMatchPrivateRoute)) {
      return redirect(ROUTES.ROOT);
    }

    if (isMatchPrivateRoute && !user) {
      return redirect(ROUTES.LOGIN);
    }

    if (!userId) {
      signOut();
    }
  }, [isMatchPrivateRoute, isMatchPublicRoute, signOut, user]);

  return children;
};

export default CheckAuthenticationProvider;
