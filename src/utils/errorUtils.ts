import { ZodError } from 'zod';
import { set } from 'lodash';

export const ErrorUtils = {
  transformZodErrForPageErrorCtx(zodErr: ZodError) {
    const error: Record<string, any> = {};
    zodErr.issues.forEach((zodErrItem) => {
      const { message, path } = zodErrItem;
      if (Array.isArray(path) && path.length > 0) {
        set(error, path, message);
      }
    });
    return error;
  },
};
