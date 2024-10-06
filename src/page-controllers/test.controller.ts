import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TodosService } from 'src/services/todos.service';

@Controller('/test')
export class TestController {
  constructor(
    @Inject(TodosService)
    private todosService: TodosService,
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
}
