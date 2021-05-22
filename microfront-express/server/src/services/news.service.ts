import { Logger } from "../logger";
import { ApplicationConfig } from "../app.config";
import { GoogleNewsException } from "./exceptions";
import { IResultNews } from "./news.interface";
import axios, { AxiosInstance } from "axios";

export class NewsService {
  private httpService: AxiosInstance;

  constructor(httpService?: AxiosInstance) {
    this.httpService =
      httpService ||
      axios.create({
        baseURL: ApplicationConfig.GOOGLE_NEWS_URL,
      });
  }

  public async getTopHeadlines(): Promise<IResultNews> {
    try {
      const response = await this.httpService.get<IResultNews>(
        "/top-headlines",
        {
          params: {
            sources: "google-news-br",
            apiKey: ApplicationConfig.GOOGLE_NEWS_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      Logger.getInstance().error(
        `[NewsService] - getTopHeadlines - error`,
        error
      );
      throw new GoogleNewsException();
    }
  }
}
