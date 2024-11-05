import Navbar from 'src/views/components/navbar';
import { AdminLayoutProps } from '.';
import Dropdown from 'src/views/components/dropdown';
import Avatar from 'src/views/components/avatar';
import AdminAvatarDropdownContent from './admin-avatar-dropdown-content';

type AdminLayoutNavbarProps = {
  user: AdminLayoutProps['user'];
  pageTitle: AdminLayoutProps['pageTitle'];
};
const AdminLayoutNavbar = (props: AdminLayoutNavbarProps) => {
  const { user, pageTitle } = props;

  const getAvatarPlaceholder = () => {
    const splitedName = user.name.split(/\s+/g);
    const firstChar = splitedName[0]?.[0];
    const secondChar = splitedName[1]?.[0];
    let result = firstChar;
    if (secondChar) {
      result += secondChar;
    }
    return result.toUpperCase();
  };

  return (
    <Navbar
      className="bg-white"
      startContent={<h1 className="text-xl pl-4">{pageTitle}</h1>}
      endContent={
        <Dropdown
          align="end"
          content={
            <AdminAvatarDropdownContent
              avatarPlaceholder={getAvatarPlaceholder()}
              userName={user.name}
            />
          }
          contentClassName="w-40"
        >
          <Avatar placeholder={getAvatarPlaceholder()} />
        </Dropdown>
      }
    />
  );
};

export default AdminLayoutNavbar;
