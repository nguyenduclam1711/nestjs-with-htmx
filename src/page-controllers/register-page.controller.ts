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
import { Response as ExpressResponse } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { RegisterBodyType, ResgiterBodySchema } from 'src/schemas/register';
import { AuthService } from 'src/services/auth.service';

@Controller('/register')
export class RegisterPageController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Public()
  @Get()
  @Render('pages/register/index')
  renderRegisterPage() {
    return {};
  }

  @Public()
  @Post()
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'pages/register/register-form-data-inputs',
      getTemplateCtx: (req) => {
        const body = req.body as RegisterBodyType;
        return {
          email: body.email,
          name: body.name,
          password: body.password,
        };
      },
    }),
  )
  @UsePipes(new PageValidationPipe(ResgiterBodySchema))
  async register(
    @Body()
    body: RegisterBodyType,
    @Response()
    res: ExpressResponse,
  ) {
    await this.authService.register(body);
    res.setHeader('Hx-Trigger', 'registerSuccessfullyEvent');
    res.setHeader('Hx-Reswap', 'none');
    res.sendStatus(200);
  }
}
