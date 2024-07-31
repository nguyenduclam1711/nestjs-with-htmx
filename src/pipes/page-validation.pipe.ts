import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class PageValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error: any) {
      throw new BadRequestException(error as ZodError);
    }
  }
}
