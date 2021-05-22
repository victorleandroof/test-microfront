import HttpStatusCode from "../enums/status-code.enum";
import HttpException from "./http.exception";

export const internalServerError: HttpException = {
  message:"Internal Server Error",
  status: HttpStatusCode.INTERNAL_SERVER_ERROR
};
