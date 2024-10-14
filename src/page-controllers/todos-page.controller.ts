import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  Res,
  UnprocessableEntityException,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { PageExceptionFilter } from 'src/exception-filters/page-exception.filter';
import { PagePushUrlWithParamsInterceptor } from 'src/interceptors/page-push-curr-url-with-params.interceptor';
import { PageValidationPipe } from 'src/pipes/page-validation.pipe';
import { Todo, TodoWithoutId, TodoWithoutIdSchema } from 'src/schemas/todo';
import { TodosService } from 'src/services/todos.service';

@Controller('/todos-page')
export class TodosPageController {
  constructor(private todosService: TodosService) {}

  @Public()
  @Get()
  @Render('pages/todos/index')
  renderTodos(
    @Query('id')
    id: string,
    @Query('email')
    email: string,
    @Query('name')
    name: string,
  ) {
    return {
      idParam: id,
      emailParam: email,
      nameParam: name,
    };
  }

  @Get('/todo-items')
  @UseInterceptors(PagePushUrlWithParamsInterceptor)
  @Render('pages/todos/todo-table-items')
  async getTodoTableItems(
    @Query('id')
    id: string,
    @Query('email')
    email: string,
    @Query('name')
    name: string,
  ) {
    const params: Partial<Todo> = {
      email,
      name,
    };
    if (id) {
      params.id = Number(id);
    }
    const todos = await this.todosService.findAll(params);
    return {
      todos,
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
    res.render('pages/todos/todo-form-data-inputs');
  }

  @Get('/todo-inputs/:id')
  async getUpdateTodoInputs(
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
    const todoItem = await this.todosService.findOne(id);
    res.render('pages/todos/todo-form-data-inputs', todoItem);
  }

  @Post()
  @UseFilters(
    new PageExceptionFilter({
      templateFilePath: 'pages/todos/todo-form-data-inputs',
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
          value: '#todo-modal-form-inputs',
        },
        {
          key: 'HX-Reswap',
          value: 'innerHTML',
        },
      ],
    }),
  )
  @UsePipes(new PageValidationPipe(TodoWithoutIdSchema))
  async createTodo(
    @Body()
    body: TodoWithoutId,
    @Res()
    res: Response,
  ) {
    const newTodo = await this.todosService.createOne(body);
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
      templateFilePath: 'pages/todos/todo-form-data-inputs',
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
          value: '#todo-modal-form-inputs',
        },
        {
          key: 'HX-Reswap',
          value: 'innerHTML',
        },
      ],
    }),
  )
  @UsePipes(new PageValidationPipe(TodoWithoutIdSchema))
  async editTodo(
    @Body()
    body: TodoWithoutId,
    @Param('id', ParseIntPipe)
    id: number,
    @Res()
    res: Response,
  ) {
    const editedTodo = await this.todosService.updateOne(id, body);
    res.setHeader(
      'HX-Trigger',
      'getTodoItemsEvent, createOrUpdateTodoSuccessfullyEvent',
    );
    res.setHeader('HX-Reswap', 'none');
    res.json(editedTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Res() res: Response) {
    try {
      res.setHeader('HX-Trigger', 'getTodoItemsEvent');
      const deleted = await this.todosService.deleteOne(Number(id));
      res.json(deleted);
    } catch (error: any) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
