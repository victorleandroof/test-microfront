import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import { ApplicationConfig } from './application.config';
import { NewsModule } from './news.module';
import secureSession from 'fastify-secure-session';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(NewsModule, new FastifyAdapter());
 
  app.register(
    secureSession,{
      secret: ApplicationConfig.SESSION_SECRET_KEY,
      salt: ApplicationConfig.SESSION_SALT,
      cookieName: ApplicationConfig.SESSION_COOKIE_NAME
    }
  );

  app.useStaticAssets({
    root: join(__dirname,ApplicationConfig.ASSETS_PATH),
    prefix: `/${ApplicationConfig.APP_PREFIX}/public`,
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname,ApplicationConfig.VIEWS_PATH),
  });

  await app.listen(ApplicationConfig.PORT);
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
