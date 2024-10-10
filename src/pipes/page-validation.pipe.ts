import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ErrorUtils } from 'src/utils/errorUtils';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class PageValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      try {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      } catch (error: any) {
        const pageFormError = ErrorUtils.transformZodErrForPageErrorCtx(
          error as ZodError,
        );
        ErrorUtils.throwPageException({
          Exception: BadRequestException,
          message: 'Validation error',
          pageFormError,
        });
      }
    } else {
      return value;
    }
  }
}
