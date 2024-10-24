import {
  Controller,
  Get,
  Inject,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { PagePushUrlWithParamsInterceptor } from 'src/interceptors/page-push-curr-url-with-params.interceptor';
import { RenderingService } from 'src/services/rendering.service';
import { UsersService } from 'src/services/users.service';
import UsersPage from 'src/views/pages/users';
import UsersTable from 'src/views/pages/users/table';

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
}
