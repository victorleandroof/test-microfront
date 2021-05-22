import { NextFunction, Request, Response } from "express";
import { Logger } from "../../logger";
import { internalServerError } from "../exceptions";

export class ErrorMiddleware {
  private static errors = {
    "GoogleNewsException": internalServerError
  };

  static use(
    error: any,
    _request: Request,
    response: Response,
    _next: NextFunction) {
    Logger.getInstance().error(`[ErrorMiddleware] - error: ${error.stack}`);
    const httpException =
      ErrorMiddleware.errors[error.constructor.name] ||
      internalServerError;
    return response.status(httpException.status).send({
      message: httpException.message,
      status: httpException.status,
    });
  }
}
