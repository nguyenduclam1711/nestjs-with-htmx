import { ROUTES } from '../constants/routes.js';
import { AuthUtils } from '../utils/auth.js';

document.body.addEventListener('htmx:responseError', function (e) {
  if (e.detail.xhr.status === 401) {
    AuthUtils.deleteToken();
    window.location.href = ROUTES.LOGIN;
  }
});
