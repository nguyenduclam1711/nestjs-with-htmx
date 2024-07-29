import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { HbsUtils } from './utils/hbsUtils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // use compression for response
  app.use(compression());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  HbsUtils.registerPartial(
    'deleteTodoModal',
    join(__dirname, '..', 'views', 'todos', 'delete_todo_modal.hbs'),
  );

  await app.listen(3000);
}
bootstrap();
