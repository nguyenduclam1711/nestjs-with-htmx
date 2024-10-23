import { UserCredentialPageDataItem } from 'src/schemas/user-credentials';
import { FormatUtils } from 'src/utils/formatUtils';
import { TableProps } from 'src/views/components/table';

export const USER_CRENDETIALS_TABLE_COLUMNS: TableProps<UserCredentialPageDataItem>['columns'] =
  [
    {
      title: 'Id',
      dataKey: ['id'],
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
