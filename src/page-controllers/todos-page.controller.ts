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
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import {
  TodoSchema,
  TodoWithoutId,
  TodoWithoutIdSchema,
} from 'src/schemas/todo';
import { TodosService } from 'src/services/todos.service';

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

  @Get('/todo-inputs')
  getCreateTodoInputs(
    @Res()
    res: Response,
  ) {
    const hxTriggerVal = {
      getTodoInputsSuccessfullyEvent: {
        htmxAttr: 'hx-post',
        htmxVal: '/todos-page',
        modalTitle: 'Create todo',
      },
    };
    res.setHeader('HX-Trigger', JSON.stringify(hxTriggerVal));
    res.render('todos/todo_form_data_inputs');
  }

  @Get('/todo-inputs/:id')
  getUpdateTodoInputs(
    @Param('id', ParseIntPipe)
    id: number,
    @Res()
    res: Response,
  ) {
    const hxTriggerVal = {
      getTodoInputsSuccessfullyEvent: {
        htmxAttr: 'hx-put',
        htmxVal: `/todos-page/${id}`,
        modalTitle: `Update todo ID: ${id}`,
      },
    };
    res.setHeader('HX-Trigger', JSON.stringify(hxTriggerVal));
    const todoItem = this.todosService.findOne(id);
    res.render('todos/todo_form_data_inputs', todoItem);
  }

  @Post()
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'todos/todo_form_data_inputs',
      getTemplateCtx: (req) => {
        const body = req.body;
        return {
          email: body.email,
          name: body.name,
        };
      },
      headers: [
        {
          key: 'HX-Retarget',
          value: '#todo_modal_form_inputs',
        },
        {
          key: 'HX-Reswap',
          value: 'innerHTML',
        },
      ],
    }),
  )
  @UsePipes(new PageValidationPipe(TodoWithoutIdSchema))
  createTodo(
    @Body()
    body: TodoWithoutId,
    @Res()
    res: Response,
  ) {
    const newTodo = this.todosService.createOne(body);
    res.setHeader(
      'HX-Trigger',
      'getTodoItemsEvent, createOrUpdateTodoSuccessfullyEvent',
    );
    res.setHeader('HX-Reswap', 'none');
    res.json(newTodo);
  }

  @Put(':id')
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'todos/todo_form_data_inputs',
      getTemplateCtx: (req) => {
        const body = req.body;
        const id = req.params.id;
        return {
          email: body.email,
          name: body.name,
          id,
        };
      },
      headers: [
        {
          key: 'HX-Retarget',
          value: '#todo_modal_form_inputs',
        },
        {
          key: 'HX-Reswap',
          value: 'innerHTML',
        },
      ],
    }),
  )
  @UsePipes(new PageValidationPipe(TodoWithoutIdSchema))
  editTodo(
    @Body()
    body: TodoWithoutId,
    @Param('id', ParseIntPipe)
    id: number,
    @Res()
    res: Response,
  ) {
    const editedTodo = this.todosService.updateOne(id, body);
    res.setHeader(
      'HX-Trigger',
      'getTodoItemsEvent, createOrUpdateTodoSuccessfullyEvent',
    );
    res.setHeader('HX-Reswap', 'none');
    res.json(editedTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Res() res: Response) {
    try {
      res.setHeader('HX-Trigger', 'getTodoItemsEvent');
      res.json(this.todosService.deleteOne(Number(id)));
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
