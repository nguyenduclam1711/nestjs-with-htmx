import { ROUTES } from '../constants/routes.js';
import { AuthUtils } from '../utils/auth.js';

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    location.href = ROUTES.LOGIN;
    AuthUtils.deleteToken();
  });
}
