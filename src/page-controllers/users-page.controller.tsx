import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
import {
  CreateUserBody,
  CreateUserBodySchema,
  UpdateUserBody,
} from 'src/schemas/users';
import { RenderingService } from 'src/services/rendering.service';
import { UsersService } from 'src/services/users.service';
import UsersPage from 'src/views/pages/users';
import UsersCreateOrUpdateFormItems from 'src/views/pages/users/create-or-update-form-items';
import UsersTable from 'src/views/pages/users/table';
import { Response as ExpressResponse } from 'express';
import { USERS_SEARCH_EVENT } from 'src/views/pages/users/constants';
import Alert from 'src/views/components/alert';
import ModalContent from 'src/views/components/modal/modal-content';
import UpdateModalContent from 'src/views/pages/users/update-modal-content';
import DeleteModalErrorAlert from 'src/views/pages/users/delete-modal-error-alert';
import { getUsersDeleteModalContentId } from 'src/views/pages/users/utils';

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
  @Header('HX-Trigger-After-Settle', 'onSearchUsersSuccess')
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

  @Get('/create-form-items')
  getCreateFormItems() {
    return this.renderingService.render(<UsersCreateOrUpdateFormItems />);
  }

  @Get('/update-modal-content/:userId')
  async getUpdateFormItems(
    @Param('userId', ParseIntPipe)
    userId: number,
  ) {
    const user = await this.usersService.findOne({
      id: userId,
    });
    if (!user) {
      return this.renderingService.render(
        <ModalContent title="Not found user">
          <Alert type="error">Not found user</Alert>
        </ModalContent>,
      );
    }
    return this.renderingService.render(
      <UpdateModalContent
        userId={userId}
        formItemsProps={{
          name: user.name,
          email: user.email,
        }}
      />,
    );
  }

  @Put('/update/:userId')
  @UseFilters(
    new PageExceptionFilter({
      Component: UsersCreateOrUpdateFormItems,
      getTemplateCtx: (req) => {
        const body = req.body as UpdateUserBody;
        return {
          email: body.email,
          name: body.name,
        };
      },
    }),
  )
  @UsePipes(new PageValidationPipe(CreateUserBodySchema))
  async updateUser(
    @Param('userId', ParseIntPipe)
    userId: number,
    @Body()
    body: UpdateUserBody,
    @Response()
    res: ExpressResponse,
  ) {
    const { name, email } = body;
    await this.usersService.updateOne(userId, {
      name,
      email,
    });
    const hxTriggerEvents = `${USERS_SEARCH_EVENT}, closeUpdateUsersModal`;
    res.setHeader('Hx-Trigger', hxTriggerEvents);
    res.sendStatus(200);
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
    const hxTriggerEvents = `${USERS_SEARCH_EVENT}, closeCreateUsersModal`;
    res.setHeader('Hx-Trigger', hxTriggerEvents);
    res.sendStatus(200);
  }

  @Delete('/delete/:userId')
  @UseFilters(
    new PageExceptionFilter({
      Component: DeleteModalErrorAlert,
      headers: (req) => {
        const { params } = req;
        const userId = params.userId;
        return [
          {
            key: 'HX-Reswap',
            value: 'innerHTML',
          },
          {
            key: 'HX-Retarget',
            value: `#${getUsersDeleteModalContentId(Number(userId))}`,
          },
        ];
      },
    }),
  )
  async deleteUser(
    @Param('userId', ParseIntPipe)
    userId: number,
    @Request()
    req: any,
    @Response()
    res: ExpressResponse,
  ) {
    const { user } = req;
    await this.usersService.deleteOne(userId, user.id);
    const hxTriggerEvents = `${USERS_SEARCH_EVENT}`;
    res.setHeader('Hx-Trigger', hxTriggerEvents);
    res.sendStatus(200);
  }
}
