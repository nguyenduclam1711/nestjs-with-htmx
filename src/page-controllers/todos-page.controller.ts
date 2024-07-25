import { Controller, Get, Render } from '@nestjs/common';
import { TodosService } from 'src/services/todos.service';

@Controller('/todos-page')
export class TodosPageController {
  constructor(private todosService: TodosService) {}
  @Get()
  @Render('todos')
  renderTodos() {
    return {
      todos: this.todosService.findAll(),
    };
  }
}
