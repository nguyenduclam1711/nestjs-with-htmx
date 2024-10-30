import Button from 'src/views/components/button';
import {
  USERS_CREATE_BUTTON_ID,
  USERS_CREATE_FORM_ITEMS_ID,
} from './constants';

const UsersCreateButton = () => {
  return (
    <Button
      className="mt-9"
      id={USERS_CREATE_BUTTON_ID}
      hx-get="/users/create-or-update-form-items"
      hx-swap="innerHTML"
      hx-target={`#${USERS_CREATE_FORM_ITEMS_ID}`}
      variant="primary"
      loadingButton
      size="sm"
    >
      Create
    </Button>
  );
};
export default UsersCreateButton;
