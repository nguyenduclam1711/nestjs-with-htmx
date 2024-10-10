import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
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

@Controller('/login')
export class LoginPageController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  @Render('login/index')
  renderLoginPage() {
    return {};
  }

  @Public()
  @Post()
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'login/login_form_data_inputs',
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
    res.setHeader(
      'Hx-Trigger',
      JSON.stringify({
        loginSuccessfullyEvent: {
          accessToken: response.accessToken,
        },
      }),
    );
    res.setHeader('HX-Reswap', 'none');
    res.sendStatus(200);
  }
}
