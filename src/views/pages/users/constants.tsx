import { SearchUserItem } from 'src/schemas/users';
import { FormatUtils } from 'src/utils/formatUtils';
import { PageWrapperProps } from 'src/views/commons/page-wrapper';
import { TableProps } from 'src/views/components/table';
import UsersUpdateButton from './update-button';

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
    dataKey: ['id'],
    render: (userId) => {
      return <UsersUpdateButton userId={userId as string} />;
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

export const USERS_UPDATE_MODAL_ID = 'users-update-modal';
export const USERS_UPDATE_BUTTON_ID = 'users-update-btn';
export const USERS_UPDATE_MODAL_CONTENT_ID = 'users-update-modal-content';
export const USERS_UPDATE_FORM_ITEMS_ID = 'users-update-form-items';
