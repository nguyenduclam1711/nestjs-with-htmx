import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { User } from 'src/schemas/users';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async createOne(args: { name: string; email: string }): Promise<User> {
    const { name, email } = args;
    const query = await this.knex(DATABASES.USERS)
      .insert({
        name,
        email,
      })
      .returning(['*']);
    return query[0];
  }
}
