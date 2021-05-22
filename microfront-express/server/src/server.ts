import { App } from "./app";
import { NewsController } from "./controllers/news.controller";

const app = new App(
    [
      new NewsController()
    ],
);
  
  app.listen();