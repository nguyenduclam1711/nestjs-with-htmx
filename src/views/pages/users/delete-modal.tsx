import Modal from 'src/views/components/modal';
import { getUsersDeleteModalContentId, getUsersDeleteModalId } from './utils';
import Button from 'src/views/components/button';

type UsersDeleteModalProps = {
  name: string;
  email: string;
  userId: number;
};
const UsersDeleteModal = (props: UsersDeleteModalProps) => {
  const { name, email, userId } = props;
  return (
    <Modal
      id={getUsersDeleteModalId(userId)}
      title={`Do you want to delete this user: ${name} - ${email}`}
    >
      <div id={getUsersDeleteModalContentId(userId)}></div>
      <Button
        variant="secondary"
        className="float-right"
        hx-delete={`/users/delete/${userId}`}
        hx-swap="none"
      >
        Delete
      </Button>
    </Modal>
  );
};

export default UsersDeleteModal;
