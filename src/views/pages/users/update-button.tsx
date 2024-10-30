import Button from 'src/views/components/button';
import {
  USERS_UPDATE_BUTTON_ID,
  USERS_UPDATE_MODAL_CONTENT_ID,
} from './constants';

type UsersUpdateButtonProps = {
  userId: string;
};
const UsersUpdateButton = (props: UsersUpdateButtonProps) => {
  const { userId } = props;
  return (
    <Button
      id={USERS_UPDATE_BUTTON_ID}
      hx-get={`/users/update-modal-content/${userId}`}
      hx-target={`#${USERS_UPDATE_MODAL_CONTENT_ID}`}
      hx-swap="innerHTML"
      variant="secondary"
      size="sm"
      loadingButton
    >
      Update
    </Button>
  );
};

export default UsersUpdateButton;
