import { Controller, Get, Inject, Request } from '@nestjs/common';
import { RenderingService } from 'src/services/rendering.service';
import { UserCredentialsService } from 'src/services/user-credentials.service';
import { UsersService } from 'src/services/users.service';
import UserCredentialsPage from 'src/views/pages/user-credentials';

@Controller('/user-credentials')
export class UserCredentialsPageController {
  constructor(
    @Inject(RenderingService)
    private renderingService: RenderingService,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(UserCredentialsService)
    private userCredentialsService: UserCredentialsService,
  ) {}

  @Get()
  async renderUsersPage(
    @Request()
    req: any,
  ) {
    const [currentUser, data] = await Promise.all([
      this.usersService.findOne({
        id: req.user.id,
      }),
      this.userCredentialsService.findForUserCredentialsPage(),
    ]);
    if (!currentUser) {
      return '';
    }
    return this.renderingService.render(
      <UserCredentialsPage currentUser={currentUser} data={data} />,
    );
  }
}
