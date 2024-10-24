import { User } from 'src/schemas/users';
import { FormatUtils } from 'src/utils/formatUtils';
import { TableProps } from 'src/views/components/table';

export const USERS_TABLE_COLUMNS: TableProps<User>['columns'] = [
  {
    title: 'Id',
    dataKey: ['id'],
  },
  {
    title: 'Name',
    dataKey: ['name'],
  },
  {
    title: 'Email',
    dataKey: ['email'],
  },
  {
    title: 'Created at',
    dataKey: ['created_at'],
    render: (createdAt) => {
      return FormatUtils.formatFullDate(createdAt as Date);
    },
  },
];

export const USERS_TABLE_ID = 'users-table';
export const USERS_SEARCH_FORM_BUTTON_ID = 'users-search-form-btn';
export const USERS_SEARCH_FORM_ID = 'users-search-form';
