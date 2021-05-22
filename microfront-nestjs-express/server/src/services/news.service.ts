import {
    HttpService,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { LoggerProvider } from '../provider/logger.provider';
import { ApplicationConfig } from '../application.config';
import { IResultNews } from './news.interface';

@Injectable()
export class NewsService {
    constructor(
        private readonly httpService: HttpService,
        private loggerProvider: LoggerProvider
    ) {}

    public async getTopHeadlines(): Promise<IResultNews> {
        try {
            const response = await this.httpService
                .get<IResultNews>(
                    `${ApplicationConfig.GOOGLE_NEWS_URL}/top-headlines`,
                    {
                        params: {
                            sources: 'google-news-br',
                            apiKey: ApplicationConfig.GOOGLE_NEWS_API_KEY,
                        },
                    }
                )
                .toPromise();
            return response.data;
        } catch (error) {
            this.loggerProvider.error(
                `[NewsService] - getTopHeadlines - error`,
                error
            );
            throw new InternalServerErrorException();
        }
    }
}
