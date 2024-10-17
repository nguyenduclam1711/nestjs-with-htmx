import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { RenderingService } from 'src/services/rendering.service';
import UsersPage from 'src/views/pages/users';

@Controller('/users')
export class UsersPageController {
  constructor(
    @Inject(RenderingService)
    private renderingService: RenderingService,
  ) {}

  @Get()
  @Public()
  renderUsersPage() {
    return this.renderingService.render(
      <UsersPage
        user={{
          name: 'vai lon luon',
        }}
      />,
    );
  }
}
