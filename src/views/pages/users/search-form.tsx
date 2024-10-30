import Button from 'src/views/components/button';
import {
  USERS_SEARCH_EVENT,
  USERS_SEARCH_FORM_BUTTON_ID,
  USERS_SEARCH_FORM_ID,
  USERS_TABLE_ID,
} from './constants';
import UsersSearchFormItems, {
  UsersSearchFormItemsProps,
} from './search-form-items';

type UsersSearchFormProps = {
  page?: number;
} & UsersSearchFormItemsProps;
const UsersSearchForm = (props: UsersSearchFormProps) => {
  const { page } = props;
  const formHxVals = JSON.stringify({ page });
  return (
    <form
      id={USERS_SEARCH_FORM_ID}
      hx-get="/users/search"
      hx-target={`#${USERS_TABLE_ID}`}
      className="flex gap-4"
      hx-vals={formHxVals}
      hx-trigger={`${USERS_SEARCH_EVENT} from:body, click from:#${USERS_SEARCH_FORM_BUTTON_ID}`}
    >
      <UsersSearchFormItems {...props} />
      <Button type="submit" className="mt-9" id={USERS_SEARCH_FORM_BUTTON_ID}>
        Search
      </Button>
    </form>
  );
};

export default UsersSearchForm;
