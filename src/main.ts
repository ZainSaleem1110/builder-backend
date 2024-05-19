import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });
  app.enableCors();

  await app.listen(port, () => {
    // console.log('[WEB]', config.get<string>('BASE_URL'));
    console.log(`[WEB] http://localhost:${port}`);
  });
}

bootstrap();
