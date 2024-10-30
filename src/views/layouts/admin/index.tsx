import { ReactNode } from 'react';
import AdminLayoutNavbar from './admin-navbar';
import AdminLayoutMainMenu from './admin-main-menu';

export type AdminLayoutProps = {
  children: ReactNode;
  user: {
    name: string;
  };
  pageTitle: string;
  activeMenuHrefs?: {
    [href: string]: boolean;
  };
};
const AdminLayout = (props: AdminLayoutProps) => {
  const { children, user, pageTitle, activeMenuHrefs } = props;

  return (
    <div className="flex gap-4 h-screen">
      <AdminLayoutMainMenu activeMenuHrefs={activeMenuHrefs} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <AdminLayoutNavbar user={user} pageTitle={pageTitle} />
        <div className="py-4 bg-white p-4 rounded-box shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
