import Table from 'src/views/components/table';
import { USERS_TABLE_COLUMNS, USERS_TABLE_ID } from './constants';
import { SearchUsers } from 'src/schemas/users';
import Pagination from 'src/views/components/pagination';

type UsersTableProps = {
  data: SearchUsers;
  page: number;
  total: number;
  email?: string;
  name?: string;
};
const UsersTable = (props: UsersTableProps) => {
  const { data, page, total, email, name } = props;
  return (
    <>
      <Table columns={USERS_TABLE_COLUMNS} dataSource={data} />
      <Pagination
        current={page}
        total={total}
        className="mt-4 float-right"
        extraButtonProps={(page) => {
          const hxVals = { page, email, name };
          return {
            'hx-get': '/users/search',
            'hx-vals': JSON.stringify(hxVals),
            'hx-target': `#${USERS_TABLE_ID}`,
          };
        }}
      />
    </>
  );
};

export default UsersTable;
