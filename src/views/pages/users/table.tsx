import Table from 'src/views/components/table';
import { USERS_TABLE_COLUMNS } from './constants';
import { User } from 'src/schemas/users';

type UsersTableProps = {
  data: User[];
};
const UsersTable = (props: UsersTableProps) => {
  const { data } = props;
  return <Table columns={USERS_TABLE_COLUMNS} dataSource={data} />;
};

export default UsersTable;
