import Menu from 'src/views/components/menu';
import { ADMIN_MAIN_MENU_ITEMS } from './constants';

type AdminLayoutMainMenuProps = {
  activeMenuHrefs?: {
    [href: string]: boolean;
  };
};
const AdminLayoutMainMenu = (props: AdminLayoutMainMenuProps) => {
  const { activeMenuHrefs = {} } = props;
  const getMenuItems = () => {
    return ADMIN_MAIN_MENU_ITEMS.map((menuItem) => {
      return {
        ...menuItem,
        active: activeMenuHrefs[menuItem.href!],
      };
    });
  };
  return (
    <Menu
      items={getMenuItems()}
      className="bg-white shrink-0 grow-0 basis-48"
    />
  );
};

export default AdminLayoutMainMenu;
