const accessTokenKey = 'accessToken';
export const AuthUtils = {
  getToken: function () {
    return localStorage.getItem(accessTokenKey);
  },
  setToken: function (newToken) {
    localStorage.setItem(accessTokenKey, newToken);
  },
  deleteToken: function () {
    localStorage.removeItem(accessTokenKey);
  },
};
