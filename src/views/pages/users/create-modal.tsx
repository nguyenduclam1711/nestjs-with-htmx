import Modal from 'src/views/components/modal';
import { USERS_CREATE_MODAL_ID } from './constants';
import UsersCreateForm from './create-form';

const UsersCreateModal = () => {
  return (
    <Modal id={USERS_CREATE_MODAL_ID} title="Create User">
      <UsersCreateForm />
    </Modal>
  );
};

export default UsersCreateModal;
