import {
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { User } from 'src/schemas/users';
import { ErrorUtils } from 'src/utils/errorUtils';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async createOne(args: {
    name: string;
    email: string;
  }): Promise<User | undefined> {
    const { name, email } = args;
    try {
      const query = await this.knex(DATABASES.USERS)
        .insert({
          name,
          email,
        })
        .returning(['*']);
      return query[0];
    } catch (error: any) {
      if (error.code === '23505') {
        ErrorUtils.throwPageException({
          Exception: ConflictException,
          message: error.detail,
          pageFormError: {
            email: 'Email has already existed',
          },
        });
      } else {
        ErrorUtils.throwPageException({
          Exception: UnprocessableEntityException,
          message: error.detail,
        });
      }
    }
  }

  async findOne(user: Partial<User>): Promise<User | undefined> {
    const usersQuery = await this.knex(DATABASES.USERS).select('*').where(user);
    return usersQuery[0];
  }

  async find(args?: { email?: string; name?: string }): Promise<User[]> {
    const { email, name } = args ?? {};
    return this.knex(DATABASES.USERS)
      .select('*')
      .where((builder) => {
        if (email) {
          builder.whereILike('email', `%${email}%`);
        }
        if (name) {
          builder.whereILike('name', `%${name}%`);
        }
      });
  }
}
