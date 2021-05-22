import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: FastifyRequest, response: FastifyReply, next: any) {
    const correlator = request.headers['x-correlator'] || uuidv4();
    Logger.log(`[App][${correlator}] - ${request.method} -  ${request.url}`);
    response.header('x-correlator', correlator);
    response.then(
      () => { 
        this.loggerResponseFinish(correlator, request.method, request.url, response.statusCode)
      },
      () => { 
        this.loggerResponseFinish(correlator, request.method, request.url, response.statusCode)
      }
    );
    next();
  }

  private loggerResponseFinish(correlator: string, method: string, url:string, responseStatus:number) {
    Logger.log(`[App][${correlator}] - ${method} - ${url} - ${responseStatus}`);
  }
}
