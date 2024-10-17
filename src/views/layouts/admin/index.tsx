import { ReactNode } from 'react';
import AdminLayoutNavbar from './admin-navbar';

export type AdminLayoutProps = {
  children: ReactNode;
  user: {
    name: string;
  };
  pageTitle: string;
};
const AdminLayout = (props: AdminLayoutProps) => {
  const { children, user, pageTitle } = props;
  return (
    <div className="flex">
      <div className="shrink-0 grow-0 basis-48">Menu here</div>
      <div className="flex-1 p-4">
        <AdminLayoutNavbar user={user} pageTitle={pageTitle} />
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
