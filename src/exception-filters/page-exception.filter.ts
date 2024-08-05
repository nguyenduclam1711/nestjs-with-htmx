import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorUtils } from 'src/utils/errorUtils';
import { ZodError } from 'zod';

@Catch(HttpException)
export class PageExceptionFilter implements ExceptionFilter {
  private templateFilePath: string;
  private getTemplateCtx?: (req: Request) => Record<string, any>;
  private headers?: Array<{ key: string; value: any }>;

  constructor(params: {
    templateFilePath: string;
    getTemplateCtx?: (req: Request) => Record<string, any>;
    headers?: Array<{ key: string; value: any }>;
  }) {
    const { templateFilePath, getTemplateCtx, headers } = params;
    this.templateFilePath = templateFilePath;
    if (getTemplateCtx) {
      this.getTemplateCtx = getTemplateCtx;
    }
    if (headers) {
      this.headers = headers;
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
    if (Array.isArray(this.headers) && this.headers.length > 0) {
      this.headers.forEach((header) => {
        res.setHeader(header.key, header.value);
      });
    }
    res.render(this.templateFilePath, {
      ...templateCtx,
      error: transformedErr,
    });
  }
}
