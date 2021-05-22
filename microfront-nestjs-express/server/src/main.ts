import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApplicationConfig } from './application.config';
import { NewsModule } from './news.module';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(NewsModule);

    app.use(
        session({
            secret: ApplicationConfig.SESSION_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            name: ApplicationConfig.SESSION_COOKIE_NAME,
        })
    );
    console.log(join(__dirname, ApplicationConfig.ASSETS_PATH));
    app.use(
        `/${ApplicationConfig.APP_PREFIX}/public`,
        express.static(join(__dirname, ApplicationConfig.ASSETS_PATH))
    );
    app.disable('x-powered-by');
    app.disable('etag');
    app.setBaseViewsDir(join(__dirname, ApplicationConfig.VIEWS_PATH));
    app.setViewEngine('hbs');

    await app.listen(ApplicationConfig.PORT, () => {
        Logger.log(`listing in ${ApplicationConfig.PORT}`);
    });
}
bootstrap();
