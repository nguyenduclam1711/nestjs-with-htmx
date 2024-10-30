import { FRONTEND_ROUTES } from 'src/constants/frontend-routes';
import { MenuProps } from 'src/views/components/menu';
import UserIcon from 'src/views/icons/user-icon';
import UserShieldIcon from 'src/views/icons/user-shield-icon';

export const ADMIN_AVATAR_DROPDOWN_MENU_ITEMS: MenuProps['items'] = [
  {
    title: 'Logout',
    id: 'logout-btn',
  },
];

export const ADMIN_MAIN_MENU_ITEMS: MenuProps['items'] = [
  {
    title: 'Users',
    href: FRONTEND_ROUTES.USERS,
    icon: <UserIcon />,
  },
  {
    title: 'User credentials',
    href: FRONTEND_ROUTES.USER_CREDENTIALS,
    icon: <UserShieldIcon />,
  },
];
