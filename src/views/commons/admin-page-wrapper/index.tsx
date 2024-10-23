import { ReactNode } from 'react';
import PageWrapper from '../page-wrapper';
import AdminLayout from '../../layouts/admin';
import { ADMIN_PAGE_SCRIPTS } from './constant';
import { User } from 'src/schemas/users';

type AdminPageWrapperProps = {
  children: ReactNode;
  user: User;
  pageTitle: string;
};
const AdminPageWrapper = (props: AdminPageWrapperProps) => {
  const { children, user, pageTitle } = props;

  return (
    <PageWrapper title={pageTitle} scripts={ADMIN_PAGE_SCRIPTS}>
      <AdminLayout user={user} pageTitle={pageTitle}>
        {children}
      </AdminLayout>
    </PageWrapper>
  );
};
export default AdminPageWrapper;
