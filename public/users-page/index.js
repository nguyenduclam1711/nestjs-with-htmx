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

// init
addEventClickOnUpdateButtons();

// add event to update button after searching
document.body.addEventListener('onSearchUsersSuccess', function () {
  addEventClickOnUpdateButtons();
});
