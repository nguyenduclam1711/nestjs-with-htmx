import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
