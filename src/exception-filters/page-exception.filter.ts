import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(BadRequestException)
export class PageExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) { }
}
