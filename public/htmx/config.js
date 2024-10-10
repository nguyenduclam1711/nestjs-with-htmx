import { AuthUtils } from '../utils/auth.js';

document.body.addEventListener('htmx:configRequest', function (e) {
  const token = AuthUtils.getToken();
  if (token) {
    e.detail.headers.Authentication = `Bearer ${token}`;
  }
});

document.body.addEventListener('htmx:responseError', function (e) {
  if (e.detail.xhr.status === 401) {
    AuthUtils.deleteToken();
    location.href = '/login';
  }
});
