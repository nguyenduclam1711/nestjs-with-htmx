import { serialize } from 'cookie';
import { ACCESS_TOKEN_KEY } from 'src/constants/auth';
import * as dayjs from 'dayjs';

export const AuthUtils = {
  serializeToken(token: string) {
    return serialize(ACCESS_TOKEN_KEY, token, {
      path: '/',
      expires: dayjs().add(1, 'day').toDate(),
    });
  },
};
