import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { PUBLIC_PATH } from './constants/paths';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // use compression for response
  app.use(compression());

  // setup static assets path
  app.useStaticAssets(PUBLIC_PATH);

  await app.listen(3000);
}
bootstrap();
