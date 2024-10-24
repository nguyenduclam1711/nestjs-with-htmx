import { ReactNode } from 'react';
import PageWrapper, { PageWrapperProps } from '../page-wrapper';
import AdminLayout from '../../layouts/admin';
import { ADMIN_PAGE_SCRIPTS } from './constant';
import { User } from 'src/schemas/users';

type AdminPageWrapperProps = {
  children: ReactNode;
  user: User;
  pageTitle: string;
  extraScripts?: PageWrapperProps['scripts'];
};
const AdminPageWrapper = (props: AdminPageWrapperProps) => {
  const { children, user, pageTitle, extraScripts = [] } = props;

  const pageScripts = [...ADMIN_PAGE_SCRIPTS, ...extraScripts];

  return (
    <PageWrapper title={pageTitle} scripts={pageScripts}>
      <AdminLayout user={user} pageTitle={pageTitle}>
        {children}
      </AdminLayout>
    </PageWrapper>
  );
};
export default AdminPageWrapper;
