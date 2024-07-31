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
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { TodoWithoutId, TodoWithoutIdSchema } from 'src/schemas/todo';
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
  @UseFilters(
    new PageExceptionFilter(
      join('todos', 'todo_form_data_inputs.hbs'),
      (req) => {
        const body = req.body;
        return {
          email: body.email,
          name: body.name,
        };
      },
    ),
  )
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
