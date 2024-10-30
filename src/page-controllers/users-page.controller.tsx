import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
  Response,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { PagePushUrlWithParamsInterceptor } from 'src/interceptors/page-push-curr-url-with-params.interceptor';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { CreateUserBody, CreateUserBodySchema } from 'src/schemas/users';
import { RenderingService } from 'src/services/rendering.service';
import { UsersService } from 'src/services/users.service';
import UsersPage from 'src/views/pages/users';
import UsersCreateOrUpdateFormItems from 'src/views/pages/users/create-or-update-form-items';
import UsersSearchFormItems from 'src/views/pages/users/search-form-items';
import UsersTable from 'src/views/pages/users/table';
import { Response as ExpressResponse } from 'express';
import { USERS_SEARCH_EVENT } from 'src/views/pages/users/constants';

@Controller('/users')
export class UsersPageController {
  constructor(
    @Inject(RenderingService)
    private renderingService: RenderingService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @Get()
  async renderUsersPage(
    @Request()
    req: any,
    @Query()
    query: {
      email?: string;
      name?: string;
      page?: string;
    },
  ) {
    const { email, name, page = 1 } = query;
    const [currentUser, { data, total }] = await Promise.all([
      this.usersService.findOne({
        id: req.user.id,
      }),
      this.usersService.find({
        user: {
          email,
          name,
        },
        pagination: {
          page: Number(page),
        },
      }),
    ]);
    if (!currentUser) {
      return '';
    }
    return this.renderingService.render(
      <UsersPage
        currentUser={currentUser}
        data={data}
        searchFormData={{
          name,
          email,
        }}
        page={Number(page)}
        total={total}
      />,
    );
  }

  @Get('/search')
  @UseInterceptors(PagePushUrlWithParamsInterceptor)
  async searchUsers(
    @Query()
    query: {
      email?: string;
      name?: string;
      page?: string;
    },
  ) {
    const { email, name, page = 1 } = query;
    const { data, total } = await this.usersService.find({
      user: {
        email,
        name,
      },
      pagination: {
        page: Number(page),
      },
    });
    return this.renderingService.render(
      <UsersTable
        data={data}
        page={Number(page)}
        total={total}
        email={email}
        name={name}
      />,
    );
  }

  @Get('/create-or-update-form-items')
  getCreateOrUpdateFormItems() {
    return this.renderingService.render(<UsersSearchFormItems />);
  }

  @Post()
  @UseFilters(
    new PageExceptionFilter({
      Component: UsersCreateOrUpdateFormItems,
      getTemplateCtx: (req) => {
        const body = req.body as CreateUserBody;
        return {
          email: body.email,
          name: body.name,
        };
      },
    }),
  )
  @UsePipes(new PageValidationPipe(CreateUserBodySchema))
  async createUser(
    @Body()
    body: CreateUserBody,
    @Response()
    res: ExpressResponse,
  ) {
    const { name, email } = body;
    await this.usersService.createOne({
      name,
      email,
    });
    const hxTriggerEvents = `${USERS_SEARCH_EVENT}, closeUsersModal`;
    res.setHeader('Hx-Trigger', hxTriggerEvents);
    res.sendStatus(200);
  }
}
