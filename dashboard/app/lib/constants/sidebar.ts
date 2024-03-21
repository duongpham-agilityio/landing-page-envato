// icons
import {
  DashboardIcon,
  HistoryIcon,
  InboxIcon,
  MyWalletIcon,
  ProductIcon,
  RecentActivityIcon,
  SettingIcon,
  SignOutIcon,
  SupportIcon,
  TransactionIcon,
  UserIcon,
} from '@/ui/components/Icons';

// Constants
import { AUTHENTICATION_ROLE, ROUTES } from '@/lib/constants';

export const MENU_ITEM_LIST = (role: string) => [
  {
    id: 1,
    leftIcon: DashboardIcon,
    menuItemContent: 'Dashboards',
    destination: '/',
  },
  {
    id: 2,
    leftIcon: TransactionIcon,
    menuItemContent: 'Transactions',
    destination: `/${ROUTES.TRANSACTION}`,
  },
  {
    id: 3,
    leftIcon: MyWalletIcon,
    menuItemContent: 'My Wallets',
    destination: `/${ROUTES.MY_WALLET}`,
  },

  {
    ...(role === AUTHENTICATION_ROLE.SUPER_ADMIN && {
      id: 4,
      leftIcon: InboxIcon,
      menuItemContent: 'Inbox',
      destination: `/${ROUTES.INBOX}`,
    }),
  },

  {
    ...(role === AUTHENTICATION_ROLE.SUPER_ADMIN && {
      id: 4,
      leftIcon: UserIcon,
      menuItemContent: 'Users',
      destination: `/${ROUTES.USER}`,
    }),
  },
  {
    id: 5,
    leftIcon: HistoryIcon,
    menuItemContent: 'Histories',
    destination: `/${ROUTES.HISTORY}`,
  },
  {
    id: 6,
    leftIcon: ProductIcon,
    menuItemContent: 'Products',
    destination: `/${ROUTES.PRODUCT}`,
  },
  {
    id: 7,
    leftIcon: RecentActivityIcon,
    menuItemContent: 'Recent Activities',
    destination: `/${ROUTES.RECENT_ACTIVITIES}`,
  },
];

export const HELP_ITEM_LIST = [
  {
    id: 5,
    leftIcon: SupportIcon,
    menuItemContent: 'Supports',
    destination: `/${ROUTES.SUPPORT}`,
  },
  {
    id: 6,
    leftIcon: SettingIcon,
    menuItemContent: 'Settings',
    destination: `/${ROUTES.SETTING}`,
  },
];

export const OTHER_ITEM_LIST = [
  {
    id: 7,
    leftIcon: SignOutIcon,
    menuItemContent: 'Sign Out',
    destination: `/${ROUTES.SIGN_OUT}`,
  },
];

export const SIDEBAR = {
  MINI_SIDEBAR_WIDTH: '96px',
  EXPAND_SIDEBAR_WIDTH: '308px',
};

export const EXPAND_SIDEBAR_MENU_LIST = (role: string) => [
  {
    id: 1,
    title: 'Menu',
    listItem: MENU_ITEM_LIST(role),
  },
  {
    id: 2,
    title: 'Help',
    listItem: HELP_ITEM_LIST,
  },
  {
    id: 3,
    title: 'Others',
    listItem: OTHER_ITEM_LIST,
  },
];

export const MINI_SIDEBAR_MENU = (role: string) => [
  {
    id: 14,
    title: 'Menu & Help',
    listItem: [...MENU_ITEM_LIST(role), ...HELP_ITEM_LIST],
  },
  {
    id: 15,
    title: 'Others',
    listItem: OTHER_ITEM_LIST,
  },
];
