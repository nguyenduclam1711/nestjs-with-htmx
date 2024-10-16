import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { HbsUtils } from './utils/hbsUtils';
import {
  LAYOUTS_PATH,
  PARTIALS_PATH,
  PUBLIC_PATH,
  VIEWS_PATH,
} from './constants/paths';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // use compression for response
  app.use(compression());

  // hbs template engine setup
  app.useStaticAssets(PUBLIC_PATH);
  app.setBaseViewsDir(VIEWS_PATH);
  app.setViewEngine('hbs');
  // configure Handlebars
  app.set('view options', {
    layoutsDir: LAYOUTS_PATH,
    partialsDir: PARTIALS_PATH,
  });
  HbsUtils.initPartials();

  await app.listen(3000);
}
bootstrap();
