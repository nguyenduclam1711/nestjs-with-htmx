import {
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { DEFAULT_PAGINATION_SIZE } from 'src/constants/pagination';
import { SearchUsers, User } from 'src/schemas/users';
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

  async find(args?: {
    user?: { email?: string; name?: string };
    pagination?: {
      page?: number;
      size?: number;
    };
  }): Promise<{ data: SearchUsers; total: number }> {
    const { user, pagination } = args ?? {};
    const { email, name } = user ?? {};
    const { page = 1, size = DEFAULT_PAGINATION_SIZE } = pagination ?? {};
    const whereBuilderFn = (builder) => {
      if (email) {
        builder.whereILike('email', `%${email}%`);
      }
      if (name) {
        builder.whereILike('name', `%${name}%`);
      }
    };
    const [data, totalQuery] = await Promise.all([
      this.knex(DATABASES.USERS)
        .select(
          `${DATABASES.USERS}.id`,
          `${DATABASES.USERS}.name`,
          `${DATABASES.USERS}.email`,
          `${DATABASES.USERS}.created_at`,
          `${DATABASES.USER_CREDENTIALS}.user_id`,
        )
        .where(whereBuilderFn)
        .offset(size * (page - 1))
        .limit(size)
        .leftJoin(
          DATABASES.USER_CREDENTIALS,
          `${DATABASES.USERS}.id`,
          `${DATABASES.USER_CREDENTIALS}.user_id`,
        )
        .orderBy(`${DATABASES.USERS}.id`, 'desc'),
      this.knex(DATABASES.USERS).where(whereBuilderFn).count('*'),
    ]);
    return {
      data,
      total: Number(totalQuery[0].count),
    };
  }
}
