import { User } from 'src/schemas/users';
import AdminPageWrapper from 'src/views/commons/admin-page-wrapper';
import { USERS_TABLE_ID } from './constants';
import UsersSearchForm from './search-form';
import { UsersSearchFormItemsProps } from './search-form-items';
import UsersTable from './table';

type UsersPageProps = {
  currentUser: User;
  data: User[];
  searchFormData?: UsersSearchFormItemsProps;
};
const UsersPage = (props: UsersPageProps) => {
  const { currentUser: currentUser, data, searchFormData } = props;
  return (
    <AdminPageWrapper pageTitle="Users" user={currentUser}>
      <UsersSearchForm {...searchFormData} />
      <div id={USERS_TABLE_ID}>
        <UsersTable data={data} />
      </div>
    </AdminPageWrapper>
  );
};

export default UsersPage;
