import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { TodosService, TodoWithoutId } from 'src/services/todos.service';

@Controller('/todos-page')
export class TodosPageController {
  constructor(private todosService: TodosService) {}

  @Get()
  @Render('todos/index')
  renderTodos() {
    return {};
  }

  @Get('/todo-items')
  @Render('todos/todo_table_items')
  getTodoTableItems() {
    return {
      todos: this.todosService.findAll(),
    };
  }

  @Post()
  createTodo(
    @Body()
    body: TodoWithoutId,
    @Res()
    res: Response,
  ) {
    const createdTodo = this.todosService.createOne(body);
    return res.render('todos/todo_item_row', createdTodo);
  }

  @Put(':id')
  editTodo(
    @Body()
    body: TodoWithoutId,
    @Param('id')
    id: string,
    @Res()
    res: Response,
  ) {
    try {
      const editedTodo = this.todosService.updateOne(Number(id), body);
      return res.render('todos/todo_item_row', editedTodo);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Res() res: Response) {
    try {
      res.setHeader('HX-Trigger', 'get-todo-items-event');
      res.json(this.todosService.deleteOne(Number(id)));
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
