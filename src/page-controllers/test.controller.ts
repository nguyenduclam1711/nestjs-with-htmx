import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { AuthService } from 'src/services/auth.service';
import { InitDatabase } from 'src/services/init-database.service';

@Controller('/test')
export class TestController {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
    @Inject(InitDatabase)
    private readonly initDatabase: InitDatabase,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Delete('/recreate-tables')
  async deleteTables() {
    try {
      const allTables = Object.values(DATABASES);
      await Promise.all(
        allTables.map((tableName) => {
          return this.knex.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
        }),
      );
      await this.initDatabase.onModuleInit();
      return {
        message: 'done',
      };
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Post('/register')
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    await this.authService.register(body);
    return {
      message: 'done',
    };
  }
}
