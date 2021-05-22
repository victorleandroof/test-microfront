import {
    HttpService,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/nestjs-testing';
import { NewsService } from './news.service';
import { IResultNews } from './news.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { LoggerProvider } from 'src/provider/logger.provider';

const responseWithNews: AxiosResponse<IResultNews> = {
    status: HttpStatus.OK,
    data: {
        status: 'ok',
        totalResults: 1,
        articles: [
            {
                source: {
                    id: 'mockSourceId',
                    name: 'mockSourceName',
                },
                author: 'mockAuthor',
                title: 'mockTitle',
                description: 'mockDescription',
                url: 'mockUrl',
                urlToImage: 'mockUrlImage',
                publishedAt: '2021-05-02T02:01:02+00:00',
                content: 'mock',
            },
        ],
    },
} as AxiosResponse;

jest.mock('../application.config', () => ({
    ApplicationConfig: {
        GOOGLE_NEWS_URL: 'mockurl',
        GOOGLE_NEWS_API_KEY: 'mockapikey',
    },
}));

describe('NewsService', () => {
    let httpServiceMock: DeepMocked<HttpService>;
    let loggerProviderMock: DeepMocked<LoggerProvider>;
    let newsService: NewsService;

    beforeEach(() => {
        httpServiceMock = createMock<HttpService>();
        loggerProviderMock = createMock<LoggerProvider>();
        newsService = new NewsService(httpServiceMock, loggerProviderMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw InternalServerErrorException when google news return http error', async () => {
        const responseError = {
            code: '401',
            response: {
                status: HttpStatus.UNAUTHORIZED,
                data: {
                    status: 'error',
                    code: 'error',
                    message: 'error',
                },
            } as AxiosResponse,
        } as AxiosError;
        httpServiceMock.get.mockImplementationOnce(() =>
            throwError(responseError)
        );
        try {
            await newsService.getTopHeadlines();
            fail();
        } catch (error) {
            expect(error).toBeInstanceOf(InternalServerErrorException);
            expect(loggerProviderMock.error.mock.calls).toEqual([
                ['[NewsService] - getTopHeadlines - error', responseError]
            ])
        }
    });

    it(`should return top headlines when call google news api 
    and has news in response`, async () => {
        httpServiceMock.get.mockImplementationOnce(() => of(responseWithNews));

        const newsResult = await newsService.getTopHeadlines();

        expect(httpServiceMock.get).toHaveBeenCalledWith(
            'mockurl/top-headlines',
            {
                params: {
                    sources: 'google-news-br',
                    apiKey: 'mockapikey',
                },
            }
        );
        expect(newsResult).toEqual(responseWithNews.data);
    });
});
