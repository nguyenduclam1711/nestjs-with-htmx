import { ZodError } from 'zod';
import { set } from 'lodash';
import { HttpException, HttpExceptionOptions } from '@nestjs/common';
import { PageFormError } from 'src/schemas/error';

export const ErrorUtils = {
  transformZodErrForPageErrorCtx(zodErr: ZodError): PageFormError {
    const error = {};
    zodErr.issues.forEach((zodErrItem) => {
      const { message, path } = zodErrItem;
      if (Array.isArray(path) && path.length > 0) {
        set(error, path, message);
      }
    });
    return error;
  },
  throwPageException(args: {
    Exception: new (
      objectOrError?: string | object | any,
      descriptionOrOptions?: string | HttpExceptionOptions,
    ) => HttpException;
    message: string;
    pageFormError?: PageFormError;
  }): never {
    const { Exception, message, pageFormError } = args;
    throw new Exception(message, {
      description: message,
      cause: {
        pageFormError,
      },
    });
  },
};
