import { ROUTES } from '../constants/routes.js';
import { AuthUtils } from '../utils/auth.js';

document.body.addEventListener('htmx:configRequest', function (e) {
  const token = AuthUtils.getToken();
  if (token) {
    e.detail.headers.Authorization = `Bearer ${token}`;
  }
});

document.body.addEventListener('htmx:responseError', function (e) {
  if (e.detail.xhr.status === 401) {
    AuthUtils.deleteToken();
    window.location.href = ROUTES.LOGIN;
  }
});
