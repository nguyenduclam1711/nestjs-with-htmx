import Button from 'src/views/components/button';
import { USERS_DELETE_BUTTON_ID } from './constants';

type UsersDeleteButtonProps = {
  userId: number;
};
const UsersDeleteButton = (props: UsersDeleteButtonProps) => {
  const { userId } = props;

  return (
    <Button
      id={USERS_DELETE_BUTTON_ID}
      variant="error"
      size="sm"
      data-user-id={userId}
    >
      Delete
    </Button>
  );
};

export default UsersDeleteButton;
