const accessTokenKey = 'accessToken';

export const AuthUtils = {
  deleteToken: function () {
    document.cookie = `${accessTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
