import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { HbsUtils } from './utils/hbsUtils';
import { PUBLIC_PATH, VIEWS_PATH } from './constants/paths';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // use compression for response
  app.use(compression());

  // hbs template engine setup
  app.useStaticAssets(PUBLIC_PATH);
  app.setBaseViewsDir(VIEWS_PATH);
  app.setViewEngine('hbs');
  HbsUtils.initPartials();

  await app.listen(3000);
}
bootstrap();
