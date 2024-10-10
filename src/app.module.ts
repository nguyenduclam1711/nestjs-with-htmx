import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosPageController } from './page-controllers/todos-page.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from './modules/knex.module';
import { InitDatabase } from './services/init-database.service';
import { UserCredentialsService } from './services/user-credentials.service';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { TestController } from './controllers/test.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { LoginPageController } from './page-controllers/login-page.controller';
import { RegisterPageController } from './page-controllers/register-page.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION'),
          },
        };
      },
    }),
  ],
  controllers: [
    TodosPageController,
    TestController,
    LoginPageController,
    RegisterPageController,
  ],
  providers: [
    TodosService,
    InitDatabase,
    UserCredentialsService,
    UsersService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
