import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { TodosService } from 'src/services/todos.service';

@Controller('/todos-page')
export class TodosPageController {
  constructor(private todosService: TodosService) {}
  @Get()
  @Render('todos/index')
  renderTodos() {
    return {
      todos: this.todosService.findAll(),
    };
  }

  @Post()
  createTodo(
    @Body()
    body: {
      name: string;
    },
    @Res()
    res: Response,
  ) {
    const createdTodo = this.todosService.createOne(body);
    return res.render('todos/todo_item_row', createdTodo);
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
