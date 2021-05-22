import * as winston from "winston";

export class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        format: winston.format.simple(),
        transports: new winston.transports.Console(),
        defaultMeta: { service: "news-microfront" },
      });
    }
    return Logger.instance;
  }
}
