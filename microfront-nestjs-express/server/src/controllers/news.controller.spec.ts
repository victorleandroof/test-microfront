import { NewsService } from 'src/services/news.service';
import { NewsController } from './news.controller';
import { DeepMocked, createMock } from '@golevelup/nestjs-testing';
import { LoggerProvider } from 'src/provider/logger.provider';

describe('NewsController', () => {
    let newServiceMock: DeepMocked<NewsService>;
    let loggerProviderMock: DeepMocked<LoggerProvider>;
    let newsController: NewsController;

    const sessionMock: Record<string, any> = {
        user: {
            name: 'test',
        },
    };

    const responseResult = {
        name: 'test',
        scripts: [
            {
                url: '/news/public/js/app.js',
            },
        ],
        styles: [
            {
                url: '/news/public/css/app.css',
            },
        ],
    };

    const newsServiceReturnMock = {
        totalResults: 1,
        status: 'ok',
        articles: [
            {
                content: 'mock',
                description: 'mock',
                publishedAt: 'mock',
                source: {
                    id: 'mock',
                    name: 'mock',
                },
                title: 'mock',
                url: 'mock',
                urlToImage: 'mock',
                author: 'mock',
            },
        ],
    };

    beforeEach(() => {
        newServiceMock = createMock<NewsService>();
        loggerProviderMock = createMock<LoggerProvider>();
        newsController = new NewsController(newServiceMock, loggerProviderMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('method test', () => {
        it('should return user name and assets when call method', async () => {
            const response = await newsController.index(sessionMock);
            expect(response).toEqual(responseResult);
            expect(loggerProviderMock.debug.mock.calls).toEqual([
                ['[NewsController] - index'],
            ]);
        });
    });

    describe('method getTopHeadlines', () => {
        it('should return success with news when service return news ', async () => {
            newServiceMock.getTopHeadlines.mockResolvedValueOnce(
                newsServiceReturnMock
            );
            const response = await newsController.getTopHeadlines();
            expect(response).toEqual(newsServiceReturnMock);
            expect(loggerProviderMock.debug.mock.calls).toEqual([
                ['[NewsController] - getTopHeadlines'],
            ]);
        });
    });
});
