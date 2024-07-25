import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from 'src/services/todos.service';

@Controller('/todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.todosService.findOne(Number(id));
  }

  @Put(':id')
  updateOne(
    @Param('id')
    id: string,
    @Body()
    body: {
      name: string;
    },
  ) {
    return this.todosService.updateOne(Number(id), body);
  }

  @Post()
  createOne(
    @Body()
    body: {
      name: string;
    },
  ) {
    return this.todosService.createOne(body);
  }

  @Delete(':id')
  deleteOne(
    @Param('id')
    id: string,
  ) {
    return this.todosService.deleteOne(Number(id));
  }
}
