import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { UserCredential } from 'src/schemas/user-credentials';
import { User } from 'src/schemas/users';

@Injectable()
export class UserCredentialsService {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async createOne(args: { user: User; password: string }) {
    const { user, password } = args;
    return this.knex(DATABASES.USER_CREDENTIALS).insert({
      user_id: user.id,
      password,
    });
  }

  async findOneByUserId(user_id: number): Promise<UserCredential | undefined> {
    const query = await this.knex(DATABASES.USER_CREDENTIALS)
      .select('*')
      .where({
        user_id,
      });
    return query[0];
  }
}
