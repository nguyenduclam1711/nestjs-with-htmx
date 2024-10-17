import AdminPageWrapper from 'src/views/commons/admin-page-wrapper';

type UsersPageProps = {
  user: {
    name: string;
  };
};
const UsersPage = (props: UsersPageProps) => {
  const { user } = props;
  return (
    <AdminPageWrapper pageTitle="Users" user={user}>
      Nung chua
    </AdminPageWrapper>
  );
};

export default UsersPage;
