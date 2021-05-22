import * as express from "express";
import * as session from "express-session";
import { join } from "path";
import { ApplicationConfig } from "./app.config";
import Controller from "./controllers/controller.interface";
import { AuthorizationMiddleware } from "./controllers/middlewares/authorization.middleware";
import { ErrorMiddleware } from "./controllers/middlewares/error.middleware";
import { Logger } from "./logger";

export class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.disable("x-powered-by");
    this.app.disable("etag");
    this.initializeStaticAndView();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      Logger.getInstance().info(
        `App listening on the port ${process.env.PORT}`
      );
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      session({
          secret: ApplicationConfig.SESSION_SECRET_KEY,
          resave: false,
          saveUninitialized: false,
          name: ApplicationConfig.SESSION_COOKIE_NAME,
      })
    );
    this.app.use(AuthorizationMiddleware.use);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware.use);
  }
  
  private initializeStaticAndView() {
    this.app.use(
      `/${ApplicationConfig.APP_PREFIX}/public`,
      express.static(join(__dirname, ApplicationConfig.ASSETS_PATH), {
        index: false,
        etag: false,
      })
    );
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
      Logger.getInstance().debug(`[App] - Path - ${controller.path}`);
    });
  }
}
