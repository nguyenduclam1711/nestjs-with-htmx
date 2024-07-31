import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { VIEWS_PATH } from 'src/constants/paths';
import { ErrorUtils } from 'src/utils/errorUtils';
import { HbsUtils } from 'src/utils/hbsUtils';
import { ZodError } from 'zod';

@Catch(HttpException)
export class PageExceptionFilter implements ExceptionFilter {
  private templateFilePath: string;
  private getTemplateCtx?: (req: Request) => Record<string, any>;

  constructor(
    templateFilePath: string,
    getTemplateCtx?: (req: Request) => Record<string, any>,
  ) {
    this.templateFilePath = templateFilePath;
    if (getTemplateCtx) {
      this.getTemplateCtx = getTemplateCtx;
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const transformedErr = ErrorUtils.transformZodErrForPageErrorCtx(
      exception.cause as ZodError,
    );
    let templateCtx: Record<string, any> = {};
    if (typeof this.getTemplateCtx === 'function') {
      templateCtx = this.getTemplateCtx(req);
    }
    const compiledHtml = HbsUtils.compile(
      join(VIEWS_PATH, this.templateFilePath),
      {
        ...templateCtx,
        error: transformedErr,
      },
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      content: compiledHtml,
      message: exception.message,
    });
  }
}
