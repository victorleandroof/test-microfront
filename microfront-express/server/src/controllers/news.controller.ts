import { NextFunction, Request, Response, Router } from "express";
import { ApplicationConfig } from "../app.config";
import Controller from "./controller.interface";
import * as appAssets from "../assets.json";
import { Logger } from "../logger";
import { NewsService } from "../services/news.service";
import HttpStatusCode from "./enums/status-code.enum";
import { IResultNews } from "../services/news.interface";
import * as mustache from "mustache";
import { join } from "path";
import { readFileSync } from 'fs';


export class NewsController implements Controller {
  public path = `/${ApplicationConfig.APP_PREFIX}`;
  public router = Router();

  constructor(private newsService: NewsService) {
    this.newsService = newsService || new NewsService();
    this.router.get("/", this.getIndext.bind(this));
    this.router.get("/treands", this.getTopHeadlines.bind(this));
  }

  private async getIndext(request: Request, response: Response) {
    Logger.getInstance().debug(`[NewsController] - index`);
    const fileContent = readFileSync(join(__dirname, ApplicationConfig.VIEWS_PATH, 'index.mustache'), "utf-8");
    const session = request.session;
    const assetsResponse = NewsController.generateAssets();
    const htmlContent = mustache.render(fileContent, {
      name: session.user.name,
      ...assetsResponse,
    });
    return response.send(htmlContent);
  }

  private async getTopHeadlines(
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<IResultNews>> {
    Logger.getInstance().debug(`[NewsController] - getTopHeadlines`);
    try {
      const news = await this.newsService.getTopHeadlines();
      return response.status(HttpStatusCode.OK).json(news);
    } catch (error) {
      next(error);
    }
  }

  private static generateAssets() {
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
