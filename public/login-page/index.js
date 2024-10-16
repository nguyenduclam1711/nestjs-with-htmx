import { ROUTES } from '../constants/routes.js';
import { AuthUtils } from '../utils/auth.js';

document.body.addEventListener('loginSuccessfullyEvent', function (e) {
  if (!e.detail) {
    return;
  }
  const { accessToken } = e.detail;
  if (!accessToken) {
    return;
  }
  AuthUtils.setToken(accessToken);
  location.href = ROUTES.TODOS;
});
