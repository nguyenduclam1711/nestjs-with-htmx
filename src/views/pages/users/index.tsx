import { SearchUsers, User } from 'src/schemas/users';
import AdminPageWrapper from 'src/views/commons/admin-page-wrapper';
import { USERS_EXTRA_SCRIPTS, USERS_TABLE_ID } from './constants';
import UsersSearchForm from './search-form';
import { UsersSearchFormItemsProps } from './search-form-items';
import UsersTable from './table';
import { FRONTEND_ROUTES } from 'src/constants/frontend-routes';
import UsersCreateButton from './create-button';
import UsersCreateModal from './create-modal';
import UsersUpdateModal from './update-modal';

type UsersPageProps = {
  currentUser: User;
  data: SearchUsers;
  searchFormData?: UsersSearchFormItemsProps;
  page: number;
  total: number;
};
const UsersPage = (props: UsersPageProps) => {
  const { currentUser: currentUser, data, searchFormData, page, total } = props;
  return (
    <AdminPageWrapper
      pageTitle="Users"
      user={currentUser}
      activeMenuHrefs={{
        [FRONTEND_ROUTES.USERS]: true,
      }}
      extraScripts={USERS_EXTRA_SCRIPTS}
    >
      <div className="flex justify-between">
        <UsersSearchForm
          {...{
            ...searchFormData,
            page,
          }}
        />
        <UsersCreateButton />
        <UsersCreateModal />
      </div>
      <div id={USERS_TABLE_ID}>
        <UsersTable
          data={data}
          page={page}
          total={total}
          name={searchFormData?.name}
          email={searchFormData?.email}
        />
      </div>
      <UsersUpdateModal />
    </AdminPageWrapper>
  );
};

export default UsersPage;
