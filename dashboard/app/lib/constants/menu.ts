// Constants
import { AUTHENTICATION_ROLE, ROUTES } from '@/lib/constants';

// Components
import { Account, Logout, UserIcon } from '@/ui/components/Icons';

export const MENU_LIST_ICON = (role?: string) => [
  {
    id: 1,
    href: `/${ROUTES.SETTING}`,
    value: 'My profile',
    icon: Account,
    hasDivider: false,
  },
  {
    ...(role === AUTHENTICATION_ROLE.SUPER_ADMIN && {
      id: 2,
      href: `/${ROUTES.USER}`,
      value: 'User',
      icon: UserIcon,
      hasDivider: false,
    }),
  },
  {
    id: 3,
    value: 'Logout',
    icon: Logout,
    hasDivider: true,
  },
];
