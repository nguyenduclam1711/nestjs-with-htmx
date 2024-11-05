import Menu from 'src/views/components/menu';
import { ADMIN_AVATAR_DROPDOWN_MENU_ITEMS } from './constants';
import Avatar from 'src/views/components/avatar';

type AdminAvatarDropdownContentProps = {
  avatarPlaceholder: string;
  userName: string;
};
const AdminAvatarDropdownContent = (props: AdminAvatarDropdownContentProps) => {
  const { avatarPlaceholder, userName } = props;
  return (
    <div>
      <div className="flex gap-2 items-center p-4">
        <Avatar placeholder={avatarPlaceholder} />
        <span>{userName}</span>
      </div>
      <Menu items={ADMIN_AVATAR_DROPDOWN_MENU_ITEMS} />
    </div>
  );
};

export default AdminAvatarDropdownContent;
