import { ROUTES } from '../constants/routes.js';

document.body.addEventListener('registerSuccessfullyEvent', function () {
  location.href = ROUTES.LOGIN;
});
