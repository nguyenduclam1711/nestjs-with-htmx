import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { LoginBodySchema, LoginBodyType } from 'src/schemas/login';
import { AuthService } from 'src/services/auth.service';

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
  @UsePipes(new PageValidationPipe(LoginBodySchema))
  async login(
    @Body()
    body: LoginBodyType,
  ) {
    const { email, password } = body;
    const response = await this.authService.login(email, password);
    return response;
  }
}
