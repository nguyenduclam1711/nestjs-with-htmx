const createUserBtnId = 'users-create-btn';
const createUserModalId = 'users-create-modal';

document.getElementById(createUserBtnId).addEventListener('click', function () {
  const createUserModal = document.getElementById(createUserModalId);
  if (createUserModal) {
    createUserModal.showModal();
  }
});

document.body.addEventListener('closeCreateUsersModal', function () {
  const createUserModal = document.getElementById(createUserModalId);
  if (createUserModal) {
    createUserModal.close();
  }
});

const updateUserBtnId = 'users-update-btn';
const updateUserModalId = 'users-update-modal';

document.body.addEventListener('closeUpdateUsersModal', function () {
  const updateUserModal = document.getElementById(updateUserModalId);
  if (updateUserModal) {
    updateUserModal.close();
  }
});

const addEventClickOnUpdateButtons = () => {
  document.body.querySelectorAll(`#${updateUserBtnId}`).forEach((button) => {
    button.addEventListener('click', function () {
      const updateUserModal = document.getElementById(updateUserModalId);
      if (updateUserModal) {
        updateUserModal.showModal();
      }
    });
  });
};

const deleteUserBtnId = 'users-delete-btn';
const deleteUserModalPrefixId = 'users-delete-modal';
const deleteUserModalContentPrefixId = 'users-delete-modal-content';

const addEventClickOnDeleteButtons = () => {
  document.body.querySelectorAll(`#${deleteUserBtnId}`).forEach((button) => {
    button.addEventListener('click', function (e) {
      const userId = e.target.dataset.userId;
      if (!userId) {
        return;
      }
      // reset delete modal content
      const deleteModalContentId = `${deleteUserModalContentPrefixId}-${userId}`;
      const deleteModalContent = document.getElementById(deleteModalContentId);
      if (deleteModalContent) {
        deleteModalContent.innerHTML = '';
      }
      // open delete modal
      const deleteUserModalId = `${deleteUserModalPrefixId}-${userId}`;
      const deleteUserModal = document.getElementById(deleteUserModalId);
      if (!deleteUserModal) {
        return;
      }
      deleteUserModal.showModal();
    });
  });
};

// init
addEventClickOnUpdateButtons();
addEventClickOnDeleteButtons();

// add event to update button after searching
document.body.addEventListener('onSearchUsersSuccess', function () {
  addEventClickOnUpdateButtons();
  addEventClickOnDeleteButtons();
});
