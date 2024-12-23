import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Response,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { LoginBodySchema, LoginBodyType } from 'src/schemas/login';
import { AuthService } from 'src/services/auth.service';
import { Response as ExpressResponse } from 'express';
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { RenderingService } from 'src/services/rendering.service';
import LoginPage from 'src/views/pages/login';
import LoginFormItems from 'src/views/pages/login/login-form-items';
import { AuthUtils } from 'src/utils/authUtils';

@Controller('/login')
export class LoginPageController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
    @Inject(RenderingService)
    private renderingService: RenderingService,
  ) {}

  @Public()
  @Get()
  renderLoginPage() {
    return this.renderingService.render(<LoginPage />);
  }

  @Public()
  @Post()
  @UseFilters(
    new PageExceptionFilter({
      Component: LoginFormItems,
      getTemplateCtx(req) {
        const body = req.body as LoginBodyType;
        return {
          email: body.email,
          password: body.password,
        };
      },
    }),
  )
  @UsePipes(new PageValidationPipe(LoginBodySchema))
  async login(
    @Body()
    body: LoginBodyType,
    @Response()
    res: ExpressResponse,
  ) {
    const { email, password } = body;
    const response = await this.authService.login(email, password);
    res.setHeader('Set-Cookie', AuthUtils.serializeToken(response.accessToken));
    res.setHeader('HX-Trigger', 'loginSuccessfullyEvent');
    res.setHeader('HX-Reswap', 'none');
    res.sendStatus(200);
  }
}
