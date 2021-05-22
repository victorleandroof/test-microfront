import { Controller, Get, Logger, Render, Session, UseGuards } from '@nestjs/common';
import { IResultNews } from '../services/news.interface';
import { NewsService } from '../services/news.service';
import * as appAssets from '../assets.json';
import * as secureSession from 'fastify-secure-session';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ApplicationConfig } from 'src/application.config';
import { AuthorizationGuard } from './guards/authorization.guard';

@Controller(ApplicationConfig.APP_PREFIX)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('treands')
  @UseGuards(AuthorizationGuard)
  public async getTopHeadlines(): Promise<IResultNews> {
    Logger.debug(`[NewsController] - getTopHeadlines`)
    const news = await this.newsService.getTopHeadlines();
    return news;
  }

  @Get()
  @Render('index.hbs')
  @UseGuards(AuthenticationGuard)
  public async index(@Session() session: secureSession.Session) {
    Logger.debug(`[NewsController] - index`)
    const assetsResponse = this.generateAssets();
    const user = session.get('user');
     return {
          name: user.name,
          ...assetsResponse
     }
  }  

  private generateAssets() {
    const assetsResponse = {
       styles: [],
       scripts: []
    }
    Object.values(appAssets).forEach((obj: any) => {
      if (obj.css) {
        assetsResponse.styles.push({ url: obj.css });
      } 
      if (obj.js) {
        assetsResponse.scripts.push({ url: obj.js });
      }
    });
    return assetsResponse;
  }
}
