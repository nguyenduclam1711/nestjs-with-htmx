import Menu from 'src/views/components/menu';
import { ADMIN_MAIN_MENU_ITEMS } from './constants';

const AdminLayoutMainMenu = () => {
  return (
    <Menu
      items={ADMIN_MAIN_MENU_ITEMS}
      className="bg-white shrink-0 grow-0 basis-48"
    />
  );
};

export default AdminLayoutMainMenu;
