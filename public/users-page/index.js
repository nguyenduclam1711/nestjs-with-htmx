const createUserBtnId = 'users-create-btn';
const createUserModalId = 'users-create-modal';

document.getElementById(createUserBtnId).addEventListener('click', function () {
  const createUserModal = document.getElementById(createUserModalId);
  if (createUserModal) {
    createUserModal.showModal();
  }
});

document.addEventListener('closeUsersModal', function () {
  const createUserModal = document.getElementById(createUserModalId);
  if (createUserModal) {
    createUserModal.close();
  }
});
