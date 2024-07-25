import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';
import { TodosPageController } from './page-controllers/todos-page.controller';

@Module({
  imports: [],
  controllers: [TodosController, TodosPageController],
  providers: [TodosService],
})
export class AppModule {}
