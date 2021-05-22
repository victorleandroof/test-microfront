import { HttpService, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApplicationConfig } from '../application.config';
import { IResultNews } from './news.interface';

@Injectable()
export class NewsService {

  constructor(private readonly httpService: HttpService){}
  
  public async getTopHeadlines(): Promise<IResultNews> {
    try {
       const response = await this.httpService.get<IResultNews>(`${ApplicationConfig.GOOGLE_NEWS_URL}/top-headlines`, {
          params: {
            sources: 'google-news-br',
            apiKey: ApplicationConfig.GOOGLE_NEWS_API_KEY
          }
       }).toPromise();
       return response.data;
    } catch (error) {
       Logger.error(`[NewsService] - getTopHeadlines - error`, error)
       throw new InternalServerErrorException();
    }
  }
}
