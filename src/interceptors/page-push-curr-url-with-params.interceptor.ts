import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PagePushUrlWithParamsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        try {
          const ctx = context.switchToHttp();
          const req = ctx.getRequest<Request>();
          const hxCurrentUrlHeader = req.header('HX-Current-Url');
          if (typeof hxCurrentUrlHeader === 'string') {
            const hxCurrentUrl = new URL(hxCurrentUrlHeader);
            const res = ctx.getResponse<Response>();
            if (req.method === 'GET') {
              // NOTE: this is a hack because we only got pathname from originalUrl and we only need search params string
              const reqUrl = new URL(`http://localhost${req.originalUrl}`);
              res.setHeader(
                'HX-Push-Url',
                `${hxCurrentUrl.origin}${hxCurrentUrl.pathname}${reqUrl.search}`,
              );
            }
          }
        } catch (error) {}
      }),
    );
  }
}
