import {
  Controller,
  Delete,
  Get,
  Param,
  Render,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    try {
      return this.todosService.deleteOne(Number(id));
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
