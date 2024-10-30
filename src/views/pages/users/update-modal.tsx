import Modal from 'src/views/components/modal';
import {
  USERS_UPDATE_MODAL_CONTENT_ID,
  USERS_UPDATE_MODAL_ID,
} from './constants';

const UsersUpdateModal = () => {
  return (
    <Modal
      id={USERS_UPDATE_MODAL_ID}
      contentId={USERS_UPDATE_MODAL_CONTENT_ID}
    />
  );
};

export default UsersUpdateModal;
