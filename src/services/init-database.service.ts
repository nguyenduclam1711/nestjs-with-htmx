import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { USER_STATUSES, UserStatus } from 'src/schemas/users';

@Injectable()
export class InitDatabase implements OnModuleInit {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  async onModuleInit() {
    await this.initTables();
  }

  private async initTables() {
    const tablesNeedToInit = [this.initUsersTable()];
    await Promise.all(tablesNeedToInit);
  }

  private async initUsersTable() {
    const hasTable = await this.knex.schema.hasTable(DATABASES.USERS);
    if (!hasTable) {
      await this.knex.schema.createTable(DATABASES.USERS, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.timestamp('created_at').defaultTo(this.knex.fn.now());
        table
          .enu('status', USER_STATUSES, {
            useNative: true,
            enumName: 'user_status',
          })
          .notNullable()
          .defaultTo(UserStatus.active);
      });
    }
    // because users table must exists before create user credentials
    await this.initUserCredentialsTable();
  }

  private async initUserCredentialsTable() {
    const hasTable = await this.knex.schema.hasTable(
      DATABASES.USER_CREDENTIALS,
    );
    if (!hasTable) {
      await this.knex.schema.createTable(
        DATABASES.USER_CREDENTIALS,
        (table) => {
          table.increments('id').primary();
          table.string('password').notNullable();
          table.integer('user_id').notNullable();
          table.timestamp('created_at').defaultTo(this.knex.fn.now());
          table.foreign('user_id').references('id').inTable(DATABASES.USERS);
        },
      );
    }
  }
}
