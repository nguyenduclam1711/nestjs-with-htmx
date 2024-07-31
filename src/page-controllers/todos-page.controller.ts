import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  Res,
  UnprocessableEntityException,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { TodoWithoutId, TodoWithoutIdSchema } from 'src/schemas/todo';
import { TodosService } from 'src/services/todos.service';

@Controller('/todos-page')
export class TodosPageController {
  constructor(private todosService: TodosService) { }

  @Get()
  @Render('todos/index')
  renderTodos() {
    return {
      todos: this.todosService.findAll(),
    };
  }

  @Post()
  @UsePipes(new PageValidationPipe(TodoWithoutIdSchema))
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
    @Param('id', ParseIntPipe)
    id: number,
    @Res()
    res: Response,
  ) {
    try {
      const editedTodo = this.todosService.updateOne(id, body);
      return res.render('todos/todo_item_row', editedTodo);
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.todosService.deleteOne(id);
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
