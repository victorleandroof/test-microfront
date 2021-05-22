import { Controller, Get, Render, Session, UseGuards } from '@nestjs/common';
import { IResultNews } from '../services/news.interface';
import { NewsService } from '../services/news.service';
import * as appAssets from '../assets.json';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ApplicationConfig } from '../application.config';
import { AuthorizationGuard } from './guards/authorization.guard';
import { LoggerProvider } from '../provider/logger.provider';

@Controller(ApplicationConfig.APP_PREFIX)
export class NewsController {
    constructor(
        private readonly newsService: NewsService,
        private readonly loggerService: LoggerProvider
    ) {}

    @Get('treands')
    @UseGuards(AuthorizationGuard)
    public async getTopHeadlines(): Promise<IResultNews> {
        this.loggerService.debug(`[NewsController] - getTopHeadlines`);
        const news = await this.newsService.getTopHeadlines();
        return news;
    }

    @Get()
    @Render('index')
    @UseGuards(AuthenticationGuard)
    public async index(@Session() session: Record<string, any>) {
        this.loggerService.debug(`[NewsController] - index`);
        const assetsResponse = this.generateAssets();
        return {
            name: session.user.name,
            ...assetsResponse,
        };
    }

    private generateAssets() {
        const assetsResponse = {
            styles: [],
            scripts: [],
        };
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
