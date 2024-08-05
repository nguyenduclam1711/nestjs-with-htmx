import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class PageValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      try {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      } catch (error: any) {
        throw new BadRequestException('Validation error', {
          cause: error as ZodError,
        });
      }
    } else {
      return value;
    }
  }
}
