import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from 'src/services/auth.service';
import { InitDatabase } from 'src/services/init-database.service';
import { TodosService } from 'src/services/todos.service';

@Controller('/test')
export class TestController {
  constructor(
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
    @Inject(InitDatabase)
    private readonly initDatabase: InitDatabase,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(TodosService)
    private todosService: TodosService,
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

  @Get('/todos')
  async getTodos() {
    return this.todosService.findAll();
  }

  @Public()
  @Post('/login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    try {
      const response = await this.authService.login(body.email, body.password);
      return response;
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
