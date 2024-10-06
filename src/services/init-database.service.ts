import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';

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
    const tablesNeedToInit = [this.initTodosTable()];
    await Promise.all(tablesNeedToInit);
  }

  private async initTodosTable() {
    const hasTable = await this.knex.schema.hasTable(DATABASES.TODOS);
    if (!hasTable) {
      await this.knex.schema.createTable(DATABASES.TODOS, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.timestamp('created_at').defaultTo(this.knex.fn.now());
      });
    }
  }
}
