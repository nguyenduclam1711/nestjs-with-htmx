import { ROUTES } from '../constants/routes.js';

document.body.addEventListener('loginSuccessfullyEvent', function () {
  location.href = ROUTES.USERS;
});
