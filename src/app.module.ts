import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosPageController } from './page-controllers/todos-page.controller';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './modules/knex.module';
import { TestController } from './page-controllers/test.controller';
import { InitDatabase } from './services/init-database.service';
import { UserCredentialsService } from './services/user-credentials.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), KnexModule],
  controllers: [TodosPageController, TestController],
  providers: [
    TodosService,
    InitDatabase,
    UserCredentialsService,
    UsersService,
    AuthService,
  ],
})
export class AppModule {}
