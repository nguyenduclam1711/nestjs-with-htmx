import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ACCESS_TOKEN_KEY } from 'src/constants/auth';
import { FRONTEND_ROUTES } from 'src/constants/frontend-routes';
import { IS_PUBLIC_ENDPOINT } from 'src/decorators/public.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicEndpoint) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const token = this.getTokenFromHeader(request);
    if (!token) {
      response.redirect(FRONTEND_ROUTES.LOGIN);
      return false;
      // throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (error) {
      response.redirect(FRONTEND_ROUTES.LOGIN);
      return false;
      // throw new UnauthorizedException();
    }
    return true;
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const cookies = request.cookies;
    return cookies[ACCESS_TOKEN_KEY] ?? '';
  }
}
