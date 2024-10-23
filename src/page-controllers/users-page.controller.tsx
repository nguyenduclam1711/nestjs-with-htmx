import { Controller, Get, Inject, Request } from '@nestjs/common';
import { RenderingService } from 'src/services/rendering.service';
import { UsersService } from 'src/services/users.service';
import UsersPage from 'src/views/pages/users';

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
  ) {
    const [currentUser, data] = await Promise.all([
      this.usersService.findOne({
        id: req.user.id,
      }),
      this.usersService.find(),
    ]);
    if (!currentUser) {
      return '';
    }
    return this.renderingService.render(
      <UsersPage currentUser={currentUser} data={data} />,
    );
  }
}