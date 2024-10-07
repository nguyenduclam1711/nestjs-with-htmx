import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { DATABASES } from 'src/constants/databases';
import { MODULES } from 'src/constants/modules';
import { InitDatabase } from 'src/services/init-database.service';
import { TodosService } from 'src/services/todos.service';

@Controller('/test')
export class TestController {
  constructor(
    @Inject(TodosService)
    private todosService: TodosService,
    @Inject(MODULES.KNEX_CONNECTION)
    private readonly knex: Knex,
    @Inject(InitDatabase)
    private readonly initDatabase: InitDatabase,
  ) {}

  @Get('/todos')
  async getTodos() {
    const todos = await this.todosService.findTodos();
    return todos;
  }

  @Post('/todos')
  async createTodo(
    @Body()
    body: {
      name: string;
      email: string;
    },
  ) {
    return this.todosService.createTodo({
      name: body.name,
      email: body.email,
    });
  }

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
}
