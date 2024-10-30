import { SearchUserItem } from 'src/schemas/users';
import { FormatUtils } from 'src/utils/formatUtils';
import { PageWrapperProps } from 'src/views/commons/page-wrapper';
import Button from 'src/views/components/button';
import { TableProps } from 'src/views/components/table';

export const USERS_TABLE_COLUMNS: TableProps<SearchUserItem>['columns'] = [
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
    title: 'Has account',
    dataKey: ['user_id'],
    render: (userId) => {
      return userId ? 'True' : 'False';
    },
  },
  {
    title: 'Created at',
    dataKey: ['created_at'],
    render: (createdAt) => {
      return FormatUtils.formatFullDate(createdAt as Date);
    },
  },
  {
    title: 'Action',
    render: (data) => {
      return (
        <Button size="sm" variant="secondary">
          Update
        </Button>
      );
    },
  },
];

export const USERS_EXTRA_SCRIPTS: PageWrapperProps['scripts'] = [
  {
    src: '/users-page/index.js',
    defer: true,
  },
];

export const USERS_SEARCH_EVENT = 'usersSearchEvent';

export const USERS_TABLE_ID = 'users-table';

export const USERS_SEARCH_FORM_BUTTON_ID = 'users-search-form-btn';
export const USERS_SEARCH_FORM_ID = 'users-search-form';

export const USERS_CREATE_MODAL_ID = 'users-create-modal';
export const USERS_CREATE_BUTTON_ID = 'users-create-btn';
export const USERS_CREATE_FORM_ITEMS_ID = 'users-create-form-items';
