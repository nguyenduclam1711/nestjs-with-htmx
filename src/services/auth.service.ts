import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentialsService } from './user-credentials.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ErrorUtils } from 'src/utils/errorUtils';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(UserCredentialsService)
    private userCredentialsService: UserCredentialsService,
    private jwtService: JwtService,
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
    if (user) {
      await this.userCredentialsService.createOne({
        user,
        password: hashedPassword,
      });
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne({
      email,
    });
    const errorMessage = "Can't login with this information";
    if (!user) {
      return ErrorUtils.throwPageException({
        Exception: UnprocessableEntityException,
        message: errorMessage,
      });
    }
    const userCredential = await this.userCredentialsService.findOneByUserId(
      user.id,
    );
    if (!userCredential) {
      return ErrorUtils.throwPageException({
        Exception: UnprocessableEntityException,
        message: errorMessage,
      });
    }
    const match = await compare(password, userCredential.password);
    if (!match) {
      return ErrorUtils.throwPageException({
        Exception: UnprocessableEntityException,
        message: errorMessage,
      });
    }
    const userPayload = {
      id: user.id,
      email: user.email,
    };
    return {
      accessToken: await this.jwtService.signAsync(userPayload),
    };
  }
}
