import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FC } from 'react';
import { PageExceptionCause } from 'src/schemas/error';
import { renderToString } from 'react-dom/server';

@Catch(HttpException)
export class PageExceptionFilter implements ExceptionFilter {
  private getTemplateCtx?: (req: Request) => Record<string, any>;
  private headers?:
    | Array<{ key: string; value: any }>
    | ((req: Request) => Array<{ key: string; value: any }>);
  private Component: FC<any>;

  constructor(params: {
    Component: FC<any>;
    getTemplateCtx?: (req: Request) => Record<string, any>;
    headers?:
      | Array<{ key: string; value: any }>
      | ((req: Request) => Array<{ key: string; value: any }>);
  }) {
    const { getTemplateCtx, headers, Component } = params;
    this.Component = Component;
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
    const { pageFormError } = exception.cause as PageExceptionCause;
    let templateCtx: Record<string, any> = {};
    if (typeof this.getTemplateCtx === 'function') {
      templateCtx = this.getTemplateCtx(req);
    }
    let headersArr: Array<{ key: string; value: any }> = [];
    if (typeof this.headers === 'function') {
      headersArr = this.headers(req);
    }
    if (Array.isArray(this.headers)) {
      headersArr = this.headers;
    }
    if (headersArr.length > 0) {
      headersArr.forEach((header) => {
        res.setHeader(header.key, header.value);
      });
    }
    const Component = this.Component;
    const htmlString = renderToString(
      <Component
        {...{
          ...templateCtx,
          errorMessage: exception.message,
          error: pageFormError,
        }}
      />,
    );
    res.send(htmlString);
  }
}
