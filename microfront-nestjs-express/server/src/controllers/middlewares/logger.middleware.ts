import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        const correlator = request.headers['x-correlator'] || uuidv4();
        Logger.log(
            `[App][${correlator}] - ${request.method} -  ${request.originalUrl}`
        );
        response.setHeader('x-correlator', correlator);
        response.on('finish', () => {
            Logger.log(
                `[App][${correlator}] - ${request.method} - ${request.originalUrl} - ${response.statusCode}`
            );
        });
        next();
    }
}
