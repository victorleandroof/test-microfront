import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './controllers/middlewares/logger.middleware';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('(.*)');
  }
}
