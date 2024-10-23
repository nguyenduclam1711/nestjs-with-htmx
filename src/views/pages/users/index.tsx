import { User } from 'src/schemas/users';
import AdminPageWrapper from 'src/views/commons/admin-page-wrapper';
import Table from 'src/views/components/table';
import { USERS_TABLE_COLUMNS } from './constants';

type UsersPageProps = {
  currentUser: User;
  data: User[];
};
const UsersPage = (props: UsersPageProps) => {
  const { currentUser: currentUser, data } = props;
  return (
    <AdminPageWrapper pageTitle="Users" user={currentUser}>
      <Table columns={USERS_TABLE_COLUMNS} dataSource={data} />
    </AdminPageWrapper>
  );
};

export default UsersPage;
