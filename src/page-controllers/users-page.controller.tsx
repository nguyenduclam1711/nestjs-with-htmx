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
    },
  ) {
    const { email, name } = query;
    const [currentUser, data] = await Promise.all([
      this.usersService.findOne({
        id: req.user.id,
      }),
      this.usersService.find({
        email,
        name,
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
    },
  ) {
    const { email, name } = query;
    const data = await this.usersService.find({
      email,
      name,
    });
    return this.renderingService.render(<UsersTable data={data} />);
  }
}
