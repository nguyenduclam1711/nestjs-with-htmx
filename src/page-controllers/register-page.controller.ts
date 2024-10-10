import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Post,
  Render,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
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
  @Render('register/index')
  renderRegisterPage() {
    return {};
  }

  @Public()
  @Post()
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'register/register_form_data_inputs',
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
  @Header('Hx-Trigger', 'registerSuccessfullyEvent')
  async register(
    @Body()
    body: RegisterBodyType,
  ) {
    await this.authService.register(body);
  }
}
