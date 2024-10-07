import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentialsService } from './user-credentials.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(UserCredentialsService)
    private userCredentialsService: UserCredentialsService,
  ) {}

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  async register(args: { name: string; email: string; password: string }) {
    const { name, email, password } = args;
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.createOne({
      name,
      email,
    });
    await this.userCredentialsService.createOne({
      user,
      password: hashedPassword,
    });
  }
}
