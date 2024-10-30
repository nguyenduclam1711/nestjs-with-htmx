import { User } from 'src/schemas/users';
import AdminPageWrapper from 'src/views/commons/admin-page-wrapper';
import Table from 'src/views/components/table';
import { USER_CRENDETIALS_TABLE_COLUMNS } from './constants';
import { UserCredentialPageData } from 'src/schemas/user-credentials';
import { FRONTEND_ROUTES } from 'src/constants/frontend-routes';

type UserCredentialsPageProps = {
  currentUser: User;
  data: UserCredentialPageData;
};
const UserCredentialsPage = (props: UserCredentialsPageProps) => {
  const { currentUser: currentUser, data } = props;
  return (
    <AdminPageWrapper
      pageTitle="User credentials"
      user={currentUser}
      activeMenuHrefs={{
        [FRONTEND_ROUTES.USER_CREDENTIALS]: true,
      }}
    >
      <Table columns={USER_CRENDETIALS_TABLE_COLUMNS} dataSource={data} />
    </AdminPageWrapper>
  );
};

export default UserCredentialsPage;
