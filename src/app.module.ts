import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosPageController } from './page-controllers/todos-page.controller';

@Module({
  imports: [],
  controllers: [TodosPageController],
  providers: [TodosService],
})
export class AppModule {}
