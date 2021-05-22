import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../enums/status-code.enum";

const users = {
  admin: {
    password: "admin",
    name: "admin",
  },
};

export class AuthorizationMiddleware {
  public static use(request: Request, response: Response, next: NextFunction) {
    const { token } = request.query;
    const user  = request.session.user;
    if (user) return next();
    if (token) {
      const decodedToken = Buffer.from(token as string, "base64").toString();
      const payloadToken = decodedToken.split(":");
      const user = users[payloadToken[0]];
      if (user.password === payloadToken[1]) {
        request.session.user = {
          name: user.name,
        };
        return next();
      }
    }
    return response.status(HttpStatusCode.UNAUTHORIZED).send();
  }
}
