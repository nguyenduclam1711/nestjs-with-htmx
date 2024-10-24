import { PageWrapperProps } from '../page-wrapper';

export const ADMIN_PAGE_SCRIPTS: NonNullable<PageWrapperProps['scripts']> = [
  {
    src: 'admin-layout/index.js',
    type: 'module',
  },
];
